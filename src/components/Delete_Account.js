import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { delete_post } from "../api/posts.js";
import { isValidPassword } from "./Validations.js";
import { useNavigate } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setFirstName } from '../redux/store';

export default function Delete_Account() {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(showPassword => (!showPassword));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [openDialog, setOpenDialog] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: delete_post,
        onSuccess: data => {
            dispatch(setFirstName(''));
            navigate("/", { state: { quick_message: 'Succuessfully deleted your account!' } });
        },
        onError: error => {
            if (error.message == 'Session expired, please log in again. Account was not deleted.') {
                navigate("/", { state: { quick_message: 'Session expired, please log in again. Account was not deleted.' } });
            } else {
                setErrorMessage(error.message || "An error occurred");
                console.log(error.message || "An error occurred")
            }
        }
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        password: '',
    })

    const [fieldErrorState, setFieldError] = useState({
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
            password: !isValidPassword(formState.password),
        }
        setFieldError(temp_object)

        if (!temp_object.password) {
            console.log(formState)
            setOpenDialog(true)
        } else {
            setErrorMessage("Fields in red are invalid")
        }
    }

    const handleDelete = () => {
        setOpenDialog(false)
        deleteMutation.mutate({
            password: formState.password,
        });
    };

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

                <Typography variant="subtitle1" component="h1" color="white">
                    To delete your account type in your password:
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

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <TextField
                            onChange={updateFormState}
                            onPaste={(event) => {
                                event.preventDefault();
                                setErrorMessage("Password requires manual typing")
                            }}
                            id="password-input"
                            label="Password"
                            variant="outlined"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formState.password}
                            error={fieldErrorState.password}
                            // required  // adds a '*' to indicate it is a mandatory field
                            autoFocus
                            InputProps={{ // <-- This is the part that adds the toggle button
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            disabled={deleteMutation.isLoading}>
                            {deleteMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                    </Box>
                </form>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Account"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center', marginTop: '-17px' }}>
                        <Button onClick={handleDelete} style={{ marginRight: '50px' }}>Yes</Button>
                        <Button onClick={() => setOpenDialog(false)}>No</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}

