import axios from "axios";
import { FETCH_USER } from "./types";

//since we are using redux thunk middleware, we are able to
//avoid always returning an action but whatever action we
//are sending will go through the reducer and in the following
//action there is a function wiht dispatch as arguement and gets
//immidiately called because of redux thunk
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
