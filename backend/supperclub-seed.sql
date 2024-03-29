INSERT INTO users (id, username, password, first_name, last_name, bio, profile_picture, is_public, is_admin, country_id)
VALUES (123456,
        'testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'I am a test user.',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/962px-Person_icon_BLACK-01.svg.png',
        TRUE,
        FALSE,
        2),
       (123457,
        'testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'I am a test admin.',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/962px-Person_icon_BLACK-01.svg.png',
        FALSE,
        TRUE,
        1);

INSERT INTO country (name, cuisine)
VALUES ('United States', 'American'),
    ('Great Britain', 'British'),
    ('Canada', 'Canadian'),
    ('China', 'Chinese'),
    ('Croatia', 'Croatian'),
    ('The Netherlands', 'Dutch'),
    ('Egypt', 'Egyptian'),
    ('France', 'French'),
    ('Greece', 'Greek'),
    ('India', 'Indian'),
    ('Ireland', 'Irish'),
    ('Italy', 'Italian'),
    ('Jamaica', 'Jamaican'),
    ('Japan', 'Japanese'),
    ('Kenya', 'Kenyan'),
    ('Malaysia', 'Malaysian'),
    ('Morocco', 'Moroccan'),
    ('Poland', 'Polish'),
    ('Portugal', 'Portuguese'),
    ('Russia', 'Russian'),
    ('Spain', 'Spanish'),
    ('Thailand', 'Thai'),
    ('Tunisia', 'Tunisian'),
    ('Turkey', 'Turkish'),
    ('Vietnam', 'Vietnamese');

INSERT INTO posts (title, post_text, template, user_id, country_id)
VALUES ('Test Post', 'This is a test post!', 'recipe', 123457, 1),
    ('Public TestPost', 'This is a public test post!', 'blog', 123456, 2);

INSERT INTO comments (comment_text, user_id, post_id)
VALUES ('Public Test Comment', 123457, 2);