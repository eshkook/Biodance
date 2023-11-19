import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function NotFound() {
    const navigate = useNavigate()
    // why is the useEffect important here?
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/", {state: "Error Page no real"})
            // navigate(-1) // like clicking 'back'
            // navigate(-2) // like clicking 'back' twice
        }, 1000)

        // Cleanup the timeout if the component is unmounted
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
    // <Navigate to="/" />
    <h1>Quit yelling</h1>    
    )
  }