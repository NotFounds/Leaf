import axios from 'axios';

export const MOVE_PAGE = 'MOVE_PAGE';
export const FETCH_ENQUETE = 'FETCH_ENQUETE';
export const FETCH_ENQUETE_SUCCESS = 'FETCH_ENQUETE_SUCCESS';
export const SEND_ANSWER  = 'SEND_ANSWER';
export const SEND_SUCCESS = 'SEND_ENQUETE';

export function fetchEnquete(key) {
  return dispatch => {
    dispatch({ type: FETCH_ENQUETE});
    return axios.get('/api/enquete', {
      params: {
        key: key,
      }
    }).then((response) => {
      dispatch({ type: FETCH_ENQUETE_SUCCESS, payload: response.data });
    }).catch((response) => {
      dispatch({ type: MOVE_PAGE, payload: 'top' });
      console.log(response);
    })
  };
}

export function sendAnswer(answer) {
  return dispatch => {
    dispatch({ type: SEND_ANSWER });
    return axios.post('/api/answer', {
      answer: answer
    }).then(response => {
      dispatch({ type: SEND_SUCCESS, payload: response.data });
    }).catch(response => {
      dispatch({ type: SEND_SUCCESS, payload: response.data });
      console.log(response);
    });
  }
}

export function move_page(page) { return { type: MOVE_PAGE, payload: page }; }
