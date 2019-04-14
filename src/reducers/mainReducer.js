import {
  ON_CLICK_SIGN_IN,
  ON_CLICK_SIGN_UP,
  ON_COMPLETE_SIGN,
  ON_ERROR_CHANGE,
  ON_CREDENTIALS_CHANGE
} from "../actions/actionstype";

const initialState = {
  showSpinner: false,
  signInFormVisible: true,
  signUpFormVisible: false,
  errorEmailFormat: false,
  signUpSuccessMsg: false,
  signUpErrorMsg: false,
  signInErrorMsg: false,
  successMsg: "",
  errorMsg: "",
  credentials: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    signUpEmail: "",
    signUpPassword: ""
  },
  fieldErrors: {
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    signUpEmail: false,
    signUpPassword: false
  },
  //auth checks
  checkIfIsAuthenticated: false,
  isChecking: false
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ON_CLICK_SIGN_IN:
      return {
        ...state,
        signUpFormVisible: false,
        credentials: {
          ...state.credentials,
          signUpEmail: "",
          signUpPassword: "",
          firstName: "",
          lastName: ""
        },
        fieldErrors: {
          ...state.fieldErrors,
          signUpEmail: false,
          signUpPassword: false,
          firstName: false,
          lastName: false
        },
        signUpSuccessMsg: false,
        signUpErrorMsg: false
      };
    case ON_CLICK_SIGN_UP:
      return {
        ...state,
        signInFormVisible: false,
        credentials: {
          ...state.credentials,
          email: "",
          password: ""
        },
        fieldErrors: {
          ...state.fieldErrors,
          email: false,
          password: false
        },
        signInErrorMsg: false
      };
    case ON_COMPLETE_SIGN:
      return {
        ...state,
        ...payload
      };
    case ON_CREDENTIALS_CHANGE:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          ...payload
        }
      };
    case ON_ERROR_CHANGE:
      return {
        ...state,
        fieldErrors: {
          ...state.fieldErrors,
          ...payload
        }
      };

    default:
      return state;
  }
};

export default mainReducer;
