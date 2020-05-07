import { ENABLE_WELCOME, DISABLE_WELCOME } from "./types";

export const enableWelcome = () => {
  return {
    type: ENABLE_WELCOME,
  };
};

export const disableWelcome = () => {
  // API request to server to update user profile
  return {
    type: DISABLE_WELCOME,
  };
};
