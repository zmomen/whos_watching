package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	services "whos_watching/services"
)

type UserController struct {
	db *sql.DB
}

func NewUserController(db *sql.DB) *UserController {
	return &UserController{
		db: db,
	}
}

func (c *UserController) GetUsersHandler(w http.ResponseWriter, r *http.Request) {

	us := services.NewUserService(c.db)
	response := us.GetUsers()

	log.Println(r.Method, r.URL.String())
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}
