const bcrypt = require('bcrypt');
const db = require('../db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeAll() {
    await db.query("DELETE FROM users");

    await db.query(`
        INSERT INTO users(username, password, first_name, last_name, isAdmin, country_id)
        VALUES ('u1', $1, 'u1f', 'u1l', FALSE, 1),
                ('u2', $2, 'u2f', 'u2l', TRUE, 2)
        RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        ]);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonAfterAll,
    commonBeforeAll,
    commonAfterEach,
    commonBeforeEach,
};