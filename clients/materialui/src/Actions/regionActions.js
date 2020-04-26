import { GET_REGIONS, SET_REGIONS } from './types';

export const getRegions = () => {
  return {
    type: GET_REGIONS
  };
};

export const setRegions = (region) => {
  return {
    type: SET_REGIONS,
    payload: region
  };
};