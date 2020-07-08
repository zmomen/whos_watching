package service

import (
	"database/sql"
	"log"
)

const (
	SelectUserPrefs = "SELECT u.name, m.title, m.media_type, up.status " +
		"from users u " +
		"inner join user_prefs up on u.id = up.user_id " +
		"inner join media m on m.id = up.media_id where u.name = ?"
)

type UserPrefsService struct {
	database *sql.DB
}

func NewUserPrefsService(db *sql.DB) *UserPrefsService {
	return &UserPrefsService{database: db}
}

func (u *UserPrefsService) GetUserPrefs(userId string) []UserPrefsModel {

	res, err := u.database.Query(SelectUserPrefs, userId)

	if err != nil {
		log.Panic(err.Error())
	}

	var pref UserPrefsModel
	var prefArry []UserPrefsModel

	for res.Next() {
		err = res.Scan(&pref.Name, &pref.Title, &pref.MediaType, &pref.Status)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		prefArry = append(prefArry, pref)
	}
	return prefArry
}
