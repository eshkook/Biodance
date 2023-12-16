import Authentication_Loading from './Authentication_Loading';
import { Navigate } from 'react-router-dom';
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authenticate_post } from "../api/posts.js";
import { useLocation } from "react-router-dom"

export default function ProtectedRoute({ children }) {
    
    const location = useLocation()
    console.log(9, location.state)
    return <Navigate to="/login" state={{ message: location.state?.failure_message ? location.state.failure_message : 'Authentication failed, please try to log in again.' }} /> //////delete

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStatusChecked, setAuthStatusChecked] = useState(false);

    const authenticateMutation = useMutation({
        mutationFn: authenticate_post
    });

    useEffect(() => {
        authenticateMutation.mutate({
            onSuccess: () => {
                setIsAuthenticated(true);
                setAuthStatusChecked(true);
            },
            onError: () => {
                setIsAuthenticated(false);
                setAuthStatusChecked(true);
            }
        });
    }, []);

    if (!authStatusChecked) {
        return <Authentication_Loading />
    }
    return isAuthenticated ? children : <Navigate to="/login" state={{ message: 'Authentication failed, please try to log in again.' }} />;
};


