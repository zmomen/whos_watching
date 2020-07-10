package service

type UserPrefsModel struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Genre     string `json:"genre"`
	Status    string `json:"status"`
}

type User struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	ProfileUrl string `json:"profileUrl"`
}
