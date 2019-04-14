import {
  ON_CLICK_SIGN_UP,
  ON_CLICK_SIGN_IN,
  ON_COMPLETE_SIGN,
  ON_ERROR_CHANGE,
  ON_CREDENTIALS_CHANGE
} from "./actionstype";

export const onClickSignIn = () => {
  return {
    type: ON_CLICK_SIGN_IN
  };
};

export const onClickSignUp = () => {
  return {
    type: ON_CLICK_SIGN_UP
  };
};

export const onCompleteSign = payload => dispatch => {
  dispatch({
    type: ON_COMPLETE_SIGN,
    payload
  });

  return Promise.resolve();
};

export const onCredentialsChange = payload => {
  return {
    type: ON_CREDENTIALS_CHANGE,
    payload
  };
};

export const onErrorChange = payload => {
  return {
    type: ON_ERROR_CHANGE,
    payload
  };
};
