-- Drop the tables
DROP TABLE IF EXISTS "person_contest";
DROP TABLE IF EXISTS "person";
DROP TABLE IF EXISTS "contest";
DROP TABLE IF EXISTS "event";
DROP TABLE IF EXISTS "couple";
DROP TABLE IF EXISTS "score";


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


CREATE TABLE "couple" (
	"id" SERIAL PRIMARY KEY,
	"contest_id" INTEGER REFERENCES "contest",
	"lead_id" INTEGER REFERENCES "person",
	"follow_id" INTEGER REFERENCES "person",
);

CREATE TABLE "score" (
	"id" SERIAL PRIMARY KEY,
	"judge_id" INTEGER REFERENCES "person",
	"couple_id" INTEGER REFERENCES "couple",
	"placement" INTEGER
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
	('Hugh', 'a'),
	('Judgy McJudgerson', 'a')
;

INSERT INTO "person_contest" ("contest_id", "person_id", "role")
VALUES
	(1, 1, 'lead'),
	(1, 2, 'lead'),
	(1, 3, 'lead'),
	(1, 4, 'follow'),
	(1, 5, 'follow'),
	(1, 6, 'follow'),
	(1, 7, 'judge')
;

INSERT INTO "couple" ("contest_id", "lead_id", "follow_id")
VALUES
	(1,1,2),
	(1,3,4),
	(1,5,6)
;

INSERT INTO "score" ("judge_id", "couple_id", "placement")
VALUES
	(7,1,1),
	(7,2,2),
	(7,3,3)
;



-- SELECT TRIALS
SELECT 
	"person"."id",
	"person"."username",
	"person"."img_path"
FROM "person"
JOIN "person_contest" ON "person"."id" = "person_contest"."person_id"
JOIN "contest" ON "person_contest"."contest_id" = "contest"."id"
WHERE "contest"."id" = 1 AND "person_contest"."role" = 'judge';

SELECT
	"contest"."id",
	"contest"."name",
	json_agg((SELECT x FROM (
	SELECT
		"person"."id",
		"person"."username",
		"person"."img_path"
		WHERE "person_contest"."role" = 'lead' AND "contest"."id" = 1
	) AS x)) AS "leads",
	json_agg((SELECT x FROM (
	SELECT
		"person"."id",
		"person"."username",
		"person"."img_path"
		WHERE "person_contest"."role" = 'follow' AND "contest"."id" = 1
	) AS x)) AS "follows",
	json_agg((SELECT x FROM (
	SELECT
		"person"."id",
		"person"."username",
		"person"."img_path"
		WHERE "person_contest"."role" = 'judge'

	) AS x)) AS "judges"
FROM "person"
LEFT JOIN "person_contest" ON "person"."id" = "person_contest"."person_id"
LEFT JOIN "contest" ON "person_contest"."contest_id" = "contest"."id"
WHERE "contest"."id" = 1
GROUP BY "contest"."id";

SELECT
	"event".*,
	json_agg((SELECT x FROM (
	SELECT
		"contest"."id",
		"contest"."name",
		"event"."name" AS "event_name"
	) AS x)) AS "contests"
FROM "event"
LEFT JOIN "contest" ON "event"."id" = "contest"."event_id"
GROUP BY "event"."id";
