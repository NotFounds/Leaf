import axios from 'axios';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const NEW_ENQUETE   = 'NEW_ENQUETE';
export const DEL_ENQUETE   = 'DEL_ENQUETE';
export const EDIT_ENQUETE  = 'EDIT_ENQUETE';
export const SNACK_MESSAGE = 'SNACK_MESSAGE';
export const SNACK_CLOSE   = 'SNACK_CLOSE';

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

export function new_enquete()   { return { type: NEW_ENQUETE }; }
export function del_enquete(id) { return { type: DEL_ENQUETE, payload: id }; }
export function edit_enquete(value) { return { type: EDIT_ENQUETE, payload: value }; }
export function snack_message(message) { return { type: SNACK_MESSAGE, payload: message }; }
export function snack_close() { return { type: SNACK_CLOSE }; }

function requestMessages() {
  return {
    type: FETCH_MESSAGES
  };
}

function receiveMessages(json) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: json
  };
}
