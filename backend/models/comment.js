'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

class Comment {

    //Creates a new comment.
    static async create(data) {
        const res = await db.query(
            `INSERT INTO comments (comment_text AS "commentText",
                                user_id AS "userId",
                                post_id AS "postID")
            VALUES ($1, $2, $3)
            RETURNING comment_text AS "commentText", user_id AS "userID", post_id AS "postId"`,
            [
                data.commentText,
                data.userId,
                data.postId
            ]
        );

        let comment = res.rows[0];

        return comment;
    }

    //GETs all comments tied to a specific post ID.
    static async findAll(id) {
        const res = await db.query(
            `SELECT c.comment_text AS "commentText",
                    u.username AS "username",
                    u.profile_picture AS "profilePicture
            FROM comments c
            LEFT JOIN users AS u ON c.user_id = u.id
            LEFT JOIN posts AS p ON c.post_id = p.id
            WHERE c.post_id = $1`,
            [id],
        );

        const comments = res.rows;

        return comments;
    }

    //GETs comment by id.
    static async get(id) {
        const res = await db.query(
            `SELECT comment_text AS "commentText",
                    user_id AS "userID",
                    post_id AS "postID"
            WHERE id = $1`,
            [id],
        );

        const comment = res.rows[0];

        if (!comment) throw new NotFoundError(`Comment Not Found. ID: ${id}`);

        return comment;
    }

    //PATCHes a comment text info.
    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                commentText: "comment_text"
            }
        );

        const idVarIndex = "$" + (values.length + 1);

        const querySql = `UPDATE comments
                        SET ${setCols}
                        WHERE id = ${idVarIndex}
                        RETURNING comment_text AS "commentText"`;

        const res = await db.query(querySql, [...values, id]);
        const comment = res.rows[0];

        if (!comment) throw new NotFoundError(`Comment Not Found. ID: ${id}`);

        return comment;
    }

    //DELETEs a specific comment.
    static async remove(id) {
        let res = await db.query(
            `DELETE
                FROM comments
                WHERE id = $1
                RETURNING id`,
            [id],
        );

        const comment = res.rows[0];

        if (!comment) throw new NotFoundError(`Comment Not Found. ID: ${id}`);
    }
}

module.exports = Comment;