import { axios } from './base';
import { AuthType, UserType } from './types';

export interface LoginData { email: string; password: string; }
export type LoginCallback = (user: UserType | null, error: string) => void;


const auth = {
  isAuthenticated: false,
  signin: async (loginData: LoginData, callback: LoginCallback) => {
    try {
      const response = await axios.post(`/auth/login`, loginData)

      const authResponse: AuthType = response.data;
      auth.isAuthenticated = true;

      callback(authResponse.user, '');

      localStorage.setItem('user', JSON.stringify(authResponse.user));
      localStorage.setItem('token', authResponse.token);
    } catch (e: any) {
      callback(null, e?.response?.data?.error);
    }
  },
  signout(callback: VoidFunction) {
    auth.isAuthenticated = false;
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setTimeout(callback, 100);
  },
  getToken(){
    return localStorage.getItem('token');
  }
};

export { auth };