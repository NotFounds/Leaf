import { INCREMENT, FETCH_MESSAGES, FETCH_MESSAGES_SUCCESS } from './actions';

const initialState = {
  messages: ['aaa', 'bbb'],
  value: 0,
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return Object.assign({}, state, {
        value: state.value + 1
      });

    case FETCH_MESSAGES:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messages: action.messages
      });

    default:
      return state;
  }
}
