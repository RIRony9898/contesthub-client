import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});

let interceptorId = null;


export const setUserInterceptor = (userOrToken) => {
  // Eject old interceptor if it exists
  if (interceptorId !== null) {
    axiosInstance.interceptors.request.eject(interceptorId);
    interceptorId = null;
  }

  // Add new interceptor
  interceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      if (!userOrToken) {
        delete config.headers["authorization"];
        return config;
      }

      
      if (typeof userOrToken === "string") {
        config.headers["authorization"] = userOrToken;
        return config;
      }

      
      if (typeof userOrToken === "object" && userOrToken.token) {
        config.headers["authorization"] = userOrToken.token;
        return config;
      }

    
      config.headers["authorization"] = JSON.stringify(userOrToken);
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
