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