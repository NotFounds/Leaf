import {
  SNACK_MESSAGE,
  SNACK_CLOSE,
  NEW_ENQUETE,
  DEL_ENQUETE,
  EDIT_ENQUETE,
  SEND_ENQUETE,
  SEND_SUCCESS
} from './actions';

const initialState = {
  isFetching: false,
  questions: [
    {
      'title': '',
      'type': 'text',
      'required': false,
      'description': '',
      'items': ['', ''],
      'id': uuidv4(),
    }
  ],
  snackMessage: '',
  isSnack: false,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SEND_ENQUETE:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case SEND_SUCCESS:
      return Object.assign({}, state, {
        snackMessage: action.payload,
        isSnack: true,
        isFetching: false,
      });

    case SNACK_MESSAGE:
      return Object.assign({}, state, {
        snackMessage: action.payload,
        isSnack: true,
      });

    case SNACK_CLOSE:
      return Object.assign({}, state, {
        snackMessage: '',
        isSnack: false,
      });

    case NEW_ENQUETE:
      let questions = state.questions.slice(0);
      const id = uuidv4();
      questions.push({
        'title': '',
        'type': 'text',
        'required': false,
        'description': '',
        'items': ['', ''],
        'id': id,
      });
      return Object.assign({}, state, {
        questions: questions,
      });

    case DEL_ENQUETE:
      return Object.assign({}, state, {
        questions: state.questions.slice(0).filter(x => x.id !== action.payload)
      });

    case EDIT_ENQUETE:
      let payload = action.payload;
      let obj = state.questions.slice(0).map(x =>
        (x.id !== payload.id
          ? x
          : payload)
      );
      return Object.assign({}, state, {
        questions: obj
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
