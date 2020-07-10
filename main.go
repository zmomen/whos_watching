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
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Content-Type, X-Auth-Token")
	// if r.Method == http.MethodOptions {
	// return
	// }

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

	router := mux.NewRouter()

	router.HandleFunc("/", IndexHandler).Methods("GET")
	router.HandleFunc("/users", userCtrlr.GetUsersHandler).Methods("GET")
	router.HandleFunc("/users/{id}", userCtrlr.GetUserHandler).Methods("GET")
	router.HandleFunc("/users/{id}/preferences", prefCtrlr.GetUserPrefsHandler).Methods("GET")
	router.HandleFunc("/users/{id}/preferences", prefCtrlr.CreateUserPrefHandler).Methods("POST")
	router.HandleFunc("/media", mediaCtrlr.GetAllMediaHandler).Methods("GET")

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

	log.Print("starting server...")
	log.Fatal(http.ListenAndServe(":8080", corsOpts.Handler(router)))
}
