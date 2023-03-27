import React, { useState, useEffect } from 'react';
import PostCard from './postCard';
import SupperClubApi from '../api/SupperClubApi';
import SearchBar from '../helpers/SearchBar';
import Loading from '../helpers/LoadingHelper';
import Box from '@mui/material/Box';

function PostList() {
    console.debug('PostList');
    const [posts, setPosts] = useState(null);

    useEffect(function getPreliminaryPosts() {
        console.debug('PostList useEffect GetPreliminaryPosts');
        search();
    }, []);

    async function search(query) {
        let posts = await SupperClubApi.getPublicPosts(query);
        setPosts(posts);
    }

    if (!posts) return <Loading />;

    return (
        <div>
            <Box
                sx={{ py: 2 }}
                display='flex'
                justifyContent='center'
            >
                <SearchBar queryFor={search} />
            </Box>
            <Box
                sx={{ py: 2 }}
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

export default PostList;