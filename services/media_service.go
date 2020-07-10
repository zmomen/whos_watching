package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	InsertMedia = "INSERT INTO media (title, media_type, genre) VALUES " +
		"(?, ?, ?) "

	SelectMedia = "SELECT title, media_type, genre FROM media "
)

type MediaService struct {
	database *sql.DB
}

func NewMediaService(db *sql.DB) *MediaService {
	return &MediaService{database: db}
}

func (m *MediaService) GetAllMedia() []models.MediaModel {
	res, err := m.database.Query(SelectMedia)

	if err != nil {
		log.Panic(err.Error())
	}

	var media models.MediaModel
	var mediaArry = make([]models.MediaModel, 0)

	for res.Next() {
		err = res.Scan(&media.Title, &media.MediaType, &media.Genre)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		mediaArry = append(mediaArry, media)
	}
	return mediaArry
}

func (m *MediaService) AddMedia(medium models.MediaModel) int64 {
	res, err := m.database.Exec(InsertMedia, medium.Title, medium.MediaType, medium.Genre)
	if err != nil {
		log.Panic(err.Error())
		return -1
	}
	log.Println("media added!")
	newId, _ := res.LastInsertId()
	return newId
}
