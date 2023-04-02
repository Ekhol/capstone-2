"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Country {

    //GETs a country by ID and the related users and posts.
    static async get(id) {
        const countryRes = await db.query(
            `SELECT name,
                    cuisine
            FROM country
            WHERE id = $1`,
            [id],
        );

        const country = countryRes.rows[0];

        if (!country) throw new NotFoundError(`Country not supported yet.`);

        const usersRes = await db.query(
            `SELECT id, 
                username, 
                first_name AS "firstName", 
                last_name AS "lastName", 
                profile_picture AS "profilePicture"
            FROM users
            WHERE country_id = $1
            ORDER BY username`,
            [id],
        );

        country.users = usersRes.rows;

        const postsRes = await db.query(
            `SELECT p.id, 
                p.post_text AS "postText",
                p.title AS "title",
                u.username AS "username"
            FROM posts p
            LEFT JOIN users AS u ON p.user_id = u.id
            WHERE p.country_id = $1
            ORDER BY id`,
            [id],
        );

        country.posts = postsRes.rows;

        return country;
    }

    //GETs all country IDs, names, and cuisines.
    static async getAll() {
        const countryRes = await db.query(
            `SELECT id,
                    name,
                    cuisine
            FROM country`
        );

        const countries = countryRes.rows;

        return countries;
    }
}

module.exports = Country;