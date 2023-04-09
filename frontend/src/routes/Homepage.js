import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import Typography from '@mui/material/Typography';
import CountriesList from "../countries/CountriesList";
//import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


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
                <Button href='/login' sx={{ my: 2, color: 'white', display: 'block' }}>Log In</Button>
                <Button href='/signup' sx={{ my: 2, color: 'white', display: 'block' }}>Register</Button>
            </React.Fragment>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Box
                    mt={2}
                >
                    <Typography variant="h3">
                        Countries
                    </Typography>
                    <CountriesList />
                </Box>
            </Grid>
            <Grid item xs={'auto'}>
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
                        A Resource for Hungry People at Home and Abroad.
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {currentUser ? loggedIn() : loggedOut()}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Homepage;