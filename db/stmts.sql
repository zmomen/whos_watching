DROP DATABASE IF EXISTS whos_watching; 

CREATE DATABASE whos_watching;
USE whos_watching;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name TEXT, 
    PRIMARY KEY(id));

 CREATE TABLE media ( 
    id INTEGER NOT NULL AUTO_INCREMENT, 
    title TEXT, 
    media_type TEXT, 
    release_date DATE,  
    PRIMARY KEY (id)); 

CREATE TABLE user_prefs (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    user_id INTEGER,
    media_id INTEGER, 
    status TEXT,
    PRIMARY KEY(id),
    CONSTRAINT fk_media FOREIGN KEY (media_id) REFERENCES media(id), 
    CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id));
