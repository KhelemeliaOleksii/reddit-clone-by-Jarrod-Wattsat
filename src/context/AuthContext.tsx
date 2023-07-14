import {
    createContext,
    ReactElement,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useContext,
    useRef
} from 'react';
import { CognitoUser } from '@aws-amplify/auth'
import { Hub, Auth } from 'aws-amplify';

interface IUserContext {
    user: CognitoUser | null
    setUser: Dispatch<SetStateAction<CognitoUser | null>>
    candidate: CognitoUser | null
    setCandidate: Dispatch<SetStateAction<CognitoUser | null>>
}

const UserContext = createContext<IUserContext>({} as IUserContext);
// const UserContext = createContext<Partial<IUserContext>>({});

interface IProps {
    children: React.ReactElement;
}

export default function AuthContext({ children }: IProps): ReactElement {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [candidate, setCandidate] = useState<CognitoUser | null>(null);
    const needFetchUser = useRef(true);

    /**
     * @description  - to check user immediatly after a component have builded; \
     *              - to create Hublistener on authorization events (login, logout, checkCurrentUser etc.);  \
     *              - after the first time using this code is blocked by flag: needFetchUser = false; \
     *              - before the component have unmounted the authorization Hublistener has been removed;
     *  */
    useEffect(() => {
        let removeHubListener = (): void => { };
        if (needFetchUser.current) {
            checkUser();
            removeHubListener = Hub.listen("auth", () => {
                checkUser();
            })
            needFetchUser.current = false;
        }


        async function checkUser() {
            try {
                const amplifyUser = await Auth.currentAuthenticatedUser();
                setUser(amplifyUser);
            } catch (error) {
                setUser(null);
            }
        }

        return () => {
            removeHubListener();
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, candidate, setCandidate }}>
            {children}
        </UserContext.Provider>

    );
}

export const useUser = (): IUserContext => useContext(UserContext); 