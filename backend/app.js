'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NotFoundError } = require('./expressError');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const countryRoutes = require('./routes/countries');
const { authenticateJWT } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/countries', countryRoutes);

//404 error handler.
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

//Generic error handler.
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
});

module.exports = app;