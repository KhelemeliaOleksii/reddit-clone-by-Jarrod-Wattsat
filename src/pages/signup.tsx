import { Auth } from 'aws-amplify';
import { forwardRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, TextField, Grid } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useUser } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { ISignUpResult } from 'amazon-cognito-identity-js';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IFormInput {
    username: string;
    password: string;
    email: string;
    code: string;
}

const SignUp = () => {
    const [openErrorContainer, setOpenErrorContainer] = useState(false);
    const [authError, setAuthError] = useState<string>('');
    const { setCandidate, user } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const router = useRouter();
    if (user) {
        router.push('/');
    }

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const candidate = await signUpWithEmailAndPassword(data);
            router.push("/signupConfirm");
        } catch (error) {
            console.log(error);
            setOpenErrorContainer(true);
            setAuthError("Signup Error!");
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorContainer(false);
    };

    async function signUpWithEmailAndPassword({ username, password, email }: IFormInput): Promise<ISignUpResult | never> {
        try {
            const candidate = await Auth.signUp({
                username,
                password,
                attributes: {
                    email, // optional
                },
            });
            setCandidate(candidate.user);
            return candidate;
        } catch (error: any) {
            if (error['code'] === "UsernameExistsException") {
                throw new Error("Email is in use!")
            }
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
                        id="email"
                        label="Email"
                        type="email"
                        variant="standard"
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : null}
                        autoComplete="off"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Please, enter an email",
                            },
                        })}
                    />
                    {/* {errors.userName && errors.userName.message} */}
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
                        Sign up
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

export default SignUp;