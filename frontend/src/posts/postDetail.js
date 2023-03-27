import React, { useState, useEffect } from 'react';
import SupperClubApi from '../api/SupperClubApi';
import { Link, useParams } from 'react-router-dom';
import Loading from '../helpers/LoadingHelper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommentCard from './commentCard';

function PostDetail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const NEW_COMMENT_ROUTE = `/posts/${id}/comment`;

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
            <Container maxWidth='lg'>
                {post.comments.length
                    ? (
                        <div>
                            {post.comments.map(c => (
                                <Box>
                                    <CommentCard
                                        userId={c.userId}
                                        username={c.username}
                                        commentText={c.commentText}
                                    />
                                </Box>
                            ))}
                        </div>
                    ) : (
                        <Typography variant='h4'>
                            No Comments Yet!
                        </Typography>
                    )}
            </Container>
            <Typography variant='h5' component={Link} to={NEW_COMMENT_ROUTE} postId={post.id}>
                Submit New Comment?
            </Typography>
        </Container>
    );
}

export default PostDetail;