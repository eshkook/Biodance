import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { reset_password_email_phase_post } from "../api/posts.js";
import { isValidEmail } from "./Validations.js";
import { useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom"
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Reset_Password_Email_Phase() {

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: reset_password_email_phase_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/reset_password_code_phase", {
                state: {
                    email: formState.email
                }
            });
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        email: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
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
        }
        setFieldError(temp_object)

        if (!temp_object.email) {
            console.log(formState)

            loginMutation.mutate({
                email: formState.email,
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
                <Typography variant="subtitle1" component="h1" color="white">
                    Let's reset your account's password.
                </Typography>
                
                <Typography variant="subtitle1" component="h1" color="white">
                    Type in your user Email:
                </Typography>
                <br />

                {errorMessage && (
                    <>
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                        <br />
                    </>
                )}

                <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                    {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
          autoComplete off makes it not complete the user's text */}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextField
                            onChange={updateFormState} // same as writing onChange={()=>updateFormState(event)}
                            id="email-input"
                            label="User Email"
                            variant="outlined"
                            name="email"
                            value={formState.email}
                            error={fieldErrorState.email}
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            disabled={loginMutation.isLoading}>
                            {loginMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                    </div>
                </form>
            </Box>
        </>
    )
}

