import axios from 'axios';

export const getAllEvents = async () => {

  try {
    let {data} = await axios.get('/api/events');
    return data;
  } catch(e) {
    console.log(e);
  }
  

  
};
