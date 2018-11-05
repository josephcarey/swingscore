-- Drop the tables
DROP TABLE IF EXISTS "person_contest" CASCADE;
DROP TABLE IF EXISTS "person" CASCADE;
DROP TABLE IF EXISTS "contest" CASCADE;
DROP TABLE IF EXISTS "event" CASCADE;
DROP TABLE IF EXISTS "couple" CASCADE;
DROP TABLE IF EXISTS "score" CASCADE;


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
	"name" VARCHAR (255),
	"initials" VARCHAR(10)
);

CREATE TABLE "contest" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255),
	"initials" VARCHAR(10),
	"has_started" BOOLEAN DEFAULT FALSE,
	"has_ended" BOOLEAN DEFAULT FALSE,
	"event_id" INTEGER REFERENCES "event"
);

CREATE TABLE "person_contest" (
	"id" SERIAL PRIMARY KEY,
	"contest_id" INTEGER REFERENCES "contest",
	"person_id" INTEGER REFERENCES "person",
	"role" VARCHAR (255),
	"bib_number" INTEGER
);


CREATE TABLE "couple" (
	"id" SERIAL PRIMARY KEY,
	"contest_id" INTEGER REFERENCES "contest",
	"lead_id" INTEGER REFERENCES "person",
	"follow_id" INTEGER REFERENCES "person"
);

CREATE TABLE "score" (
	"id" SERIAL PRIMARY KEY,
	"judge_id" INTEGER REFERENCES "person",
	"couple_id" INTEGER REFERENCES "couple",
	"placement" INTEGER
);

-- Add test data
INSERT INTO "event" ("name", "initials")
VALUES ('Michigan Classic', 'MC'),
('Spotlight', 'S'),
('SWINGesota Summer Spectacular', 'SS'),
('SWINGesota Winter Workshop Weekend', 'WW');

INSERT INTO "contest" ("name", "initials", "event_id")
VALUES
	('Intermediate JJ', 'JJ', 1),
	('Intermediate SS', 'SS', 1),
		('Novice JJ', 'JJ', 2),
	('Newcomer JJ', 'JJ', 2),
	('Newcomer SS', 'SS', 2),
	('Role Swap', 'RS', 3),
	('Blindfold','B', 3);


INSERT INTO "person" ("username", "password")
VALUES
	-- Leads
	('Minho Heo', 'a'),
	('Tuan Nguyen', 'a'),
	('Michael Ignatius Ng', 'a'),
	('Benjamin Meyer', 'a'),
	('Gaetan Grondin', 'a'),
	('JD Nafzinger', 'a'),
	('Ariel Schwartz', 'a'),
	('Craig Hogle', 'a'),
	('Matthew Fox', 'a'),
	('Steven James', 'a'),
	('Tim Morrow', 'a'),
	('Henry Thomas', 'a'),
	-- Follows
	('Lily Auclair', 'a'),
	('Leigh VanLerberg', 'a'),
	('Kaitlyn Lankin Kraatz', 'a'),
	('Michelle Grasso', 'a'),
	('Claren Oesch', 'a'),
	('Yubin Kim', 'a'),
	('Cindy Breeden', 'a'),
	('Tania Gurdasani', 'a'),
	('Srinidhi Murali', 'a'),
	('Elena Bogdanel', 'a'),
	('Samantha Kamin', 'a'),
	('Dimitri Hector', 'a'),
	-- Judges
	('Jesse', 'a'),
	('Arthur', 'a'),
	('Thibault', 'a'),
	('Sophy', 'a'),
	('Nelson', 'a')
;

INSERT INTO "person_contest" ("contest_id", "person_id", "role", "bib_number")
VALUES
	-- Leads
	(1, 1, 'lead', 101),
	(1, 2, 'lead', 112),
	(1, 3, 'lead', 126),
	(1, 4, 'lead', 133),
	(1, 5, 'lead', 152),
	(1, 6, 'lead', 153),
	(1, 7, 'lead', 167),
	(1, 8, 'lead', 171),
	(1, 9, 'lead', 188),
	(1, 10, 'lead', 191),
	(1, 11, 'lead', 201),
	(1, 12, 'lead', 202),
	-- Follows
	(1, 12, 'follow', 107),
	(1, 13, 'follow', 118),
	(1, 14, 'follow', 119),
	(1, 15, 'follow', 132),
	(1, 16, 'follow', 145),
	(1, 17, 'follow', 146),
	(1, 18, 'follow', 147),
	(1, 19, 'follow', 158),
	(1, 20, 'follow', 161),
	(1, 21, 'follow', 175),
	(1, 22, 'follow', 182),
	(1, 23, 'follow', 185),
	(1, 24, 'follow', 193),
	-- Judges
	(1, 25, 'judge', 1),
	(1, 26, 'judge', 2),
	(1, 27, 'judge', 3),
	(1, 28, 'judge', 4),
	(1, 29, 'judge', 5)
;

INSERT INTO "couple" ("contest_id", "lead_id", "follow_id")
VALUES
	(1,1,13),
	(1,2,14),
	(1,3,15),
	(1,4,16),
	(1,5,17),
	(1,6,18),
	(1,7,19),
	(1,8,20),
	(1,9,21),
	(1,10,22),
	(1,11,23),
	(1,12,24)
;

INSERT INTO "score" ("judge_id", "couple_id", "placement")
VALUES
	-- Jesse
	(25,1,1),
	(25,2,2),
	(25,3,3),
	(25,4,9),
	(25,5,4),
	(25,6,7),
	(25,7,5),
	(25,8,8),
	(25,9,11),
	(25,10,6),
	(25,11,10),
	(25,12,12),
	-- Arthur
	(26,1,1),
	(26,2,2),
	(26,3,4),
	(26,4,8),
	(26,5,3),
	(26,6,11),
	(26,7,5),
	(26,8,6),
	(26,9,7),
	(26,10,9),
	(26,11,10),
	(26,12,12),
	-- Thibault
	(27,1,2),
	(27,2,1),
	(27,3,5),
	(27,4,4),
	(27,5,6),
	(27,6,3),
	(27,7,11),
	(27,8,10),
	(27,9,8),
	(27,10,9),
	(27,11,7),
	(27,12,12),
	-- Sophy
	(28,1,1),
	(28,2,4),
	(28,3,2),
	(28,4,5),
	(28,5,12),
	(28,6,9),
	(28,7,7),
	(28,8,11),
	(28,9,8),
	(28,10,3),
	(28,11,10),
	(28,12,6),
	-- Nelson
	(29,1,5),
	(29,2,2),
	(29,3,3),
	(29,4,1),
	(29,5,7),
	(29,6,6),
	(29,7,9),
	(29,8,4),
	(29,9,10),
	(29,10,11),
	(29,11,8),
	(29,12,12)
;