import { Auth } from 'aws-amplify';
import { forwardRef, useState, Fragment } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, TextField, Grid } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useUser } from '@/context/AuthContext';
// import { CognitoUser } from '@aws-amplify/auth'
import { useRouter } from 'next/router';
// import { ISignUpResult } from 'amazon-cognito-identity-js';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IFormInput {
    username: string
    code: string
}

const ConfirmSignUp = () => {
    const [isErrorContainerOpened, setIsErrorContainerOpened] = useState(false);
    const [authError, setAuthError] = useState<string>('');
    const { user, candidate, setCandidate } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const candidateName = candidate?.getUsername();
    const router = useRouter();
    if (user) {
        router.push('/');
    }

    const onSubmit: SubmitHandler<IFormInput> = async ({ username, code }) => {
        try {
            // console.log("username", user);
            // const candidateName = user?.getUsername();
            // const candidateName = candidate?.getUsername();

            await confirmEmail({ username, code });
            setCandidate(null);
            router.push('/signin')
        } catch (error) {
            console.log(error);
            setIsErrorContainerOpened(true);
            setAuthError("Confirmation Error!");
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsErrorContainerOpened(false);
    };

    async function confirmEmail({ username, code }: { username: string, code: string }): Promise<{ username: string, isConfirmed: boolean } | never> {
        try {
            await Auth.confirmSignUp(username, code);

            return {
                username,
                isConfirmed: true,
            };
        } catch (error: any) {
            if (error['code'] === "CodeMismatchException") {
                throw new Error("The inputed code is invalid");
            }
            if (error['code'] === "ExpiredCodeException") {
                throw new Error("The code validation timed out");
            }
            if (error['code'] === "UserNotFoundException") {
                throw new Error("User with such username were not founded");
            }
            throw error;
        }
    }

    return (
        <Fragment>
            <h3> Input your email confirmation code.</h3>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="offs">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    {candidateName ?
                        <Grid item>
                            <TextField
                                id="userName"
                                label="User Name"
                                type="text"
                                value={candidateName}
                                variant="standard"
                                error={errors.username ? true : false}
                                helperText={errors.username ? errors.username.message : null}
                                autoComplete="off"
                                aria-readonly
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
                        :
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
                    }
                    <Grid item>
                        <TextField
                            id="verificationCode"
                            label="Verification Code"
                            type="text"
                            variant="standard"
                            error={errors.code ? true : false}
                            helperText={errors.code ? errors.code.message : null}
                            autoComplete="off"
                            {...register("code", {
                                required: {
                                    value: true,
                                    message: "Please, enter a verification code. (Check your email)",
                                },
                                minLength: {
                                    value: 6,
                                    message: "The code comprises 6 characters",
                                },
                                maxLength: {
                                    value: 6,
                                    message: "The code comprises 6 characters",
                                }
                            })}
                        />
                        {/* {errors.username && errors.userName.message} */}
                    </Grid>
                    <Grid style={{ marginTop: 16 }}>
                        <Button variant="contained" type="submit">
                            Confirm
                            {/* {needShowCode ? "Confirm code" : "Sign up"} */}
                        </Button>
                    </Grid>
                </Grid>

                <Snackbar open={isErrorContainerOpened} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {authError}
                    </Alert>
                </Snackbar>
            </form>
        </Fragment>
    )
}

export default ConfirmSignUp; 