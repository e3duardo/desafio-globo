
import { auth } from './auth';
import { axios } from './base';

const vote = async (brother_id: string | number, captchaToken: string) => {
  try {
    const response = await axios.post(`/votes`, { brother_id, captcha_token: captchaToken }, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    })

    return response.data as {
      id: string;
      user_id: string;
      brother_id: string;
      survey_id: string;
    };
  } catch (e) {
    return null;
  }
}

export { vote }
