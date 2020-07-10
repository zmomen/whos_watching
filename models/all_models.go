package service

type UserPrefsModel struct {
	Name      string `json:"name"`
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Status    string `json:"status"`
}

type User struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	ProfileUrl string `json:"profileUrl"`
}
