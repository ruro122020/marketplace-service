import React, { useState, useEffect } from 'react'
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

import { NavLink } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { apiLogout } from '../api'

const pages = [
  {
    route: '/',
    page: 'Home'
  },
  {
    route: '/services',
    page: 'Services'
  }
]

const identity = [
  {
    route: '/signup',
    page: 'Signup'
  },
  {
    route: '/login',
    page: 'Login'
  }
]

const settings = [
  {
    route: '/profile',
    page: 'Profile',
  },
  {
    route: '/account',
    page: 'Account'
  },
  {
    route: '/user',
    page: 'Dashboard'
  }
]

const Navbar = () => {
  //useAuth is from AuthContext.jsx file
  const { isLoggedIn, logout, updateUser, user } = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
    const success = await apiLogout()
    if (success) {
      logout()
      updateUser(null)
    }
  }
  return (
    <AppBar position="sticky" sx={{ borderRadius: '5px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CleanScape
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
              {pages.map(({ route, page }) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to={route}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page}
                </MenuItem>
              ))}
              {!isLoggedIn &&
                identity.map(({ route, page }) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={NavLink}
                    to={route}
                    sx={{ my: 2, display: 'block' }}
                  >
                    {page}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            Services
          </Typography>
          {/*This section is the desktop size */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ route, page }) => (
              <Button
                key={page}
                as={NavLink}
                to={route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {!isLoggedIn &&
              identity.map(({ route, page }) => (
                <Button
                  key={page}
                  as={NavLink}
                  to={route}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          {
            isLoggedIn &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Your Photo" src={user.image_url} />
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
                {settings.map(({ route, page }) => (
                  <MenuItem key={page} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      as={NavLink}
                      to={route}
                    >{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    as={NavLink}
                    to='/'
                    onClick={handleLogout}
                  >Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>

  )
}

export default Navbar
