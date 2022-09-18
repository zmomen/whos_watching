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
	MediaID   int64  `json:"mediaId"`
	Status    string `json:"status"`
	Notes     string `json:"notes"`
	Priority  string `json:"priority"`
	Title     string `json:"title"`
	MediaType string `json:"mediaType"`
	Genre     string `json:"genre"`
	MediaUrl  string `json:"mediaUrl"`
	Platform  string `json:"platform"`
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
	Visible   bool   `json:"visible"`
	Platform  string `json:"platform"`
}

type NowPlayingModelRequest struct {
	PrefID int64 `json:"userPrefId,omitempty"`
}

type NowPlayingModel struct {
	PrefID int64  `json:"userPrefId,omitempty"`
	Title  string `json:"title"`
	Name   string `json:"name,omitempty"`
}

type LatestReviews struct {
	Title     string `json:"title"`
	MediaType string `json:"mediaType"`
	Genre     string `json:"genre"`
	Platform  string `json:"platform"`
	Priority  string `json:"priority"`
	Notes     string `json:"notes"`
}
