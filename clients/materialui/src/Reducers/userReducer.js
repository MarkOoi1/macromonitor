import { ENABLE_WELCOME, DISABLE_WELCOME } from "../Actions/types";

const initialState = {
  welcomemsg: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ENABLE_WELCOME:
      return { welcomemsg: true };
    case DISABLE_WELCOME:
      return { welcomemsg: false };
    default:
      return state;
  }
}
