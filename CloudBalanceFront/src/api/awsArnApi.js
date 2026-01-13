import axiosInstance from "./axiosInstance";

// CREATE AWS ARN
export const createArnAccnt = (accntData) => {
  return axiosInstance.post("/arnaccounts", accntData);
};


// GET all AWS ARN
export const getAllArnAccnt = () => {
  return axiosInstance.get("/arnaccounts");
};


