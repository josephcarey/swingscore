-- Drop the tables
DROP TABLE "person_contest";
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
	"running_state" INTEGER DEFAULT 0,
	"event_id" INTEGER REFERENCES "event"
);

CREATE TABLE "person_contest" (
	"id" SERIAL PRIMARY KEY,
	"contest_id" INTEGER REFERENCES "contest",
	"person_id" INTEGER REFERENCES "person",
	"role" VARCHAR (255)
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


INSERT INTO "person" ("username", "password")
VALUES
	('John', 'a'),
	('James', 'a'),
	('Andre', 'a'),
	('Anna', 'a'),
	('May', 'a'),
	('Hugh', 'a')
;

INSERT INTO "person_contest" ("contest_id", "person_id", "role")
VALUES
	(1, 1, 'lead'),
	(1, 2, 'lead'),
	(1, 3, 'lead'),
	(2, 4, 'follow'),
	(2, 5, 'follow'),
	(2, 6, 'follow')
;