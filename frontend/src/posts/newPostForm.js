import React, { useState, useContext } from 'react';
import UserContext from '../auth/UserContext';
import SupperClubApi from '../api/SupperClubApi';
import { useNavigate, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function NewPostForm() {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [postData, setPostData] = useState({
        title: "",
        postText: "",
        template: "recipe",
        userId: currentUser.id,
        countryId: currentUser.countryId,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await SupperClubApi.addPost(postData);
        if (res) {
            navigate(`/posts/${res.id}`);
        }
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setPostData(d => ({ ...d, [name]: value }));
    }

    if (!currentUser) {
        return (
            <Navigate to='/' />
        );
    }

    return (
        <Container maxWidth='lg'>
            <Box sx={{ my: 2 }}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='h5'>
                                New Post
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <TextField
                                    id='outline-required'
                                    label='Title'
                                    name='title'
                                    value={postData.title}
                                    onChange={handleChange}
                                    autoComplete='title'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <Select
                                    id='simple-select'
                                    value={postData.template}
                                    label='Template'
                                    name='template'
                                    onChange={handleChange}
                                >
                                    <MenuItem value='recipe'>Recipe</MenuItem>
                                    <MenuItem value='blog'>Blog</MenuItem>
                                </Select>
                            </div>
                            <div className='form-group'>
                                <TextField
                                    fullWidth
                                    id='outlined-multiline-flexible'
                                    label='Text'
                                    value={postData.postText}
                                    name='postText'
                                    multiline
                                    maxRows={10}
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

export default NewPostForm;