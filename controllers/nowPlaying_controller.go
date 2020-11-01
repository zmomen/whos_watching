package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	models "whos_watching/models"
	services "whos_watching/services"
)

type NowPlayingController struct {
	nps *services.NowPlayingService
	db  *sql.DB
}

func NewNowPlayingController(db *sql.DB) *NowPlayingController {
	return &NowPlayingController{
		nps: services.NewNowPlayingService(db),
		db:  db,
	}
}

func (c *NowPlayingController) CreateNowPlayingHandler(w http.ResponseWriter, r *http.Request) {
	var request models.NowPlayingModelRequest
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&request); err != nil {
		RespondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()

	response := c.nps.AddNowPlaying(request)

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusCreated)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func (c *NowPlayingController) GetLatestNowPlayingHandler(w http.ResponseWriter, r *http.Request) {
	response := c.nps.GetLatestNowPlaying()

	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func (c *NowPlayingController) GetPreferencesToUpdateNowPlayingHandler(w http.ResponseWriter, r *http.Request) {
	response := c.nps.GetPreferencesToUpdateNowPlaying()

	log.Println(r.Method, r.URL.String())
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}