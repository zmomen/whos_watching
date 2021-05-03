package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	InsertMedia = "INSERT INTO media (title, media_type, genre, media_url, platform, visible) VALUES " +
		"(?, ?, ?, ?, ?, true) "

	SelectMedia = "SELECT title, media_type, genre, " +
		"COALESCE(media_url, '') as media_url, visible, " +
		"COALESCE(platform, '') as platform " +
		"FROM media ORDER BY RAND() "
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
		err = res.Scan(&media.Title, &media.MediaType, &media.Genre, &media.MediaUrl, &media.Visible, &media.Platform)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		mediaArry = append(mediaArry, media)
	}
	return mediaArry
}

func (m *MediaService) AddMedia(request models.UserPrefsModelRequest) int64 {
	res, err := m.database.Exec(InsertMedia, request.Title, request.MediaType, 
		request.Genre, request.MediaUrl, request.Platform)
	if err != nil {
		log.Panic(err.Error())
		return -1
	}
	log.Println("media added!")
	newId, _ := res.LastInsertId()
	return newId
}

func (m *MediaService) UpdateMedia(request models.UserPrefsModelRequest, mediaId string) int64 {
	UpdateQry := m.constructUpdateStmtWithRequestStatus(request.Status)
	res, err := m.database.Exec(UpdateQry, request.Title, request.MediaType, request.Genre, 
		request.MediaUrl, request.Platform, mediaId)
	if err != nil {
		log.Panic(err.Error())
		return -1
	}
	log.Println("media updated!")
	rowsAffected, _ := res.RowsAffected()
	return rowsAffected
}

func (m *MediaService) constructUpdateStmtWithRequestStatus(status string) string {
	var UpdateMediaQry = "UPDATE media SET title = ?, media_type = ?, genre = ?, media_url = ?, platform = ?"
	switch status {
	case "complete":
		UpdateMediaQry += ", visible = false WHERE id = ? "
	case "active":
		UpdateMediaQry += ", visible = true WHERE id = ? "
	default:
		UpdateMediaQry += " WHERE id = ? "
	}
	return UpdateMediaQry
}
