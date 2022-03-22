
import { axios } from './base';
import { SurveyType } from './types';

const publicSurvey = async () => {
  try{
    const response = await axios.get(`/public-survey`)
    
    return response.data as SurveyType;
  }catch(e){
    return null;
  }
}

export { publicSurvey }