import axiosInstance from "./axiosInstance";

// CREATE user
export const createUser = (userData) => {
  return axiosInstance.post("/users", userData);
};

// UPDATE user
export const updateUser = (email, userData) => {
  return axiosInstance.patch(`/users/${email}`, userData);
};

//GET user by id
export const getUsersById = (id) => {
  return axiosInstance.get(`/users/${id}`);
};

// GET all users
export const getAllUsers = () => {
  return axiosInstance.get("/users");
};

// DELETE user
export const deleteUser = (email) => {
  return axiosInstance.delete(`/users/${email}`);
};
