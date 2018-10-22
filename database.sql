-- Drop the tables
DROP TABLE "person";
DROP TABLE "contest";
DROP TABLE "event";


-- Create the tables
CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "wsdc_number" INTEGER,
    "img_path" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" VARCHAR(11),
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255)
);

CREATE TABLE "contest" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"event_id" INTEGER REFERENCES "event"
);

-- Add test data
INSERT INTO "event" ("name")
VALUES ('Michigan Classic'),
('Spotlight'),
('SWINGesota Summer Spectacular');

INSERT INTO "contest" ("name", "event_id")
VALUES
	('Advanced JJ', 1),
	('Intermediate JJ', 1),
	('Intermediate SS', 1),
	('Novice JJ', 2),
	('Newcomer JJ', 2),
	('Newcomer SS', 2),
	('Role Swap', 3),
	('Blindfold', 3),
	('On Fire', 3);