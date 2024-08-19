"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Dialog, DialogContent } from '@mui/material';
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/app/components/LoadingComponent';

const VerifyUser = () => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loadDialog, setLoadDialog] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setEmail(params.get('email') || "");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            setLoadDialog(true);
            const response = await fetch('/api/user/Verifyuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                router.push("/user/login");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoadDialog(false);
        }
    };

    const handledialogClose = (event, reason) => {
        if ((reason && reason === "backdropClick") || "escapeKeyDown") {
          console.log("backdropClicked. Not closing dialog.");
          return;
        }
        console.log("reason empty");
        setLoadDialog(false);
      };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 8,
                    p: 3,
                    border: '1px solid grey',
                    borderRadius: '8px',
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Verify Your Account
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please enter the OTP sent to your email to verify your account.
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography variant="body2" color="success" gutterBottom>
                        {success}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    margin="normal"
                    label="OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Verify OTP
                </Button>
            </Box>
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
        </Container>
    );
};

export default VerifyUser;
