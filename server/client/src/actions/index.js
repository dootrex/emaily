import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

//since we are using redux thunk middleware, we are able to
//avoid always returning an action but whatever action we
//are sending will go through the reducer and in the following
//action there is a function wiht dispatch as arguement and gets
//immidiately called because of redux thunk
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
//when we get the response from the API, update the value of reducer, reducer pulls off
//the new user model, since there is new state everything rerenders. TADA
//this works very well because we use same type of action and authreducer is listening for
//that specific action
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
