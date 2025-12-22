import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

let interceptorId = null;

export const setUserInterceptor = (user) => {
  console.log("setAxios= ", user);
  // Eject old interceptor if it exists
  if (interceptorId !== null) {
    axiosInstance.interceptors.request.eject(interceptorId);
  }

  // Add new interceptor
  interceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (user) {
        config.headers["authorization"] = JSON.stringify(user);
      } else {
        delete config.headers["authorization"]; // ❌ remove header if no user
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
