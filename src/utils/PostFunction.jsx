import axiosInstance from "./api/axios";

export const PostFunction = async (url, data, method = "post") => {
  try {
    const newData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        newData.append(key, value[0]);
        return;
      }
      newData.append(key, value);
    });
    const response = await axiosInstance[method](url, newData);
    if (!response.ok) {
      throw new Error(`Failed to ${method} data`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error ${method}ing data:`, error);
    throw error;
  }
};
