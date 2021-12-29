package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	models "whos_watching/models"
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

func (c *UserPrefsController) GetSingleUserPrefHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	response := c.ups.GetSingleUserPreference(vars["id"], vars["prefId"])

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
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

func (c *UserPrefsController) CreateUserPrefHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var request models.UserPrefsModelRequest
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&request); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()

	response := c.ups.AddUserPref(vars["id"], request)

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusCreated)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func (c *UserPrefsController) UpdateUserPrefHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	var userPref models.UserPrefsModelRequest
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&userPref); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()

	response := c.ups.UpdateUserPreference(vars["id"], vars["prefId"], userPref)

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func RespondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
