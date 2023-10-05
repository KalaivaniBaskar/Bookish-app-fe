import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../assets/logo.jpg'
import bookish from '../assets/bookish.png';
import { useNavigate } from 'react-router-dom';
import { useCTX } from '../Context';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
    const {user, setUser} = useCTX();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
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
  const toLogin = () => {
    handleCloseNavMenu();
    navigate('/login')
  }
  const toSignUp = () => {
    handleCloseNavMenu();
    navigate('/signup')
  }
  const toHome = () => {
    handleCloseNavMenu();
    navigate('/')
  }
  const toAdd = () => {
    handleCloseNavMenu();
    navigate('/add-product')
  }
  const toProfile = () => {
    handleCloseUserMenu();
    navigate('/profile')
  }
  const toOrders = () => {
    handleCloseUserMenu();
    navigate('/my-orders')
  }
  const handleLogOut = () => {
    handleCloseUserMenu();
    localStorage.clear();
    setUser({
        id: "",
        username: "",
        email : "",
        phone: "",
        contacts : [],
        role: ""
    })
    navigate('/login')
  }
  return (
    <AppBar position="static" sx={{bgcolor: 'slategray'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="logo" src={bookish} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
               fontFamily: 'Recursive', 
              letterSpacing: '.3rem',
              color:  'white',
              textDecoration: 'none',
            }}
          >
            Bookish
          </Typography>

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
                <MenuItem key='Login' onClick={toLogin}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem key="SignUp" onClick={toSignUp}>
                  <Typography textAlign="center">SignUp</Typography>
                </MenuItem>
                <MenuItem key="Home" onClick={toHome}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                { user.role === "admin" &&
                <MenuItem key="Add" onClick={toAdd}>
                  <Typography textAlign="center">ADD+</Typography>
                </MenuItem>
                }
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Avatar alt="logo" src={bookish} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Recursive', 
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Bookish
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="Login"
                onClick={toLogin}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
              <Button
                key="SignUp"
                onClick={toSignUp}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                SignUp
              </Button>
              <Button
                key="Home"
                onClick={toHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              { user.role === "admin" &&
                <Button
                key="Add"
                onClick={toAdd}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                ADD+
              </Button>
                }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} sx={{bgcolor: '#0E0E0E'}} src={user.pic_URL} />
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
                <MenuItem key="Profile" onClick={toProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="My Orders" onClick={toOrders}>
                  <Typography textAlign="center">My Orders</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={handleLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
