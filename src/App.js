import * as React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Confirmation from './components/Confirmation';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Input text color
          color: 'white',
          // Border color
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          // Label color
          '& label': {
            color: 'white',
          },
          '& label.Mui-focused': {
            color: 'white',
          },
          // Input text color
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
        },
      },
    },
  },
});

export default function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}




  // const ProtectedRoute = ({ children }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [authStatusChecked, setAuthStatusChecked] = useState(false);
  
  //   useEffect(() => {
  //     authenticateMutation.mutate({
  //       onSuccess: () => {
  //         setIsAuthenticated(true);
  //         setAuthStatusChecked(true);
  //       },
  //       onError: () => {
  //         setIsAuthenticated(false);
  //         setAuthStatusChecked(true);
  //       }
  //     });
  //   }, []); 
  
  //   if (!authStatusChecked) {
  //     return <Authentication_Loading /> 
  //   }
  
  //   return isAuthenticated ? children : <Navigate to="/login" state={{ message: 'Authentication failed, please try to log in again.' }} />;
  // };

  // const authenticateMutation = useMutation({
  //   mutationFn: authenticate_post
  // });