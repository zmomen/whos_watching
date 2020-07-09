package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	services "whos_watching/services"
)

type UserPrefsController struct {
	db *sql.DB
}

func NewUserPrefsController(db *sql.DB) *UserPrefsController {
	return &UserPrefsController{
		db: db,
	}
}

func (c *UserPrefsController) GetUserPrefsHandler(w http.ResponseWriter, r *http.Request) {
	ups := services.NewUserPrefsService(c.db)

	response := ups.GetUserPrefs("test")

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}
