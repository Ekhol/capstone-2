import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from './UserContext';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        countryId: 1,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await signup(formData);
        if (res.success) {
            navigate('/');
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(d => ({ ...d, [name]: value }));
    }

    if (currentUser) {
        return (
            <Navigate to="/" />
        );
    }

    return (
        <Container maxWidth='md'>
            <Box sx={{ my: 2 }}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Typography variant='h5'>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <TextField
                                    id='outline-required'
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
                                    id='outline-required'
                                    label='First Name'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    autoComplete='firstName'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <TextField
                                    id='outline-required'
                                    label='Last Name'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    autoComplete='lastName'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <TextField
                                    id='outline-password-input'
                                    label='Password'
                                    name='password'
                                    type='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="simple-select-standard-label">Country</InputLabel>
                                    <Select
                                        labelId="simple-select-standard-label"
                                        id="simple-select-standard"
                                        value={formData.countryId}
                                        onChange={handleChange}
                                        label="Country"
                                        name='countryId'
                                        required
                                    >
                                        <MenuItem value={1}>United States</MenuItem>
                                        <MenuItem value={2}>Great Britain</MenuItem>
                                        <MenuItem value={3}>Canada</MenuItem>
                                        <MenuItem value={4}>China</MenuItem>
                                        <MenuItem value={5}>Croatia</MenuItem>
                                        <MenuItem value={6}>The Netherlands</MenuItem>
                                        <MenuItem value={7}>Egypt</MenuItem>
                                        <MenuItem value={8}>France</MenuItem>
                                        <MenuItem value={9}>Greece</MenuItem>
                                        <MenuItem value={10}>India</MenuItem>
                                        <MenuItem value={11}>Ireland</MenuItem>
                                        <MenuItem value={12}>Italy</MenuItem>
                                        <MenuItem value={13}>Jamaica</MenuItem>
                                        <MenuItem value={14}>Japan</MenuItem>
                                        <MenuItem value={15}>Kenya</MenuItem>
                                        <MenuItem value={16}>Malaysia</MenuItem>
                                        <MenuItem value={17}>Morocco</MenuItem>
                                        <MenuItem value={18}>Poland</MenuItem>
                                        <MenuItem value={19}>Portugal</MenuItem>
                                        <MenuItem value={20}>Russia</MenuItem>
                                        <MenuItem value={21}>Spain</MenuItem>
                                        <MenuItem value={22}>Thailand</MenuItem>
                                        <MenuItem value={23}>Tunisia</MenuItem>
                                        <MenuItem value={24}>Turkey</MenuItem>
                                        <MenuItem value={25}>Vietnam</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Button type='submit' onSubmit={handleSubmit} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default SignupForm;