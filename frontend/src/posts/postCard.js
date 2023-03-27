import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function PostCard({ id, title, username }) {
    const ROUTE = `/posts/${id}`;
    return (
        <Card sx={{ minWidth: 200, maxWidth: 500 }}>
            <CardContent>
                <Typography
                    variant='h4'
                    component={Link}
                    to={ROUTE}
                    sx={{ underline: 'hover' }}>
                    {title}
                </Typography>
                <Typography variant='h5'>{username}</Typography>
            </CardContent>
        </Card>
    );
}

export default PostCard;