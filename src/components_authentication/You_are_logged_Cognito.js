import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, post_response_count, get_random } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { useEffect } from "react";
import axios from 'axios';

export default function You_are_logged_Cognito() {

    const navigate = useNavigate()

    // Function to check authentication status
    const checkAuthentication = async () => {
        try {
            const response = await axios.get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/authenticated');
            if (response.data.isAuthenticated !== 'success') {
                navigate('/login_cognito'); // Redirect to login if not authenticated
            }
        } catch (error) {
            console.error('Error checking authentication status', error);
            navigate('/login_cognito'); // Redirect to login on error
        }
    };

    // Call this function when the component mounts
    useEffect(() => {
        checkAuthentication();
    }, []);

    const queryClient = useQueryClient()

    const [countError, setCountError] = useState(null);

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleGetRandomNumber = () => {
        setShouldFetch(true);
        queryClient.invalidateQueries(["random"])
    };

    const [randomError, setRandomError] = useState(null);

    const randomQuery = useQuery({
        queryKey: ["random"],
        queryFn: () => get_random,
        onError: error => {
            setRandomError(error);
            console.log(error)
        },
        enabled: shouldFetch, // prevent fetching on mount,
        initialData: 0
    });

    const [count, setCount] = useState(0);

    const responseCountMutation = useMutation(
        {
            mutationFn: () => post_response_count(count),
            onSuccess: data => {
                setCount(data.count);
            },
            onError: error => {
                setCountError(error);
                console.log(error)
            }
        }
    );

    const [logoutError, setLogoutError] = useState(null);

    const logoutMutation = useMutation({
        mutationFn: logout_post,
        onSuccess: data => {
            navigate("/authentication_cognito");
        },
        onError: error => {
            setLogoutError(error);
            console.log(error)
        }
    });

    const [deleteError, setDeleteError] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: delete_post,
        onSuccess: data => {
            navigate("/authentication");
        },
        onError: error => {
            setDeleteError(error);
            console.log(error)
        }
    });

    return (
        <>
            <Typography variant="subtitle1" component="h1">
                You are logged!
            </Typography>
            <br />

            {countError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in count
                    </Typography>
                    <br />
                </>
            )}

            {randomError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in random
                    </Typography>
                    <br />
                </>
            )}

            {logoutError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in logout
                    </Typography>
                    <br />
                </>
            )}

            {deleteError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured in delete
                    </Typography>
                    <br />
                </>
            )}

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button
                    variant="contained"
                    onClick={responseCountMutation.mutate}
                    disabled={responseCountMutation.isLoading}>
                    {(responseCountMutation.isLoading) ? "Loading..." : "Get Response Count"}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleGetRandomNumber}
                    disabled={randomQuery.isLoading}>
                    {(randomQuery.isLoading) ? "Loading..." : "Get Random integer"}
                </Button>
                <Button
                    variant="contained"
                    onClick={logoutMutation.mutate}
                    disabled={logoutMutation.isLoading}>
                    {logoutMutation.isLoading ? "Loading..." : "Log out"}
                </Button>
                <Button
                    variant="contained"
                    onClick={deleteMutation.mutate}
                    disabled={deleteMutation.isLoading}>
                    {deleteMutation.isLoading ? "Loading..." : "Delete account"}
                </Button>
            </ButtonGroup>
            <br />
            <br />
            <Typography variant="subtitle1" component="h2">
                Count: {count}
            </Typography>
            <br />
            {shouldFetch && (  // Conditionally render the error message
                <>
                    <Typography variant="subtitle1" component="h2">
                        Press Random: {randomQuery.data}
                    </Typography>
                    <br />
                </>
            )}

        </>
    )
}