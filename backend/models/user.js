'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForPartialUpdate } = require('../helpers/sql');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../expressError');

const { BCRYPT_WORK_FACTOR } = require('../config.js');

class User {

    //Authenticate the user using the username and password. Returns 
    //basic data about the user and throws an unauthorized error if 
    //the user is not found or the password is wrong.
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                is_admin as "isAdmin"
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid username or password');
    }

    //Register a new user.
    static async register({
        username,
        password,
        firstName,
        lastName,
        bio,
        profilePicture,
        isPublic,
        isAdmin,
        countryId
    }) {
        const checkDuplicate = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username],
        );

        if (checkDuplicate.rows[0]) {
            throw new BadRequestError(`Username already taken: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const res = await db.query(
            `INSERT INTO users
            (username,
            password,
            first_name,
            last_name,
            is_admin,
            country_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, first_name AS "firstName", last_name AS "lastName", is_admin AS "isAdmin", country_id AS "countryId"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                isAdmin,
                countryId,
            ],
        );

        const user = res.rows[0];

        return user;
    };

    //GET data on single user.
    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                bio,
                profile_picture AS "profilePicture",
                is_public AS "isPublic"
            FROM users
            WHERE username = $1`,
            [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No such user: ${username}`);

        return user;
    }


    //GET data on all public users with optional filters by country.
    static async findAll({ country } = {}) {
        let query = `SELECT u.username,
                        u.first_name AS "firstName",
                        u.last_name AS "lastName",
                        u.bio,
                        u.profile_picture AS "profilePicture",
                        u.is_public AS "isPublic"
                    FROM users u
                    LEFT JOIN country AS c on c.id = u.country_id`;
        let whereExp = [];
        let queryVal = [];

        if (country !== undefined) {
            queryVal.push(country);
            whereExp.push(`u.country_id = ${queryVal.length}`);
        }

        if (whereExp.length > 0) {
            query += " WHERE " + whereExp[0];
        }

        query += " ORDER BY username";
        const res = await db.query(query, queryVal);
        return res.rows;
    }

    //PATCHes data for a specific user.
    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
                bio: "bio",
                profilePicture: "profile_picture",
            }
        );

        const usernameVarIndex = "$" + (values.length + 1);

        const querySql = `UPDATE users
                        SET ${setCols}
                        WHERE username = ${usernameVarIndex}
                        RETURNING username,
                            first_name AS "firstName",
                            last_name AS "lastName",
                            bio,
                            profile_picture AS "profilePicture"`;
        const res = await db.query(querySql, [...values, username]);
        const user = res.rows[0];

        if (!user) throw new NotFoundError(`No such user: ${username}`);

        delete user.password;
        return user;
    }

    //DELETE given user.
    static async remove(username) {
        let result = await db.query(
            `DELETE
               FROM users
               WHERE username = $1
               RETURNING username`,
            [username],
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No such user: ${username}`);
    }
}

module.exports = User;