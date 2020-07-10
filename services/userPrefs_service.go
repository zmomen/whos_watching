package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectUserPrefs = "SELECT up.id, m.title, m.media_type, m.genre, up.status " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.id = ?"
	InsertUserPref = "INSERT INTO user_prefs (user_id, media_id, status) " +
		"VALUES (?, ?, ?) "

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
		res, err := u.database.Exec(InsertUserPref, userId, newMediaId, NewStatus)
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
		err = res.Scan(&pref.PrefID, &pref.Title, &pref.MediaType, &pref.Genre, &pref.Status)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		prefArry = append(prefArry, pref)
	}
	return prefArry
}
