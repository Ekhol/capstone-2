import React, { useState, useEffect } from 'react';
//import Country from '../countries/Country';
import { useParams } from 'react-router-dom';
import SupperClubApi from '../api/SupperClubApi';
import Loading from '../helpers/LoadingHelper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PostCard from '../posts/postCard';
import MealDBList from '../countries/MealDBList';

function CountryRoute() {
    const { id } = useParams();
    const [country, setCountry] = useState(null);
    console.debug(country);

    useEffect(function getCountry() {
        console.debug('CountryRoute useEffect getPosts');
        async function getPreliminaryCountry() {
            setCountry(await SupperClubApi.getCountry(id));
        }
        getPreliminaryCountry();
    }, [id]);


    if (!country) return <Loading />;

    const posts = country.posts;

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Box>
                    <MealDBList cuisine={country.cuisine} />
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
                        {country.cuisine}
                    </Typography>
                </Box>
                <Box>
                    {posts.length
                        ? (
                            <div>
                                {posts.map(p => (
                                    <Box>
                                        <PostCard
                                            id={p.id}
                                            title={p.title}
                                            username={p.username}
                                        />
                                    </Box>
                                ))}
                            </div>
                        ) : (
                            <p>No Posts Found.</p>
                        )
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

export default CountryRoute;