import { Navigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { authenticate_post } from "../api/posts.js";
import { useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setFirstName } from '../redux/store';
import Authentication_Loading from './Authentication_Loading';

export default function ProtectedRoute({ children }) {

    const location = useLocation()
    const dispatch = useDispatch();
    //////////////////////////////////////////////////////////////////////////// delete
    // return children
    ////////////////////////////////////////////////////////////////////////////

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStatusChecked, setAuthStatusChecked] = useState(false);

    const authenticateMutation = useMutation({
        mutationFn: authenticate_post,
        onSuccess: data => {
            console.log(999999999)
            setIsAuthenticated(true);
            setAuthStatusChecked(true);
            if (data.firstName) {
                dispatch(setFirstName(data.firstName));
            }
        },
        onError: error => {
            console.log(error.message || "An error occurred")
            setIsAuthenticated(false);
            setAuthStatusChecked(true);
        }
    });

    useEffect(() => {
        setIsAuthenticated(true);
        setAuthStatusChecked(true);
    }, []);
    
    useEffect(() => {
        authenticateMutation.mutate();
    }, []);
    
    if (!authStatusChecked) {
        return <Authentication_Loading />
    }
    return isAuthenticated ? children : <Navigate to="/login" state={{ message: location.state?.no_failure_message ? false : (location.state?.custom_failure_message ? location.state.custom_failure_message : 'Authentication failed, please log in.') }} />;
};


