import { Auth } from 'aws-amplify';
//01:09:03
import { useForm, Controller, SubmitHandler } from "react-hook-form"
// import Input from "@material-ui/core/Input"
import { Button, Input, TextField, Grid } from "@mui/material"

interface IFormInput {
    userName: string
    email: string
    password: string
}

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log("Submitted");
        console.log(data);
    }

    type SignUpParameters = {
        username: string;
        password: string;
        email: string;
        phoneNumber: string;
    };

    async function signUp({ username, password, email, phoneNumber }: SignUpParameters) {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email, // optional
                    phoneNumber, // optional - E.164 number convention
                    // other custom attributes
                },
                autoSignIn: {
                    // optional - enables auto sign in after user is confirmed
                    enabled: true,
                },
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
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
                        error={errors.userName ? true : false}
                        helperText={errors.userName ? errors.userName.message : null}
                        autoComplete="off"
                        {...register("userName", {
                            required: {
                                value: true,
                                message: "Please, enter a user's name",
                            },
                            minLength: {
                                value: 3,
                                message: "A user's name must comprise 3-16 characters",
                            },
                            maxLength: {
                                value: 16,
                                message: "A user's name must comprise 3-16 characters",
                            }
                        })}
                    />
                    {/* {errors.userName && errors.userName.message} */}
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
        </form>
    )
}

export default SignUp;