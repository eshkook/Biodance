import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { confirmation_post } from "../api/posts.js";
import { useNavigate, useLocation } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { isValidEmail } from "./Validations.js";

export default function Confirmation() {

    const location = useLocation()

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const confirmationMutation = useMutation({
        mutationFn: confirmation_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/login", { state: { message: 'Confirmation was successful, now you can log in!' } })
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        email: (location.state?.email) ? location.state.email : '',
        confirmation_code: ''
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        confirmation_code: false,
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
            confirmation_code: formState.confirmation_code == ''
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.confirmation_code)) {

            console.log(formState)

            confirmationMutation.mutate({
                email: formState.email,
                confirmation_code: formState.confirmation_code,
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
                        Let's confirm your email:
                    </Typography>)}
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
                        {!location.state?.email && (
                            <TextField
                                onChange={updateFormState}
                                id="email-input"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={formState.email}
                                error={fieldErrorState.email}
                                autoFocus={!location.state?.email}
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
                            autoFocus={location.state?.email}
                        // required  // make a '*' to indicate it is a mandatory field
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            disabled={confirmationMutation.isLoading}>
                            {confirmationMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                            {/* {confirmationMutation.isLoading ? "Loading..." : "Submit"} */}
                        </Button>
                    </div>
                </form>
            </Box>
        </>
    )
}



