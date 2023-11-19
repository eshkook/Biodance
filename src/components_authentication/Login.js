import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { login_post } from "../api/posts.js";
import { useNavigate } from "react-router-dom"

import { useEffect } from "react";
import axios from 'axios';

export default function Login() {

    ////////////////////////////////////////////////////////////////////////////
    // Function to set CSRF token
    const getCsrfToken = async () => {
        try {
            await axios.get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/csrf_cookie');
        } catch (error) {
            console.error('Error getting CSRF token', error);
        }
    };

    // Function to check authentication status
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/authenticated');
            if (response.data.isAuthenticated === 'success') {
                navigate('/youarelogged'); // Change this to your authenticated user's landing page
            }
        } catch (error) {
            console.error('Error checking authentication status', error);
        }
    };

    // Call these functions when the component mounts
    useEffect(() => {
        getCsrfToken();
        checkAuthentication();
    }, []);
    ////////////////////////////////////////////////////////////////////////////

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: login_post,
        onSuccess: data => {
            navigate("/youarelogged", { state: { username: data.username } });
        },
        onError: error => {
            setErrorMessage(error);
            console.log(error)
        }
    });

    const [formState, setFormState] = useState({
        username: '',
        password: '',
    })

    const [fieldErrorState, setFieldError] = useState({
        username: false,
        password: false,
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
            username: (formState.username == ''),
            password: (formState.password == ''),
        }
        setFieldError(temp_object)

        if (!(temp_object.username || temp_object.password)) {
            console.log(formState)

            loginMutation.mutate({
                username: formState.username,
                password: formState.password,
            });
        }
    }

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Log in:
            </Typography>
            <br />

            {(errorMessage && errorMessage.error == 'Invalid credentials') && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Invalid credentials
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
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={formState.username}
                        error={fieldErrorState.username}
                    // required  // make a '*' to indicate it is a mandatory field
                    />
                    <TextField
                        onChange={updateFormState}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        value={formState.password}
                        error={fieldErrorState.password}
                    // required  // make a '*' to indicate it is a mandatory field
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        disabled={loginMutation.isLoading}>
                        {loginMutation.isLoading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}

