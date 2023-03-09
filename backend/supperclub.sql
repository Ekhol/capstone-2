\echo 'Delete and recreate supperclub db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE supperclub;
CREATE DATABASE supperclub;
\connect supperclub

\i supperclub-schema.sql
\i supperclub-seed.sql

\echo 'Delete and recreate supperclub_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE supperclub_test;
CREATE DATABASE supperclub_test;
\connect supperclub_test

\i supperclub-schema.sql
