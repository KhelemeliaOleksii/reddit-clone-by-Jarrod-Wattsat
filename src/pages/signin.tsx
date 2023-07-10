import { Auth } from 'aws-amplify';
import { forwardRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, TextField, Grid } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useUser } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { CognitoUser } from 'amazon-cognito-identity-js';
// import { SignInParameters } from 'amazon-cognito-identity-js';
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IFormInput {
    password: string;
    username: string;
}

const SignIn = () => {
    const [openErrorContainer, setOpenErrorContainer] = useState(false);
    const [authError, setAuthError] = useState<string>('');
    const { setCandidate } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const candidate = await signInWithEmailAndPassword(data);
            router.push("/");
        } catch (error) {
            console.log(error);
            setOpenErrorContainer(true);
            setAuthError("Login Error!");
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorContainer(false);
    };

    async function signInWithEmailAndPassword({ username, password }: IFormInput): Promise<CognitoUser | never> {
        try {
            const candidate = await Auth.signIn(username, password);
            return candidate;
        } catch (error: any) {
            if (error['code'] === "InvalidParameterException") {
                throw new Error("Inputed parameters are invalid")
            }
            throw error;
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="offs">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
            >
                <Grid item>
                    <TextField
                        id="userName"
                        label="User Name"
                        type="text"
                        variant="standard"
                        error={errors.username ? true : false}
                        helperText={errors.username ? errors.username.message : null}
                        autoComplete="off"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please, enter a user's name",
                            },
                            minLength: {
                                value: 3,
                                message: "A user's name must comprise 3-16 characters",
                            },
                            maxLength: {
                                value: 30,
                                message: "A user's name must comprise 3-16 characters",
                            }
                        })}
                    />
                    {/* {errors.username && errors.userName.message} */}
                </Grid>
                <Grid item>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="standard"
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password.message : null}
                        autoComplete="off"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please, enter a password",
                            },
                            minLength: {
                                value: 8,
                                message: "The password is too short (It should comprise 8-21 characters)",
                            },
                            maxLength: {
                                value: 21,
                                message: "The password is too long (It should comprise 8-21 characters)",

                            }

                        })}
                    />
                    {/* {errors.userName && errors.userName.message} */}
                </Grid>

                <Grid style={{ marginTop: 16 }}>
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Grid>

            </Grid>

            <Snackbar open={openErrorContainer} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {authError}
                </Alert>
            </Snackbar>
        </form>
    )
}

export default SignIn;