import { GET_REGIONS } from '../Actions/types';

const initialState = [
    {name: 'Australia', market_ids: [], keywords: ['RBA','Lowe','Morrison','Australia']},
    {name: 'USA', market_ids: [], keywords: ['Powell','Williams','Clarida','Bowman','Brainard','Quarles','Harker','Mester','Kashkari','Kaplan','Rosengren','George','Bullard','Evans','Strine','Fed Reserve']},
    {name: 'Europe', market_ids: [], keywords: ['Germany','France','Italy','ECB','Lagarde']},
    {name: 'UK', market_ids: [], keywords: ['UK','Boris','Boris Johnson','Sunak ','Raab','Michael Gove']}
  ]

export default function(state = initialState, action) {

  switch(action.type) {
    case GET_REGIONS:
      return {
        ...state.regions,
      }
    default:
      return state;
  };
};