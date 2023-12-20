import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { reset_password_code_phase_post } from "../api/posts.js";
import { useNavigate, useLocation } from "react-router-dom"
import { isValidPassword, isValidEmail } from "./Validations.js";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SignUp() {

    const location = useLocation()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => (!showPassword));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const Mutation = useMutation({
        mutationFn: reset_password_code_phase_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/login", { state: { message: 'Password was reset, now you can log in!' } })
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        email: (location.state?.email) ? location.state.email : '',
        confirmation_code: '',
        password: '',
        password_confirmation: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        confirmation_code: false,
        password: false,
        password_confirmation: false,
    })

    function updateFormState(event) {
        const { name, value } = event.target
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault() // preventing re-rendering the page
        const temp_object = {
            email: !isValidEmail(formState.email),
            confirmation_code: formState.confirmation_code == '',
            password: !isValidPassword(formState.password),
            password_confirmation: (formState.password_confirmation != formState.password || !isValidPassword(formState.password_confirmation)),
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.confirmation_code || temp_object.password || temp_object.password_confirmation)) {

            console.log(formState)

            Mutation.mutate({
                email: formState.email,
                confirmation_code: formState.confirmation_code,
                password: formState.password,
            });
        } else {
            setErrorMessage("Fields in red are invalid")
        }
    }

    return (
        <>
            <Box sx={{
                maxWidth: '400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center aligns all children horizontally 
                justifyContent: 'center', // Center aligns all children vertically (if needed)
            }}>
                {(location.state?.email) ?
                    (<Typography variant="subtitle1" component="h1" color="white">
                        A confirmation code was sent to {formState.email}.
                    </Typography>)
                    :
                    (<Typography variant="subtitle1" component="h1" color="white">
                        A confirmation code was sent to your Email.
                    </Typography>)}

                <Typography variant="subtitle1" component="h1" color="white">
                    Reset your password:
                </Typography>
                <br />

                {errorMessage && (
                    <Typography variant="body2" color="error">
                        {errorMessage}
                    </Typography>
                )}

                <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves,
          autoComplete off makes it not complete the user's text */}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {!location.state?.email && (
                            <TextField
                                onChange={updateFormState}
                                id="email-input"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formState.email}
                                error={fieldErrorState.email}
                                autoFocus={location.state?.email ? false : true}
                            // required  // make a '*' to indicate it is a mandatory field
                            />)}
                        <TextField
                            onChange={updateFormState}
                            id="confirmation-code-input"
                            label="Confirmation code"
                            variant="outlined"
                            name="confirmation_code"
                            value={formState.confirmation_code}
                            error={fieldErrorState.confirmation_code}
                            autoFocus={location.state?.email ? true : false}
                        // required  // make a '*' to indicate it is a mandatory field
                        />
                        <TextField
                            onChange={updateFormState}
                            onPaste={(event) => {
                                event.preventDefault();
                                setErrorMessage("Password requires manual typing")
                            }}
                            id="password-input"
                            label="New Password"
                            variant="outlined"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formState.password}
                            error={fieldErrorState.password}
                            required  // adds a '*' to indicate it is a mandatory field
                            InputProps={{ // <-- This is the part that adds the toggle button
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            onChange={updateFormState}
                            onPaste={(event) => {
                                event.preventDefault();
                                setErrorMessage("Password requires manual typing")
                            }}
                            id="password-confirmation-input"
                            label="New Password Confirmation"
                            variant="outlined"
                            name="password_confirmation"
                            type={showPassword ? 'text' : 'password'}
                            value={formState.password_confirmation}
                            error={fieldErrorState.password_confirmation}
                            required  // adds a '*' to indicate it is a mandatory field
                            InputProps={{ // <-- This is the part that adds the toggle button
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            disabled={Mutation.isLoading}>
                            {Mutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                    </div>
                </form>
            </Box>
        </>
    )
}
