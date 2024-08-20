"use client"
import React, { useEffect, useState } from 'react';
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
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Contact from './Contact';
import PricingComponent from './PricingComponent';
import { fetchUser, selectUser} from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const pages = ['Packages', 'Pick/Drop', 'Pricing', 'Contact'];
const profileSettings = ['Profile','Bookings','Logout'];
const loginSettings = ['Login','Register'];

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openPricingDialog, setOpenPricingDialog] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch,anchorElUser]);

  const isAuthenticated = !!user;

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  const handleContact = () => {
    setOpenContactDialog(true);
  };

  const handlePricing = () => {
    setOpenPricingDialog(true);
  };

  const handlePickDrop = () => {
    router.push('/cabs/bookcab');
  };
  const handlePackages = () => {
    router.push('/cabs/allpackages');
  };

  const handledialogClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || "escapeKeyDown") {
      console.log("backdropClicked. Not closing dialog.");
      return;
    }
    console.log("reason empty");
    setOpenContactDialog(false);
    setOpenPricingDialog(false);
  };

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
                marginRight: '10vw',
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (page === 'Contact') handleContact();
                    if (page === 'Pricing') handlePricing();
                    if (page === 'Pick/Drop') handlePickDrop();
                    if (page === 'Packages') handlePackages();
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
                  if (page === 'Contact') handleContact();
                  if (page === 'Pricing') handlePricing();
                  if (page === 'Pick/Drop') handlePickDrop();
                  if (page === 'Packages') handlePackages();
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
              {isAuthenticated && profileSettings.map((setting,index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === 'Logout') handleLogout();
                    if (setting === 'Profile') router.push('/user/profile');
                    if (setting === 'Bookings') router.push('/user/bookings');
          
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )) 
               }

               {!isAuthenticated  &&  loginSettings.map((setting,index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseUserMenu();
                  
                    if (setting === 'Login') router.push('/user/login');
                    if (setting === 'Register') router.push('/user/signup');
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      <Dialog open={openContactDialog} onClose={handledialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Contact</DialogTitle>
        <DialogContent>
          <Contact />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenContactDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPricingDialog} onClose={handledialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Pricing</DialogTitle>
        <DialogContent>
          <PricingComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPricingDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default ResponsiveAppBar;
