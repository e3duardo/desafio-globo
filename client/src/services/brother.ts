
import { auth } from './auth';
import { axios } from './base';
import { BrotherType } from './types';

const brotherDetail = async (id: string) => {
  try{
    const response = await axios.get(`/brothers/${id}`, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    })
    
    return response.data as BrotherType;
  }catch(e){
    return null;
  }
}

export { brotherDetail }
