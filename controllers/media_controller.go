package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	services "whos_watching/services"

	"github.com/gorilla/mux"
)

type MediaController struct {
	ms *services.MediaService
	db *sql.DB
}

func NewMediaController(db *sql.DB) *MediaController {
	return &MediaController{
		ms: services.NewMediaService(db),
		db: db,
	}
}

func (c *MediaController) GetAllMediaHandler(w http.ResponseWriter, r *http.Request) {
	response := c.ms.GetAllMedia()

	log.Println(r.Method, r.URL.String())
	err := json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func (c *MediaController) DeleteMediaByIdHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	c.ms.DeleteMedia(vars["mediaId"])
	log.Println(r.Method, r.URL.String())
	w.WriteHeader(http.StatusNoContent)
}
