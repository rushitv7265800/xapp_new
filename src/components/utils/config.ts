// export const baseURL = "http://localhost:3000/"
export const baseURL = "https://xappserver.onrender.com/"
export const projectName = "xapp";

// const getUserData = JSON.parse(localStorage.getItem("user") || "") || "";
// export const userData_ = getUserData;

const storedUser = localStorage.getItem("user");
let getUserData;

try {
  getUserData = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error("Error parsing JSON data:", error);
  getUserData = null; // Fallback value if parsing fails
}

export const userData_ = getUserData;