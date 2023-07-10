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

interface IProps {
    children: React.ReactElement;
}

export default function AuthContext({ children }: IProps): ReactElement {
    const [user, setUser] = useState<CognitoUser | null>(null);
    const [candidate, setCandidate] = useState<CognitoUser | null>(null);
    const needFetchUser = useRef(true);

    useEffect(() => {
        // console.log(`Context component. UseEffect on [user, isUserFullConfirmed] change:\n 
        //         \ username ${user?.getUsername()}, needFetchUser: ${needFetchUser.current}.`);
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
                console.error(error);
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