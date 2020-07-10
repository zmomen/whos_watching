-- DROP DATABASE IF EXISTS whos_watching; 

-- CREATE DATABASE whos_watching;
-- USE whos_watching;
-- DROP TABLE IF EXISTS user_prefs;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name TEXT, 
    PRIMARY KEY(id));

ALTER TABLE
  whos_watching.users
ADD
  COLUMN profile_url TEXT;

DROP TABLE IF EXISTS media;
 CREATE TABLE media ( 
    id INTEGER NOT NULL AUTO_INCREMENT, 
    title TEXT, 
    media_type TEXT, 
    genre TEXT,  
    PRIMARY KEY (id)); 

ALTER TABLE
  whos_watching.media
ADD
  COLUMN media_url TEXT;

CREATE TABLE user_prefs (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER,
  media_id INTEGER,
  status TEXT,
  PRIMARY KEY(id),
  CONSTRAINT fk_media FOREIGN KEY (media_id) REFERENCES media(id),
  CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE
  whos_watching.user_prefs
ADD
  COLUMN notes TEXT;


