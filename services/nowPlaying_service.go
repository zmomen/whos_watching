package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectNowPlaying = "SELECT up.id, u.name, m.title FROM user_prefs up " +
		"INNER JOIN now_playing np ON up.id = np.user_pref_id " +
		"INNER JOIN media m ON up.media_id = m.id " +
		"INNER JOIN users u ON up.user_id = u.id " +
		"ORDER BY np.date_added DESC LIMIT 1 "

	SelectToUpdateNowPlaying = "SELECT up.id, m.title, u.name " +
		"FROM user_prefs up INNER JOIN media m ON up.media_id = m.id " +
		"INNER JOIN users u ON up.user_id = u.id " + 
		"WHERE up.status = 'active' "

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
		err = res.Scan(&nowPlaying.PrefID, &nowPlaying.Name, &nowPlaying.Title)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
			return models.NowPlayingModel{}
		}
	}
	return nowPlaying
}

func (n *NowPlayingService) GetPreferencesToUpdateNowPlaying() []models.NowPlayingModel {
	res, err := n.database.Query(SelectToUpdateNowPlaying)

	if err != nil {
		log.Panic(err.Error())
	}

	var nowPlaying models.NowPlayingModel
	var nowPlayingArry = make([]models.NowPlayingModel, 0)

	for res.Next() {
		err = res.Scan(&nowPlaying.PrefID, &nowPlaying.Name, &nowPlaying.Title)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		nowPlayingArry = append(nowPlayingArry, nowPlaying)
	}
	return nowPlayingArry
}
