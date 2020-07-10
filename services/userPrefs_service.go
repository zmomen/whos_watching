package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectUserPrefs = "SELECT u.id, m.title, m.media_type, m.genre, up.status " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.id = ?"
)

type UserPrefsService struct {
	database *sql.DB
}

func NewUserPrefsService(db *sql.DB) *UserPrefsService {
	return &UserPrefsService{database: db}
}

func (u *UserPrefsService) GetUserPrefs(userId string) []models.UserPrefsModel {

	res, err := u.database.Query(SelectUserPrefs, userId)

	if err != nil {
		log.Panic(err.Error())
	}

	var pref models.UserPrefsModel
	var prefArry []models.UserPrefsModel

	for res.Next() {
		err = res.Scan(&pref.ID, &pref.Title, &pref.MediaType, &pref.Genre, &pref.Status)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		prefArry = append(prefArry, pref)
	}
	return prefArry
}
