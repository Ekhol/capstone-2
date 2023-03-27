import React, { useState, useContext } from 'react';
import UserContext from '../auth/UserContext';
import SupperClubApi from '../api/SupperClubApi';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NewCommentForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const postIdInt = parseInt(id);
    const { currentUser } = useContext(UserContext);
    const [commentData, setCommentData] = useState({
        commentText: '',
        userId: currentUser.id,
        postId: postIdInt,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await SupperClubApi.addComment(commentData);
        if (res) {
            navigate(`/posts/${postIdInt}`);
        }
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setCommentData(d => ({ ...d, [name]: value }));
    }

    if (!currentUser) {
        return (
            <Navigate to='/' />
        );
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{ my: 2 }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography variant='p'>
                            New Comment
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <TextField
                                    id='outlined-multiline-flexible'
                                    label='Text'
                                    value={commentData.commentText}
                                    name='commentText'
                                    minRows={10}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type='submit' onSubmit={handleSubmit} sx={{ my: 2, color: 'black', display: 'block' }}>
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default NewCommentForm;