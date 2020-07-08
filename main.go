package main

import (
	"fmt"
	"log"
	"net/http"
	"whos_watching/controllers"
	"whos_watching/db"

	"github.com/julienschmidt/httprouter"
)

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Welcome!\n")
}

func main() {
	log.Printf("setting up db...")
	db := &db.Database{}
	mysql := db.GetDb()

	prefCtrlr := controllers.NewUserPrefsController(mysql)
	router := httprouter.New()

	router.GET("/", Index)
	router.GET("/users/:name/watching", prefCtrlr.GetUserPrefsHandler)

	log.Print("starting server...")
	log.Fatal(http.ListenAndServe(":8080", router))
}
