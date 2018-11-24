CREATE TABLE person
(
    id SERIAL PRIMARY KEY NOT NULL,
    first VARCHAR(100) NOT NULL,
    last VARCHAR(100),
    birthdate date
);

INSERT INTO person(first, last, birthdate) VALUES ('Thomas', 'Burton', '1878-08-26');

INSERT INTO person(first, last, birthdate) VALUES ('Herbert', 'Burton', '1847-10-01');

INSERT INTO person(first, last, birthdate) VALUES ('Mary', 'Pass', '1849-08-06');

CREATE USER familyhistoryuser WITH PASSWORD 'elijah';
GRANT SELECT, INSERT, UPDATE ON person TO familyhistoryuser;

GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO familyhistoryuser;