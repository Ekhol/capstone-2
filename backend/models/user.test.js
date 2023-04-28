'use strict';

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../expressError');
const db = require('../db');
const User = require('./user');
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//Testing the authentication method of the User class.
describe("authenticate", function () {
    test("it works", async function () {
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual({
            username: "u1",
            firstName: "u1f",
            lastName: "u1l",
        });
    });

    test("unauthorized if user does not exist", async function () {
        try {
            await User.authenticate("blah", "fakepassword");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

//Testing the registration method of the User.
describe("register", function () {
    const newUser = {
        username: "newU",
        firstName: "newName",
        lastName: "lastName",
        countryId: 3,
    };

    test("it works", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual(newUser);
        const dbFound = await db.query("SELECT * FROM users WHERE username = 'newU");
        expect(found.rows.length).toEqual(1);
    });

    test("it works for new admin", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
            isAdmin: true,
        });
        expect(user).toEqual({ ...newUser, isAdmin: true });
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].is_admin).toEqual(true);
    });

    test("duplicate data fails", async function () {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

//Testing the removal method of User.
describe("remove", function () {
    test("it works", async function () {
        await User.remove("newU");
        const res = await db.query(
            "SELECT * FROM users WHERE username='newU'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such user", async function () {
        try {
            await User.remove("blah");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});