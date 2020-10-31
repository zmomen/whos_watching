package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectNowPlaying = "SELECT u.name, m.title FROM user_prefs up " +
		"INNER JOIN now_playing np ON up.id = np.user_pref_id " +
		"INNER JOIN media m ON up.media_id = m.id " +
		"INNER JOIN users u ON up.user_id = u.id " +
		"ORDER BY np.date_added DESC "

	InsertNowPlaying = "INSERT INTO now_playing (user_pref_id, date_added) " +
		"VALUES (?, now()) "
)

type NowPlayingService struct {
	database *sql.DB
}

func NewNowPlayingService(db *sql.DB) *NowPlayingService {
	return &NowPlayingService{
		database: db,
	}
}

func (n *NowPlayingService) AddNowPlaying(request models.NowPlayingModelRequest) int {
	log.Println("Adding entry to now playing...")
	_, err := n.database.Exec(InsertNowPlaying, request.PrefID)
	if err != nil {
		log.Panic(err.Error())
		return 500
	} else {
		log.Println("User pref added!")
		return 201
	}
}

func (n *NowPlayingService) GetLatestNowPlaying() models.NowPlayingModel {
	res, err := n.database.Query(SelectNowPlaying)
	if err != nil {
		log.Panic(err.Error())
		return models.NowPlayingModel{}
	}

	var nowPlaying models.NowPlayingModel

	for res.Next() {
		err = res.Scan(&nowPlaying.Name, &nowPlaying.Title)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
			return models.NowPlayingModel{}
		}
	}
	return nowPlaying
}

// func (n *NowPlayingService) GetSingleUserPreference(userId string, prefId string) models.UserPrefsModel {
// 	res, err := n.database.Query(SelectUserPreference, userId, prefId)

// 	if err != nil {
// 		log.Panic(err.Error())
// 	}
// 	var pref models.UserPrefsModel

// 	for res.Next() {
// 		err = res.Scan(&pref.PrefID, &pref.UserID, &pref.MediaID, &pref.Status, &pref.Notes)
// 		if err != nil {
// 			log.Panic(err.Error()) // proper error handling instead of panic in your app
// 		}
// 	}
// 	return pref
// }
