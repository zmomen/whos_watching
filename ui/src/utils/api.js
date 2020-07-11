import axios from "axios";

var config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

var instance = axios.create({
  baseURL: "http://" + process.env.REACT_APP_IPP + ":8080",
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

export function updateUserPref(id, row) {
  console.warn("update1!")
  return;
  // return instance.post(`/users/${id}/preferences`, row, config);
}

export function getAllMedia() {
  return instance.get(`/media`, config);
}
