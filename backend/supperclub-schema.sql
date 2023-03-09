CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT,
    profile_picture TEXT,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    country_id INTEGER REFERENCES country ON DELETE CASCADE
);

CREATE TABLE country (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    post_text TEXT NOT NULL,
    template TEXT NOT NULL DEFAULT,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    country_id INTEGER REFERENCES country ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_text TEXT NOT NULL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts ON DELETE CASCADE
);