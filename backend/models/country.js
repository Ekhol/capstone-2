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
            `SELECT id, 
                post_text AS "postText"
            FROM posts
            WHERE country_id = $1
            ORDER BY id`,
            [id],
        );

        country.posts = postsRes.rows;

        return country;
    }

    //GETs all country IDs, names, and cuisines.
    static async getAll() {
        const countries = await db.query(
            `SELECT id,
                    name,
                    cuisine
            FROM country`
        )

        return countries;
    }
}

module.exports = Country;