import Axios from "axios";

const getAPIClient = () => {
  const api = Axios.create({
    baseURL: "http://localhost:3333",
  });

  api.defaults.validateStatus = () => {
    return true;
  };

  return api;
};

export default getAPIClient;
