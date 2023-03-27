import React, { useState, useEffect } from 'react';
import SupperClubApi from '../api/SupperClubApi';
import { Link, useParams } from 'react-router-dom';
import Loading from '../helpers/LoadingHelper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function PostDetail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    //const ROUTE = `/users/${post.username}`;

    useEffect(function getPostDetails() {
        async function getPost() {
            setPost(await SupperClubApi.getPost(id));
        }
        getPost();
    }, [id]);

    if (!post) return <Loading />;

    //if (!post.isPublic && currentUser.username !== post.username) return <Navigate to='/' />

    return (
        <Container maxWidth='xl'>
            <Typography variant='h3'>{post.title}</Typography>
            <Typography variant='h5'
                component={Link}
                to='/'
                sx={{ underline: 'hover' }}
            >
                {post.username}
            </Typography>
            <Typography variant='p'>{post.postText}</Typography>
        </Container>
    );
}

export default PostDetail;