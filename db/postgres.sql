/*
Load the file from the file directory:
psql newDB < db_test
*/
DROP DATABASE db_test;

CREATE DATABASE db_test

CREATE TABLE roominfo (
  id INTEGER,
  name VARCHAR (255),
  city VARCHAR (255),
  type VARCHAR (255),
  title VARCHAR (600),
  max_guest INTEGER,
  subtype INTEGER,
  beds INTEGER,
  baths INTEGER,
  host_username VARCHAR (600),
  avatar VARCHAR (600),
  short_description VARCHAR (2000),
  main_description VARCHAR (2000),
  house_rules_description VARCHAR (2000),
  highlights VARCHAR (2000),
  house_rules VARCHAR (2000),
  cancellations VARCHAR (2000),
  sleeping_arrangements VARCHAR (2000)
);

CREATE TABLE amenities (
  id INTEGER,
  room_id  INTEGER,
  amenitytype VARCHAR (255),
  name VARCHAR (255),
  icon VARCHAR (800),
  explanation VARCHAR(255)
);
