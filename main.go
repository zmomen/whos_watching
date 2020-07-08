package main

import (
	"log"
	"net/http"
)

func main() {
	h1 := func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "hello world"}`))
	}
	h2 := func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`something else`))
	}

	log.Print("starting server...")
	http.HandleFunc("/", h1)
	http.HandleFunc("/endpoint", h2)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
