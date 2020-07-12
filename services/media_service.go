package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	InsertMedia = "INSERT INTO media (title, media_type, genre, media_url) VALUES " +
		"(?, ?, ?, ?) "

	SelectMedia    = "SELECT title, media_type, genre, COALESCE(media_url, '') as media_url FROM media ORDER BY RAND() "
	UpdateMediaQry = "UPDATE media SET title = ?, media_type = ?, genre = ?, media_url = ? WHERE id = ? "
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
		err = res.Scan(&media.Title, &media.MediaType, &media.Genre, &media.MediaUrl)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		mediaArry = append(mediaArry, media)
	}
	return mediaArry
}

func (m *MediaService) AddMedia(medium models.MediaModel) int64 {
	res, err := m.database.Exec(InsertMedia, medium.Title, medium.MediaType, medium.Genre, medium.MediaUrl)
	if err != nil {
		log.Panic(err.Error())
		return -1
	}
	log.Println("media added!")
	newId, _ := res.LastInsertId()
	return newId
}

func (m *MediaService) UpdateMedia(request models.UserPrefsModelRequest, mediaId string) int64 {
	res, err := m.database.Exec(UpdateMediaQry, request.Title, request.MediaType, request.Genre, request.MediaUrl, mediaId)
	if err != nil {
		log.Panic(err.Error())
		return -1
	}
	log.Println("media updated!")
	rowsAffected, _ := res.RowsAffected()
	return rowsAffected
}
