import { FETCH_USER } from "../actions/types";
//authreducer sets the state as action.payload we recieved from fetch user action
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //when noone looged in it returns empty string which is falsy
    default:
      return state;
  }
}
