import axios from "axios";

// Set Token In Axios
export function setToken(token: string | null): void {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Set Key In apiInstance
export function SetDevKey(key: string | null): void {
  if (key) {
    axios.defaults.headers.common["key"] = key;
  } else {
    delete axios.defaults.headers.common["key"];
  }
}
