import { axios } from "./base";
import { BrotherType } from "./types";

const brotherList = async () => {
  try {
    const response = await axios.get(`/brothers`);

    return response.data as BrotherType[];
  } catch (e) {
    return null;
  }
};

const brotherDetail = async (id: string) => {
  try {
    const response = await axios.get(`/brothers/${id}`);

    return response.data as BrotherType;
  } catch (e) {
    return null;
  }
};

export { brotherList, brotherDetail };
