"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Dialog, DialogContent, } from '@mui/material';
import LoadingComponent from '@/app/components/LoadingComponent';




const ResetPassword = () => {
  const router = useRouter();
  const [forgotpasswordToken, setForgotpasswordToken] = useState("");
  const [email, setEmail] = useState("");
  const [loadDialog, setloadDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setForgotpasswordToken(decodeURIComponent(params.get('forgotpasswordtoken')));
      setEmail(decodeURIComponent(params.get('email')));
    }
  }, []);

  console.log(forgotpasswordToken)
  console.log(email)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        setloadDialog(ture)
        const response = await fetch('/api/user/Resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, forgotpasswordToken }),
        });

        if (response.ok) {
          setSuccess(true);
          router.push("/user/login")
        } else {
          const errorData = await response.json();
          setErrors({ server: errorData.message });
        }
      } catch (error) {
        setErrors({ server: 'An error occurred. Please try again.' });
      }
      finally {
        setloadDialog(false);
      }
    }
  };

  const handledialogClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || "escapeKeyDown") {
      console.log("backdropClicked. Not closing dialog.");
      return;
    }
    console.log("reason empty");
    setloadDialog(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        {errors.server && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.server}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Password has been reset successfully!
          </Alert>
        )}
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Reset Password
        </Button>
      </form>

      <Dialog open={loadDialog} onClose={handledialogClose}
        style={{ backgroundColor: 'transparent' }}
        overlayStyle={{ backgroundColor: 'transparent' }}
        title='Loading'
        titleStyle={{ paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px' }}
      >

        <DialogContent>
          <LoadingComponent />
        </DialogContent>

      </Dialog>
    </Box>
  );
};

export default ResetPassword;
