import {
  MOVE_PAGE,
  FETCH_ENQUETE,
  FETCH_ENQUETE_SUCCESS,
  SEND_ANSWER,
  SEND_SUCCESS,
} from './actions'

const initialState = {
  isFetching: false,
  page: 'top',
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case MOVE_PAGE:
      return Object.assign({}, state, {
        page: action.payload
      });

    case FETCH_ENQUETE:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_ENQUETE_SUCCESS:
      const enquete = action.payload;
      let answers = enquete.questions.slice(0).map(x => ({
        id: x.id,
        value: x.type !== 'multiselect' ? '' : [],
      }));
      return Object.assign({}, state, {
        isFetching: false,
        enquete: enquete,
        answer: {
          meta: {
            key: enquete.key,
            uid: uuidv4(),
          },
          answers: answers,
        }
      });

    case SEND_ANSWER:
      return Object.assign({}, state, {
        isFetching: true,
        page: 'top'
      });

    case SEND_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });

    default:
      return state;
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
