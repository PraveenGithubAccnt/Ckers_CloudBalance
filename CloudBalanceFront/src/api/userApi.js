import axiosInstance from "./axiosInstance";

// CREATE user
export const createUser = (userData) => {
  return axiosInstance.post("/users", userData);
};

// UPDATE user
export const updateUser = (id, userData) => {
  return axiosInstance.put(`/users/${id}`, userData);
};

// GET all users
export const getAllUsers = () => {
  return axiosInstance.get("/users");
};

// DELETE user
export const deleteUser = (id) => {
  return axiosInstance.delete(`/users/${id}`);
};
