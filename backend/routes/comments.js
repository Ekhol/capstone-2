'use strict';

const jsonschema = require('jsonschema');

const express = require('express');
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const Comment = require('../models/comment');
const commentNewSchema = require('../schema/commentNew.json');
const commentUpdateSchema = require('../schema/commentUpdate.json');

const router = express.Router();

//Verifies the user is logged in and submits a new comment.
router.post('/', ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, commentNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const comment = await Comment.create(req.body);
        return res.status(201).json({ comment });
    } catch (err) {
        return next(err);
    }
});

//GETs list of comments tied to a given post ID.
router.get('/:id', async function (req, res, next) {
    try {
        const comments = await Comment.findAll(req.params.id);
        return res.json({ comments });
    } catch (err) {
        return next(err);
    }
});

//PATCHes a comment from a specific ID.
router.patch('/:id', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, commentUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const comment = await Comment.update(req.params.id, req.body);
        return res.json({ comment });
    } catch (err) {
        return next(err);
    }
});

//DELETEs a comment from a specific ID.
router.delete('/:id', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await Comment.remove(req.params.id);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;