import axios from "axios";

var config = {
  // headers: { "Access-Control-Allow-Origin": "*" },
};

var instance = axios.create({
  baseURL: "/api"
});

export function getAllUsers() {
  return instance.get(`/users`, config);
}

export function getUserByID(id) {
  return instance.get(`/users/${id}`, config);
}

export function getUserPrefs(id) {
  return instance.get(`/users/${id}/preferences`, config);
}

export function addUserPref(id, row) {
  return instance.post(`/users/${id}/preferences`, row, config);
}

export function updateUserPref(id, row, optionalNewId) {
  const data = { ...row, userId: optionalNewId };
  return instance.put(`/users/${id}/preferences/${row.id}`, data, config);
}

export function getNowPlaying() {
  return instance.get(`/now-playing`, config);
}

export function addNowPlaying(data) {
  return instance.post(`/now-playing`, data, config);
}

export function getPreferencesToUpdateNowPlaying() {
  return instance.get(`/now-playing/all-preferences`, config);
}

export function deleteMediaById(mediaId) {
  return instance.delete(`/media/${mediaId}`, config);
}

export function getLatestReviews() {
  return instance.get(`/latest-reviews`, config);
}
