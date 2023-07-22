import { configureStore } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const GET_DATA = "GET_DATA";

const preloadedState = {
  data: [],
};

export const getData = (data) => {
  return {
    type: GET_DATA,
    value: data,
  };
};

const reducer = (state, action) => {
  const { type, value } = action;

  switch (type) {
    case GET_DATA:
      return { data: value };
    default:
      return state;
  }
};

export const store = configureStore({
  preloadedState,
  reducer,
});

export function fetchData() {
  return (dispatch) => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getData(response));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
