"use client"
import * as React from 'react';
import { useRouter } from "next/navigation";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogContent, } from '@mui/material';
import LoadingComponent from '@/app/components/LoadingComponent';



const defaultTheme = createTheme();

export default function Login() {
 
  const router = useRouter();
  const [loading,setloading] = React.useState(false);
  const [loadDialog, setloadDialog] = React.useState(false);  
    const handleSubmit = async (event) => {
      setloading(true);
      try {
 
        event.preventDefault();
        setloadDialog(true);
        const formData = new FormData(event.currentTarget);
  
        const email = formData.get('email');
        const password = formData.get('password');
  
        const response = await fetch("/api/user/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })
  
        const data = await response.json();
    
  
        if (data.message === "Logged in succesfully") {
          toast.success("Logged in succesfully");
          event.target.reset(); 
          router.push('/'); 
        } else {
          toast.error(data.message);
        }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
    finally
    {
      setloadDialog(false);
      setloading(false);
    }

  }


    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <ToastContainer
             position="top-right" 
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeButton={true}
            pauseOnHover={true}
            draggable={true}
            theme="colored"
          />
        {/* <CssBaseline /> */}
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               {loading ? <CircularProgress size={24} sx={{ color: 'white' }}/> : "login"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/user/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Dialog open={loadDialog} onClose={() => setloadDialog(false)}
                style={{ backgroundColor: 'transparent' }}
                overlayStyle={{ backgroundColor: 'transparent' }}
                title='Loading'
                titleStyle={{ paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px' }}
            >

                <DialogContent>
                    <LoadingComponent/>
                </DialogContent>

            </Dialog>
         
        </Container>
      </ThemeProvider>
    );
  }
