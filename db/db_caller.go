package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct{}

func (d *Database) GetDb() *sql.DB {
	var dbUser = os.Getenv("mysql_username")
	var dbPass = os.Getenv("mysql_password")
	var dbHost = "mysql"
	var dbPort = "3306"
	var dbName = "whos_watching"
	var connection = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)

	db, err := sql.Open("mysql", connection)
	// if there is an error opening the connection, handle it
	if err != nil {
		log.Fatalln("db conn err", err.Error())
		return nil
	}

	log.Println("Connection Successful!")

	return db
}
