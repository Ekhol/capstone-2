'use strict';

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Post {

    //Creates a new post!
    static async create(data) {
        const res = await db.query(
            `INSERT INTO posts (title,
                                post_text,
                                template,
                                user_id,
                                country_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, post_text AS "postText", template, user_id AS "userId", country_id AS "countryId"`,
            [
                data.title,
                data.postText,
                data.template,
                data.userId,
                data.countryId
            ]
        );

        let post = res.rows[0];

        return post;
    }

    //GETs all posts with optional filters for user, author's current country, template, and title.
    static async findAll({ user, country, template, title } = {}) {
        let query = `SELECT p.id,
                        p.title AS "title",
                        p.post_text AS "postText",
                        p.template,
                        u.username AS "username",
                        u.profile_picture AS "profilePicture",
                        u.is_public AS "isPublic",
                        c.name AS "countryName"
                    FROM posts p
                    LEFT JOIN users AS u ON p.user_id = u.id
                    LEFT JOIN country AS c ON p.country_id = c.id`;
        let whereExp = [];
        let queryVal = [];

        if (user !== undefined) {
            queryVal.push(user);
            whereExp.push(`p.user_id = $${queryVal.length}`);
        }

        if (country !== undefined) {
            queryVal.push(country);
            whereExp.push(`p.country_id = $${queryVal.length}`);
        }

        if (template !== undefined) {
            queryVal.push(template);
            whereExp.push(`p.template = $${queryVal.length}`);
        }

        if (title !== undefined) {
            queryVal.push(`%${title}%`);
            whereExp.push(`p.title ILIKE $${queryVal.length}`);
        }

        if (whereExp.length > 0) {
            query += " WHERE " + whereExp.join(" AND ");
        }

        query += " ORDER BY title";
        const res = await db.query(query, queryVal);
        return res.rows;
    }

    //GETs post information from post with specific ID and all comments with the 
    //same post_id.
    static async get(id) {
        const postRes = await db.query(
            `SELECT p.id,
                    p.title,
                    u.username AS "username",
                    u.is_public AS "isPublic",
                    p.post_text AS "postText",
                    p.user_id AS "userId",
                    p.country_id AS "countryId"
            FROM posts p
            LEFT JOIN users AS u ON p.user_id = u.id
            WHERE p.id = $1`,
            [id],
        );

        const post = postRes.rows[0];

        if (!post) throw new NotFoundError(`Post Not Found. ID: ${id}`);

        const commentsRes = await db.query(
            `SELECT id,
                    comment_text AS "commentText",
                    user_id AS "userId"
            FROM comments
            WHERE post_id = $1`,
            [id],
        );


        post.comments = commentsRes.rows;

        return post;
    }

    //PATCHes the title and text of a specific post.
    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                title: "title",
                postText: "post_text"
            }
        );

        const idVarIndex = "$" + (values.length + 1);

        const querySql = `UPDATE posts
                        SET ${setCols}
                        WHERE id = ${idVarIndex}
                        RETURNING title,
                            post_text AS "postText"`;

        const res = await db.query(querySql, [...values, id]);
        const post = res.rows[0];

        if (!post) throw new NotFoundError(`Post Not Found. ID: ${id}`);

        return post;
    }

    //DELETEs a given post.
    static async remove(id) {
        let res = await db.query(
            `DELETE
                FROM posts
                WHERE id = $1
                RETURNING id`,
            [id],
        );

        const post = res.rows[0];

        if (!post) throw new NotFoundError(`Post Not Found. ID: ${id}`);
    }
}

module.exports = Post;