
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    email_address VARCHAR (150) NOT NULL
);

CREATE TABLE "project" (
	id SERIAL PRIMARY KEY,
	user_id int,
	title varchar(40),
	image_url varchar(25000),
	description varchar(100)
);

CREATE TABLE "list" (
	id SERIAL PRIMARY KEY,
	title varchar(40),
	project_id int,
	color_id int,
	x int,
	y int,
	z_index int
);

CREATE TABLE "note" (
	id SERIAL PRIMARY KEY,
	title varchar(40),
	project_id int,
	text varchar(10000),
	color_id int,
	x int,
	y int,
	z_index int
);

CREATE TABLE "image" (
	id SERIAL PRIMARY KEY,
	title varchar(40),
	url varchar(15000),
	project_id int,
	color_id int,
	x int,
	y int,
	z_index int
);

CREATE TABLE "task" (
	id SERIAL PRIMARY KEY,
	list_id int,
	position int,
	description varchar(250),
	completed boolean
);

CREATE TABLE "color" (
	id SERIAL PRIMARY KEY,
	color varchar(50)
);