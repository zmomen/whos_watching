package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	services "whos_watching/services"

	"github.com/gorilla/mux"
)

type UserController struct {
	us *services.UserService
	db *sql.DB
}

func NewUserController(db *sql.DB) *UserController {
	return &UserController{
		us: services.NewUserService(db),
		db: db,
	}
}

func (c *UserController) GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	response := c.us.GetUsers()

	log.Println(r.Method, r.URL.String())
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func (c *UserController) GetUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	response := c.us.GetUserById(vars["id"])

	log.Println(r.Method, r.URL.String())
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}
