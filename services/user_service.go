package service

import (
	"database/sql"
	"log"
	models "whos_watching/models"
)

const (
	SelectUsers    = "SELECT id, name, profile_url from users "
	SelectUserById = "SELECT id, name, profile_url from users where id = ?"
)

type UserService struct {
	database *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
	return &UserService{database: db}
}

func (u *UserService) GetUsers() []models.User {

	res, err := u.database.Query(SelectUsers)

	if err != nil {
		log.Panic(err.Error())
	}

	var user models.User
	var userArray []models.User

	for res.Next() {
		err = res.Scan(&user.ID, &user.Name, &user.ProfileUrl)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
		userArray = append(userArray, user)
	}
	return userArray
}

func (u *UserService) GetUserById(userId string) models.User {

	res, err := u.database.Query(SelectUserById, userId)

	if err != nil {
		log.Panicln("db error!", err.Error())
	}

	var user models.User

	for res.Next() {
		err = res.Scan(&user.ID, &user.Name, &user.ProfileUrl)
		if err != nil {
			log.Panic(err.Error()) // proper error handling instead of panic in your app
		}
	}
	return user
}
