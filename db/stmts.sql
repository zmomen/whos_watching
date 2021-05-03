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

ALTER TABLE
  whos_watching.media
ADD
  COLUMN visible BOOLEAN;

ALTER TABLE
  whos_watching.media
ADD
  COLUMN platform TEXT;

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

ALTER TABLE
  whos_watching.user_prefs
ADD
  COLUMN priority text comment '';


CREATE TABLE now_playing (
  id INTEGER NOT NULL AUTO_INCREMENT,
  user_pref_id INTEGER, 
  date_added datetime,
  PRIMARY KEY(id),
  CONSTRAINT fk_user_pref FOREIGN KEY (user_pref_id) REFERENCES user_prefs(id)
);