package service

type UserPrefsModel struct {
	Name      string `json:"name"`
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Status    string `json:"status"`
}

type User struct {
	Name string `json:"name"`
}
