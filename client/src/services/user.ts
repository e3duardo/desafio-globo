import { axios } from "./base";
import { UserType } from "./types";
interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
const register = async (data: RegisterProps) => {
  try {
    const body = {
      user: data,
    };
    const response = await axios.post(`/users`, body);

    return response.data as UserType[];
  } catch (e) {
    return null;
  }
};

export { register };
