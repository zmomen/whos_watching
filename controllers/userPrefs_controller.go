package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"whos_watching/service"

	"github.com/julienschmidt/httprouter"
)

type UserPrefsController struct {
	db *sql.DB
}

func NewUserPrefsController(db *sql.DB) *UserPrefsController {
	return &UserPrefsController{
		db: db,
	}
}

func (c *UserPrefsController) GetUserPrefsHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ups := service.NewUserPrefsService(c.db)

	response := ups.GetUserPrefs(ps.ByName("name"))

	w.Header().Set("Content-Type", "application/json")
	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}
