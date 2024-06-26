"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import Contact from './Contact';
import PricingComponent from './PricingComponent';

const pages = ['Packages', 'Pick/Drop', 'Pricing', 'Contact'];
const settings = ['Profile', 'Bookings', 'Signup', 'Logout'];

function ResponsiveAppBar() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openContactDialoge, setopenContactDialoge] = React.useState(false);
    const [openPricingDialoge, setopenPricingDialoge] = React.useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/user/Logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.message === "Logout Successfully") {
                toast.success(data.message);
                router.push("/user/login");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const handleContact = () => {
        setopenContactDialoge(true);
    }
    const handlePricing = () => {
        setopenPricingDialoge(true);
    }

    return (
        <AppBar position="static">
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
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link href="/" passHref>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginRight: '10vw'
                            }}
                        >
                            Holiday
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        if (page === 'Contact') {
                                            handleContact();
                                        }
                                        if (page === 'Pricing') {
                                            handlePricing();
                                        }
                                    }}
                                >

                                    <Typography textAlign="center">{page}</Typography>

                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Link href="/" passHref>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Holiday
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (

                            <Button
                                key={page}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    if (page === 'Contact') {
                                        handleContact();
                                    }
                                    if (page === 'Pricing') {
                                        handlePricing();
                                    }
                                }}
                                sx={{ my: 2, color: 'white', display: 'block', margin: '5px' }}
                            >
                                {page}
                            </Button>

                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => {
                                    handleCloseUserMenu();
                                    if (setting.toLowerCase() === 'logout') {
                                        handleLogout();
                                    } else {
                                        router.push(`/user/${setting.toLowerCase()}`);
                                    }
                                }}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
                <Dialog open={openContactDialoge} onClose={() => setopenContactDialoge(false)}>
                    <DialogTitle>Confirm Booking</DialogTitle>
                    <DialogContent>
                        <Contact />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setopenContactDialoge(false)} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openPricingDialoge} onClose={() => setopenPricingDialoge(false)}>
                    
                    <DialogContent>
                       <PricingComponent/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setopenPricingDialoge(false)} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
