import { Navigate } from 'react-router-dom';
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authenticate_post } from "../api/posts.js";
import { useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setFirstName } from '../redux/store';

export default function ProtectedRoute({ children }) {

    const location = useLocation()
    const dispatch = useDispatch();
    //////////////////////////////////////////////////////////////////////////// delete
    // return children
    // return <Navigate to="/login" state={{ message: location.state?.no_failure_message ? false : (location.state?.custom_failure_message ? location.state.custom_failure_message : 'Authentication failed, please log in.') }} />
    ////////////////////////////////////////////////////////////////////////////

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStatusChecked, setAuthStatusChecked] = useState(false);

    const authenticateMutation = useMutation({
        mutationFn: authenticate_post
    });

    useEffect(() => {
        authenticateMutation.mutate({
            onSuccess: data => {
                setIsAuthenticated(true);
                setAuthStatusChecked(true);
                if (data.firstName) {
                    dispatch(setFirstName(data.firstName));
                }
            },
            onError: () => {
                setIsAuthenticated(false);
                setAuthStatusChecked(true);
            }
        });
    }, [dispatch]); // including dispatch in dependency array is good practice, no real effect

    if (!authStatusChecked) {
        return <Navigate to="/authentication_loading" />
    }
    return isAuthenticated ? children : <Navigate to="/login" state={{ message: location.state?.no_failure_message ? false : (location.state?.custom_failure_message ? location.state.custom_failure_message : 'Authentication failed, please log in.') }} />;
};


