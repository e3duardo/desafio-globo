import { auth } from "./auth";
import { axios } from "./base";

const closeSurvey = async (id: number | string) => {
  try {
    const response = await axios.delete(`/surveys/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    });

    console.log(response.status);
    return response.status === 204;
  } catch (e) {
    return false;
  }
};

export { closeSurvey };
