'use strict';

const express = require('express');
const Country = require('../models/country');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const countries = await Country.getAll();
        return res.json({ countries });
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const country = await Country.get(req.params.id);
        return res.json({ country });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;