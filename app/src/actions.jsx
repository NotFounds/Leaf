import axios from 'axios';

export const NEW_ENQUETE   = 'NEW_ENQUETE';
export const DEL_ENQUETE   = 'DEL_ENQUETE';
export const EDIT_ENQUETE  = 'EDIT_ENQUETE';
export const SEND_ENQUETE  = 'SEND_ENQUETE';
export const SEND_SUCCESS  = 'SEND_SUCCESS';
export const SNACK_MESSAGE = 'SNACK_MESSAGE';
export const SNACK_CLOSE   = 'SNACK_CLOSE';

export function sendEnquete(title, key, questions) {
  return dispatch => {
    dispatch(() => { type: SEND_ENQUETE });
    return axios.post('/api/enquete', {
      title: title,
      key: key,
      questions: questions
    }).then(response => {
      dispatch(() => { return { type: SEND_SUCCESS, payload: response.data }});
    }).catch(response => {
      console.log(response);
    });
  }
}

export function new_enquete()   { return { type: NEW_ENQUETE }; }
export function del_enquete(id) { return { type: DEL_ENQUETE, payload: id }; }
export function edit_enquete(value) { return { type: EDIT_ENQUETE, payload: value }; }
export function snack_message(message) { return { type: SNACK_MESSAGE, payload: message }; }
export function snack_close() { return { type: SNACK_CLOSE }; }
