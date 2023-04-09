import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CommentCard({ userId, username, commentText }) {

    return (
        <Card sx={{ minWidth: 200, maxWidth: 500 }}>
            <CardContent>
                <Typography
                    variant='p'>
                    {username}
                </Typography>
                <br></br>
                <Typography variant='p'>{commentText}</Typography>
            </CardContent>
        </Card>
    );
}

export default CommentCard;