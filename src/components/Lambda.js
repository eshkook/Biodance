import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { get_calendar } from "../api/posts.js";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function Lambda() {

    const queryClient = useQueryClient()

    const [shouldFetch, setShouldFetch] = useState(false);

    const handleGetCalendar = () => {
        setShouldFetch(true);
        queryClient.invalidateQueries(["calendar"])
    };

    const [calendarError, setCalendarError] = useState(null);

    const calendarQuery = useQuery({
        queryKey: ["calendar"],
        queryFn: get_calendar,
        onError: error => {
            setCalendarError(error);
            console.log(error)
        },
        enabled: shouldFetch, // prevent fetching on mount,
        initialData: 0
    });

    // console.log('isLoading:', calendarQuery.isLoading);
    // if (calendarQuery.isLoading) return <h1>Loading...</h1>
    // if (calendarQuery.isError) {
    //     return <pre>11111111111111 {JSON.stringify(calendarQuery.error)}</pre>
    // }
    //

    return (
        <>
            {calendarError && (  // Conditionally render the error message
                <>
                    <Typography variant="body2" color="error">
                        Error occured during calendar fetching
                    </Typography>
                    <br />
                </>
            )}
            <Button
                variant="contained"
                onClick={handleGetCalendar}
                disabled={calendarQuery.isLoading}>
                {(calendarQuery.isLoading) ? "Loading..." : "Get Calendar"}
            </Button>
            {(shouldFetch && !calendarQuery.isLoading) && (  // Conditionally render the error message
                <>
                    <Typography variant="subtitle1" component="h2">
                        Calendar: {calendarQuery.data}
                    </Typography>
                    <br />
                </>
            )}
        </>
    )
}