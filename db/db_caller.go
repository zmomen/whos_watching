package db

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	// _ "github.com/go-sql-driver/mysql"
)

// Credentials is
type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     string `json:"port"`
	Database string `json:"database"`
}

// Database is
type Database struct{}

//SetupDb is
func (d *Database) SetupDb() {
	// Open our jsonFile
	jsonFile, err := os.Open("config.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	// read our opened jsonFile as a byte array.
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var dbCreds Credentials
	json.Unmarshal(byteValue, &dbCreds)
	db, err := sql.Open("mysql", dbCreds.Username+":"+dbCreds.Password+"@tcp("+dbCreds.Host+":"+dbCreds.Port+")/"+dbCreds.Database)
	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}

	// defer the close till after the main function has finished
	// executing
	defer db.Close()
}
