import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CommentCard({ userId, username, commentText }) {
    const ROUTE = `/users/${userId}`;
    return (
        <Card sx={{ minWidth: 200, maxWidth: 500 }}>
            <CardContent>
                <Typography
                    variant='p'
                    component={Link}
                    to={ROUTE}
                    sx={{ underline: 'hover' }}>
                    {username}
                </Typography>
                <br></br>
                <Typography variant='p'>{commentText}</Typography>
            </CardContent>
        </Card>
    );
}

export default CommentCard;