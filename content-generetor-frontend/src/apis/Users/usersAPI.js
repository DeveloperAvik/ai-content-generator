import axios from "axios";

export const registerAPI = async (userData) => {
  const response = await axios.post(
    "",
    {
      email: userData?.email,
      password: userData?.password,
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};


export default registerAPI;