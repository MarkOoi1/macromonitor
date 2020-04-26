import { GET_CONFIG, SET_CONFIG } from './types';

export const getConfig = () => {
  return {
    type: GET_CONFIG
  };
};

export const setConfig = (config) => {
  return {
    type: SET_CONFIG,
    payload: config
  };
};