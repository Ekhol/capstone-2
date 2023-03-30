import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../posts/postCard';
import SupperClubApi from '../api/SupperClubApi';
import Loading from '../helpers/LoadingHelper';
import Box from '@mui/material/Box';

function Country() {
    console.debug('Country');
    const { id } = useParams();
    const [posts, setPosts] = useState(null);

    useEffect(function getPosts() {
        console.debug('Country useEffect getPosts');
        async function getCountryPosts() {
            setPosts(await SupperClubApi.getCountryPosts(id));
        }
        getCountryPosts();
    }, [id]);

    if (!posts) return <Loading />;

    return (
        <div>
            <Box sx={{ py: 2 }}
                display='flex'
                justifyContent='center'
            >
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
                    )}
            </Box>
        </div>
    );
}

export default Country;