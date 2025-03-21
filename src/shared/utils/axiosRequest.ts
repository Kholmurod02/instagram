import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.capital-t.tj/", 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
  const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
   return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
  return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};
export const saveToken = (token) => {
  localStorage.setItem("token", token);
  setAuthToken(token);
};

export default axiosInstance;
