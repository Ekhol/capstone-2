import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);
    console.debug('NavBar', 'currentUser=', currentUser)

    function loggedIn() {
        return (
            <React.Fragment>
                <Button onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>Log Out</Button>
            </React.Fragment>
        );
    }

    function loggedOut() {
        return (
            <React.Fragment>
                <Button href='/login' sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
                <Button href='/signup' sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button>
            </React.Fragment>
        );
    }
    return (
        <AppBar position='static'>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        SupperClub
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {currentUser ? loggedIn() : loggedOut()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;