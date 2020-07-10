package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	services "whos_watching/services"

	"github.com/gorilla/mux"
)

type UserPrefsController struct {
	ups *services.UserPrefsService
	db  *sql.DB
}

func NewUserPrefsController(db *sql.DB) *UserPrefsController {
	return &UserPrefsController{
		ups: services.NewUserPrefsService(db),
		db:  db,
	}
}

func (c *UserPrefsController) GetUserPrefsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	response := c.ups.GetUserPrefs(vars["id"])

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}
