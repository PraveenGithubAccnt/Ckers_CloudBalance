import axiosInstance from "./axiosInstance";

//Get grouped monthly cost data

export const getCostExplorerGroup = (
  groupByColumn,
  startMonth,
  endMonth,
  filters = {}
) => {
  return axiosInstance.post(
    "/costexplorer/getcostdata",
    filters, 
    {
      params: {
        groupByColumn,
        startMonth,
        endMonth,
      },
    }
  );
};

//get the distinct value for each column;
export const getFilterOption =() => {
  return axiosInstance.get("/costexplorer/filteroptions");
};

