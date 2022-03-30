import * as TYPES from 'redux/types';

// * * reducer with initial state
export const initialUserState = {
    isConnected: false,
    userData: {}
//   error: null,
//   fetching: false,
//   isConnected: false,
//   authToken: null,
//   digikapToken: null,
//   loggedAs: null,
};
type ActionProps = {
    type: string;
    payload: {}
}

const auth = (state = initialUserState, action : ActionProps) => {
  switch (action.type) {
    case TYPES.SET_USER_DATA:
      return {
        ...state,
        isConnected: true,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
