import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await login(formData);
        if (res.success) {
            navigate('/');
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(loginfo => ({ ...loginfo, [name]: value }));
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{ my: 2 }}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Typography variant='h5'>Log In</Typography>
                        <form onSubmit={handleSubmit}
                            noValidate
                            autoComplete='off'>
                            <div className='form-group'>
                                <TextField
                                    id='outlined-required'
                                    label='Username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete='username'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <TextField
                                    id='outlined-password-input'
                                    label='Password'
                                    name='password'
                                    value={formData.password}
                                    type='password'
                                    onChange={handleChange}
                                    autoComplete='current-password'
                                    required
                                />
                            </div>
                            <Button type='submit' onClick={handleSubmit} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Enter
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container >
    );
}

export default LoginForm;