'use strict';

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');


//Handles JWT authentication.
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        console.log("this is the headers.authorization", req.headers.authorization);
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer/, '').trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
            console.log("this is the user=", res.locals.user);
        }
        return next();
    } catch (err) {
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

function ensureAdmin(req, res, next) {
    try {
        if (!res.locals.user || !res.locals.user.isAdmin) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        console.log("this is the user, 2:", user);
        if (!(user && (user.isAdmin || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,
};