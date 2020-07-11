package service

type UserPrefsModel struct {
	PrefID    int64  `json:"id"`
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Genre     string `json:"genre"`
	Status    string `json:"status"`
	Notes     string `json:"notes"`
}

type UserModel struct {
	ID         int    `json:"id,omitempty"`
	Name       string `json:"name,omitempty"`
	ProfileUrl string `json:"profileUrl,omitempty"`
}

type MediaModel struct {
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Genre     string `json:"genre"`
	MediaUrl  string `json:"mediaUrl"`
	Notes     string `json:"notes"`
}
