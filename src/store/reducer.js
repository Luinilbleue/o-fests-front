// import isEmpty from 'lodash/isEmpty';

// == Initial State
const initialState = {
  isLoggedIn: false,
};

// == Types
const LOGOUT = 'LOGOUT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case DO_SOMETHING:
    //   return {
    //     ...state,
    //     message: action.message,
    //   };
    case LOGOUT:
      return {
        isLoggedIn: false,
      };
    case SET_CURRENT_USER:
      return {
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

// == Action Creators
// export const doSomething = message => ({
//   type: DO_SOMETHING,
//   message,
// });

export const logout = () => ({
  type: LOGOUT,
});

export function setCurrentUser() {
  return {
    type: SET_CURRENT_USER,
  };
}


// == Selectors


// == Export
export default reducer;
