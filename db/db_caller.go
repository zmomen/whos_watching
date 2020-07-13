package db

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

// Credentials is
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     string `json:"port"`
	Database string `json:"database"`
}

type Database struct{}

func (d *Database) GetDb() *sql.DB {
	config := d.getConfig()
	return d.setupDb(config)
}

func (d *Database) getConfig() Credentials {
	var err error
	// Open our jsonFile
	jsonFile, err := os.Open("db/config.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		log.Fatalln("file open error", err)
	}
	log.Println("Successfully Read config file")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	// read our opened jsonFile as a byte array.
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var dbCreds Credentials
	err = json.Unmarshal(byteValue, &dbCreds)
	if err != nil {
		log.Fatalln("json err", err)
	}
	return dbCreds
}

func (d *Database) setupDb(dbCreds Credentials) *sql.DB {

	db, err := sql.Open("mysql", dbCreds.Username+":"+dbCreds.Password+"@tcp("+dbCreds.Host+":"+dbCreds.Port+")/"+dbCreds.Database)
	// if there is an error opening the connection, handle it
	if err != nil {
		log.Fatalln("db conn err", err.Error())
		return nil
	}

	log.Println("Connection Successful!")

	return db
}
