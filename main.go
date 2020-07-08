package main

import (
	"encoding/json"
	"log"
	"net/http"
	"whos_watching/db"
	"whos_watching/service"
)

func main() {
	log.Printf("setting up db...")
	db := &db.Database{}
	mysql := db.GetDb()

	prefHandler := func(w http.ResponseWriter, r *http.Request) {
		ups := service.NewUserPrefsService(mysql)

		response := ups.GetUserPrefs("Zaid")

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		err := json.NewEncoder(w).Encode(response)
		if err != nil {
			log.Printf("error encoding json")
		}
	}

	log.Print("starting server...")
	http.HandleFunc("/users/watching", prefHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
