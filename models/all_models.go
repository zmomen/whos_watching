package service

type UserPrefsModel struct {
	PrefID  int64  `json:"id,omitempty"`
	UserID  int64  `json:"userId,omitempty"`
	MediaID string `json:"mediaId,omitempty"`
	Status  string `json:"status,omitempty"`
	Notes   string `json:"notes,omitempty"`
}

type UserPrefsModelRequest struct {
	PrefID    int64  `json:"id"`
	UserID    int64  `json:"userId"`
	Status    string `json:"status"`
	Notes     string `json:"notes"`
	Priority  string `json:"priority"`
	Title     string `json:"title"`
	MediaType string `json:"media"`
	Genre     string `json:"genre"`
	MediaUrl  string `json:"mediaUrl"`
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
}
