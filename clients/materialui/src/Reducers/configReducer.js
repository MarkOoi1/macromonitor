import { GET_CONFIG, SET_CONFIG } from '../Actions/types';

const initialState = {selectedRegions: "Worldwide"};


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CONFIG:
      return state
    case SET_CONFIG:
      return {...action.payload}
    default:
      return state;
  };
};

