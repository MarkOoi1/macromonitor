import axios from 'axios';

export const getAllEvents = async () => {

  try {
    let {data} = await axios.get('http://localhost:5000/api/events');
    return data;
  } catch(e) {
    console.log(e);
  }
  

  
};
