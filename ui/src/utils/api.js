import axios from "axios";

var config = {
  headers: { "Access-Control-Allow-Origin": "*" },
};

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

var instance = axios.create({
  baseURL: "http://"+ process.env.REACT_APP_IPP +":8080",
});

export function getUserPrefs(name) {
  return instance.get(`/users/${name}/watching`, config);
}

export function getAllUsers() {
  return instance.get(`/users`, config);
}
