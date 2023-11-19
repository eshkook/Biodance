import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { confirmation_post } from "../api/posts.js";
import { useNavigate, useLocation } from "react-router-dom"

export default function Confirmation_Cognito() {

    const location = useLocation()

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const confirmationMutation = useMutation({
        mutationFn: confirmation_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/youarelogged_cognito") //, { state: { user_id: data.user_id } });
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
            console.dir(error);
        }
    });

    const [formState, setFormState] = useState({
        email: location.state.email,
        confirmation_code: ''
    })

    const [fieldErrorState, setFieldError] = useState({
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
            confirmation_code: formState.confirmation_code == ''
        }
        setFieldError(temp_object)

        if (!(temp_object.confirmation_code)) {

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
            <Typography variant="subtitle1" component="h1">
                A confirmation code was sent to {formState.email}. <br />
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
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Confirmation code"
                        variant="outlined"
                        name="confirmation_code"
                        value={formState.confirmation_code}
                        error={fieldErrorState.confirmation_code}
                        required  // make a '*' to indicate it is a mandatory field
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={confirmationMutation.isLoading}>
                        {confirmationMutation.isLoading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}



