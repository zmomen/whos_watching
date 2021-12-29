package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectUserPrefs = "SELECT up.id, m.title, m.id as media_id, m.media_type, m.genre, " +
		"COALESCE(m.platform, '') as platform, " +
		"up.status, up.notes, m.media_url, up.priority " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.id = ?"

	SelectUserPreference = "SELECT up.id, up.user_id, up.media_id, up.status, up.notes " +
		"from user_prefs up " +
		"inner join users u on up.user_id = u.id " +
		"where up.user_id = ? and up.id = ? "

	InsertUserPref = "INSERT INTO user_prefs (user_id, media_id, status, notes, priority) " +
		"VALUES (?, ?, ?, ?, ?) "

	UpdateUserPref  = "UPDATE user_prefs SET status = ?, notes = ?, priority = ?, user_id = ? where id = ? "
	DefaultStatus   = "active"
	DefaultPriority = "low"
)

type UserPrefsService struct {
	ms       *MediaService
	database *sql.DB
}

func NewUserPrefsService(db *sql.DB) *UserPrefsService {
	return &UserPrefsService{
		ms:       NewMediaService(db),
		database: db,
	}
}

func (u *UserPrefsService) AddUserPref(userId string, request models.UserPrefsModelRequest) models.UserPrefsModelRequest {
	var resp models.UserPrefsModelRequest
	log.Println("Adding new media...")
	newMediaId := u.ms.AddMedia(request)

	if newMediaId != -1 {
		log.Println("Adding user pref...")
		res, err := u.database.Exec(InsertUserPref, userId, newMediaId, DefaultStatus, request.Notes, DefaultPriority)
		if err != nil {
			log.Panic(err.Error())
			return models.UserPrefsModelRequest{}
		}
		newPrefId, _ := res.LastInsertId()
		resp = models.UserPrefsModelRequest{
			PrefID:    newPrefId,
			Status:    DefaultStatus,
			Notes:     request.Notes,
			Priority:  DefaultPriority,
			Title:     request.Title,
			MediaType: request.MediaType,
			Genre:     request.Genre,
			MediaUrl:  request.MediaUrl,
			Platform:  request.Platform,
		}
		log.Println("User pref added!")
	} else {
		log.Panicln("Error! Failed to Add user pref...")
	}

	return resp
}

func (u *UserPrefsService) GetUserPrefs(userId string) []models.UserPrefsModelRequest {

	res, err := u.database.Query(SelectUserPrefs, userId)

	if err != nil {
		log.Panic(err.Error())
	}

	var pref models.UserPrefsModelRequest
	var prefArry = make([]models.UserPrefsModelRequest, 0)

	for res.Next() {
		err = res.Scan(&pref.PrefID, &pref.Title, &pref.MediaID, &pref.MediaType, &pref.Genre,
			&pref.Platform, &pref.Status, &pref.Notes,
			&pref.MediaUrl, &pref.Priority)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		prefArry = append(prefArry, pref)
	}
	return prefArry
}

func (u *UserPrefsService) GetSingleUserPreference(userId string, prefId string) models.UserPrefsModel {
	res, err := u.database.Query(SelectUserPreference, userId, prefId)

	if err != nil {
		log.Panic(err.Error())
	}
	var pref models.UserPrefsModel

	for res.Next() {
		err = res.Scan(&pref.PrefID, &pref.UserID, &pref.MediaID, &pref.Status, &pref.Notes)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
	}
	return pref
}

func (u *UserPrefsService) UpdateUserPreference(userId string, prefId string, request models.UserPrefsModelRequest) models.UserPrefsModelRequest {
	log.Println("Updating user prefs...")
	_, err := u.database.Exec(UpdateUserPref, request.Status, request.Notes, request.Priority, request.UserID, prefId)
	if err != nil {
		log.Panic(err.Error())
	}
	updatedPref := u.GetSingleUserPreference(userId, prefId)

	log.Println("Updating media...")
	res := u.ms.UpdateMedia(request, updatedPref.MediaID)
	if res != -1 {
		log.Println("user preference updated.")
	} else {
		log.Panicln("Error! Failed to update user pref...")
	}
	return request
}
