package main

import (
	"encoding/json"
	"log"
	"net/http"
	"whos_watching/controllers"
	"whos_watching/db"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {

	var welcome = map[string]string{"message": "welcome to the who's watching api!"}
	err := json.NewEncoder(w).Encode(welcome)
	if err != nil {
		log.Printf("error encoding json")
	}
}

func main() {
	log.Printf("setting up db...")
	db := &db.Database{}
	mysql := db.GetDb()

	prefCtrlr := controllers.NewUserPrefsController(mysql)
	userCtrlr := controllers.NewUserController(mysql)
	mediaCtrlr := controllers.NewMediaController(mysql)
	nowPlayingCtrlr := controllers.NewNowPlayingController(mysql)

	router := mux.NewRouter()

	router.HandleFunc("/", IndexHandler).Methods("GET")
	router.HandleFunc("/users", userCtrlr.GetUsersHandler).Methods("GET")
	router.HandleFunc("/users/{id}", userCtrlr.GetUserHandler).Methods("GET")
	router.HandleFunc("/users/{id}/preferences", prefCtrlr.GetUserPrefsHandler).Methods("GET")
	router.HandleFunc("/users/{id}/preferences/{prefId}", prefCtrlr.GetSingleUserPrefHandler).Methods("GET")
	router.HandleFunc("/users/{id}/preferences/{prefId}", prefCtrlr.UpdateUserPrefHandler).Methods("PUT")
	router.HandleFunc("/users/{id}/preferences", prefCtrlr.CreateUserPrefHandler).Methods("POST")
	router.HandleFunc("/media", mediaCtrlr.GetAllMediaHandler).Methods("GET")
	router.HandleFunc("/media/{mediaId}", mediaCtrlr.DeleteMediaByIdHandler).Methods("DELETE")
	router.HandleFunc("/now-playing", nowPlayingCtrlr.CreateNowPlayingHandler).Methods("POST")
	router.HandleFunc("/now-playing", nowPlayingCtrlr.GetLatestNowPlayingHandler).Methods("GET")
	router.HandleFunc("/now-playing/all-preferences", nowPlayingCtrlr.GetPreferencesToUpdateNowPlayingHandler).Methods("GET")

	//cors optionsGoes Below
	corsOpts := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, //you service is available and allowed for this base url
		AllowedMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
			http.MethodHead,
		},
		AllowedHeaders: []string{"*"},
	})

	log.Print("starting server on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsOpts.Handler(router)))
}
