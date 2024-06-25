"use client"

import { React, useState } from "react";
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

export default function SignUp() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [loadDialog, setloadDialog] = useState(false);


  const handleSubmit = async (event) => {

    try {
      setloading(true)
      setloadDialog(true);
      event.preventDefault();
      const response = await fetch("/api/user/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          password,
        }),

      });
      const data = await response.json();

      if (data.message === "User Created Succesfully") {
        toast.success("User Created Succesfully");

        setFirstname("")
        setEmail("")
        setphone("")
        setLastname("")
        setPassword("")
        router.push(`/user/verifyuser?email=${email}`);
      } else {

        toast.error(data.message);
      }

    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
    finally {
      setloadDialog(false)
      setloading(false);
    }
  };

  return (
    <>
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

      <ThemeProvider theme={defaultTheme}>

        <Container component="main" maxWidth="xs">

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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    value={firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    value={lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Contact no"
                    name="phone"
                    autoComplete="Contact"
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                    value={phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}

              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/user/login" variant="body2">
                    Already have an account? Sign in
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
              <LoadingComponent />

            </DialogContent>

          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}
