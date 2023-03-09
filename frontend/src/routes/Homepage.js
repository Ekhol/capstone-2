import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Homepage() {
    const { currentUser } = useContext(UserContext);

    function loggedIn() {
        return (
            <Typography
                variant="p"
                noWrap
                sx={{
                    my: 2, color: 'inherit', display: 'block'
                }}>
                Welcome Back, {currentUser.firstName || currentUser.username}
            </Typography>
        );
    }

    function loggedOut() {
        return (
            <React.Fragment>
                <Button href='/login' sx={{ my: 2, color: 'black', display: 'block' }}>Log In</Button>
                <Button href='/signup' sx={{ my: 2, color: 'black', display: 'block' }}>Register</Button>
            </React.Fragment>
        )
    }

    return (
        <Container maxWidth='x1'>
            <Box
                mt={6}
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="h1"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 7900,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        SupperClub
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        variant="p"
                        sx={{ my: 2, color: 'inherit', display: 'block' }}
                    >
                        FILLER TEXT IGNORE ME PLEASE.
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {currentUser ? loggedIn() : loggedOut()}
                </Box>
            </Box>
        </Container>
    );
}

export default Homepage;