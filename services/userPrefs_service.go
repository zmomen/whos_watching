package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectUserPrefs = "SELECT up.id, m.title, m.media_type, m.genre, up.status, up.notes " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.id = ?"

	SelectUserPreference = "SELECT up.id, m.title, m.media_type, m.genre, up.status, up.notes " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.id = ? and up.id = ?"

	InsertUserPref = "INSERT INTO user_prefs (user_id, media_id, status, notes) " +
		"VALUES (?, ?, ?, ?) "

	NewStatus = "Active"
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

func (u *UserPrefsService) AddUserPref(userId string, medium models.MediaModel) *models.UserPrefsModel {
	var model *models.UserPrefsModel

	log.Println("Adding new media...", medium.MediaType, medium)
	newMediaId := u.ms.AddMedia(medium)

	if newMediaId != -1 {
		log.Println("Adding user pref...")
		res, err := u.database.Exec(InsertUserPref, userId, newMediaId, NewStatus, medium.Notes)
		if err != nil {
			log.Panic(err.Error())
			return model
		}
		newPrefId, _ := res.LastInsertId()
		model = &models.UserPrefsModel{
			PrefID:    newPrefId,
			Title:     medium.Title,
			MediaType: medium.MediaType,
			Genre:     medium.Genre,
			Notes:     medium.Notes,
			Status:    "Active",
		}
		log.Println("User pref added!")
	} else {
		log.Panicln("Error! Failed to Add user pref...")
	}

	return model
}

func (u *UserPrefsService) GetUserPrefs(userId string) []models.UserPrefsModel {

	res, err := u.database.Query(SelectUserPrefs, userId)

	if err != nil {
		log.Panic(err.Error())
	}

	var pref models.UserPrefsModel
	var prefArry = make([]models.UserPrefsModel, 0)

	for res.Next() {
		err = res.Scan(&pref.PrefID, &pref.Title, &pref.MediaType, &pref.Genre, &pref.Status, &pref.Notes)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		prefArry = append(prefArry, pref)
	}
	return prefArry
}

func (u *UserPrefsService) GetUserPreference(userId string, prefId string) models.UserPrefsModel {

	res, err := u.database.Query(SelectUserPreference, userId, prefId)

	if err != nil {
		log.Panic(err.Error())
	}

	var pref models.UserPrefsModel

	for res.Next() {
		err = res.Scan(&pref.PrefID, &pref.Title, &pref.MediaType, &pref.Genre, &pref.Status, &pref.Notes)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
	}
	return pref
}
