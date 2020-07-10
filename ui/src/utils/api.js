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
