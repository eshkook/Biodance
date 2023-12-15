import Authentication_Loading from './Authentication_Loading';
import { Navigate } from 'react-router-dom';
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { authenticate_post } from "../api/posts.js";

export default function ProtectedRoute({ children }) {

    return children //////delete

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


