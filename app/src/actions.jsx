import axios from 'axios';

export const INCREMENT = 'INCREMENT';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';

export function increment() { return { type: INCREMENT }; }
export function fetchMessages() {
  return dispatch => {
    dispatch(requestMessages());
    return axios.get('/api/messages').then((response) => {
      dispatch(receiveMessages(response.data));
    }).catch((response) => {
      console.log(response);
    })
  };
}

function requestMessages() {
  return {
    type: FETCH_MESSAGES
  };
}

function receiveMessages(json) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    messages: json
  };
}

