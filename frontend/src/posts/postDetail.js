import React, { useState, useEffect } from 'react';
import SupperClubApi from '../api/SupperClubApi';
import { Link, useParams } from 'react-router-dom';
import Loading from '../helpers/LoadingHelper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommentCard from './commentCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
            <Card>
                <CardContent>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography variant='h3'>{post.title}</Typography>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography variant='h5'>
                            {post.username}
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography variant='p' align='center'>{post.postText}</Typography>
                    </Box>
                    <Container maxWidth='lg'>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                        >
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
                        </Box>
                    </Container>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography sx={{ textDecoration: 'none' }} variant='h5' component={Link} to={NEW_COMMENT_ROUTE} postId={post.id}>
                            Submit New Comment?
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default PostDetail;