'use strict';

const jsonschema = require('jsonschema');

const express = require('express');
const { ensureCorrectUserOrAdmin, ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const Post = require('../models/post');
const postNewSchema = require('../schema/postNew.json');
const postUpdateSchema = require('../schema/postUpdate.json');
const postSearchSchema = require('../schema/postSearch.json');

const router = express.Router();

//Verifies the user is correct or admin and submits a new post.
router.post('/', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, postNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const post = await Post.create(req.body);
        return res.status(201).json({ post });
    } catch (err) {
        return next(err);
    }
});

//GETs all public posts.
//Optional filters for user, country, template, and title are passed in the query.
router.get('/', async function (req, res, next) {
    const q = req.query;
    if (q.country !== undefined) q.country = +q.country;

    try {
        const validator = jsonschema.validate(q, postSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const posts = await Post.findAll(q);
        return res.json({ posts });
    } catch (err) {
        return next(err);
    }
});

//GETs private posts for correct user or admin.
router.get('/:userId', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const posts = await Post.findPrivate(req.params.userId);
        return res.json({ posts });
    } catch (err) {
        return next(err);
    }
});

//GETs information on single post.
router.get('/:id', async function (req, res, next) {
    try {
        const post = await Post.get(req.params.id);
        return res.json({ post });
    } catch (err) {
        return next(err);
    }
});

//PATCHes information on a single post.
router.patch('/:id', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, postUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const post = await Post.update(req.params.id, req.body);
        return res.json({ post });
    } catch (err) {
        return next(err);
    }
});

//DELETEs post.
router.delete('/:id', ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await Post.remove(req.params.id);
        return res.json({ deleted: +req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;