import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import FormField from "../common/formField";
import { Transition } from "semantic-ui-react";
import {
  onClickSignIn,
  onClickSignUp,
  onCompleteSign,
  onCredentialsChange,
  onErrorChange
} from "../../actions/mainActions";
import AuthService from "../../services/AuthService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount() {
    this.authService.checkIfLoggedIn().then(rsp => {
      if (rsp) {
        this.props.history.push("/home");
      } else {
        this.props.onCompleteSign({
          checkIfIsAuthenticated: false
        });
        this.props.history.push("/login");
        this.props.onCompleteSign({
          isChecking: false
        });
      }
    });
  }

  redirectToTarget = target => {
    return <Redirect to={target} />;
  };

  onClickSignIn = () => {
    this.props.onClickSignIn();
  };
  onClickSignUp = () => {
    this.props.onClickSignUp();
  };

  onCompleteSignIn = () => {
    // this.props.signUpFormVisble &&
    this.props.onCompleteSign({
      signInFormVisible: true
    });
  };

  // after transition is done
  onCompleteSignUp = () => {
    // this.props.signInFormVisible &&
    this.props.onCompleteSign({
      signUpFormVisible: true
    });
  };

  validate = formField => {
    const formFieldValue = this.props.credentials[formField];

    if (formFieldValue === "") {
      const { fieldErrors } = this.props;

      fieldErrors[formField] = true;

      if (formField === "email" || formField === "signUpEmail") {
        this.props.onCompleteSign({
          errorEmailFormat: false
        });
      }

      this.props.onErrorChange({
        ...fieldErrors
      });

      return false;
    }

    const { fieldErrors } = this.props;
    fieldErrors[formField] = false;
    this.props.onErrorChange({
      ...fieldErrors
    });
    return true;
  };

  onSignInUserCallback = (email, password) => {
    this.authService.onSignInUser(email, password).then(
      rsp => {
        this.props.onCompleteSign({
          showSpinner: false,
          signInErrorMsg: false,
          checkIfIsAuthenticated: true
        });
      },
      err => {
        console.log(err);
        this.props.onCompleteSign({
          showSpinner: false,
          signInErrorMsg: true,
          errorMsg: err.message
        });
      }
    );
  };
  onSignUpUserCallback = (firstName, lastName, signUpEmail, signUpPassword) => {
    this.authService
      .onSignUpUser(firstName, lastName, signUpEmail, signUpPassword)
      .then(
        rsp => {
          this.props.onCompleteSign({
            showSpinner: false,
            signUpSuccessMsg: true,
            signUpErrorMsg: false,
            successMsg: rsp.message
          });
        },
        err => {
          console.log(err);
          this.props.onCompleteSign({
            showSpinner: false,
            signUpSuccessMsg: false,
            signUpErrorMsg: true,
            errorMsg: err.message
          });
        }
      );
  };

  onClickSignInButton = () => {
    if (
      this.validate("email") &&
      this.validate("password") &&
      this.validateEmail("email")
    ) {
      const { email, password } = this.props.credentials;

      this.props.onCompleteSign(
        {
          showSpinner: true
        },
        this.onSignInUserCallback(email, password)
      );
    }
  };

  validateEmail = email => {
    const emailValue = this.props.credentials[email];
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
    const fine = regex.test(String(emailValue));
    if (!fine) {
      const { fieldErrors } = this.props;
      fieldErrors[email] = true;
      this.props.onErrorChange({
        ...fieldErrors
      });
      this.props.onCompleteSign({
        errorEmailFormat: true
      });
      return false;
    }

    const { fieldErrors } = this.props;
    fieldErrors[email] = false;
    this.props.onErrorChange({
      ...fieldErrors
    }) &&
      this.props.onCompleteSign({
        errorEmailFormat: false
      });
    return true;
  };

  handleInputChange = ({ target }) => {
    const field = target.name;
    const { credentials } = this.props;
    credentials[field] = target.value;
    this.props.onCredentialsChange({
      ...this.props.credentials,
      ...credentials
    });

    // changing the error msg
    const { fieldErrors } = this.props;

    fieldErrors[field] = !this.validate(field);
    this.props.onErrorChange({
      ...fieldErrors
    });
  };

  onCloseErrorMsg = () => {
    this.props.onCompleteSign({
      signUpErrorMsg: false,
      signInErrorMsg: false
    });
  };

  onCloseSuccessMsg = () => {
    this.props.onCompleteSign({
      signUpSuccessMsg: false
    });
  };

  onClickSignUpButton = () => {
    if (
      this.validate("firstName") &&
      this.validate("lastName") &&
      this.validate("signUpEmail") &&
      this.validate("signUpPassword") &&
      this.validateEmail("signUpEmail")
    ) {
      const {
        firstName,
        lastName,
        signUpEmail,
        signUpPassword
      } = this.props.credentials;

      this.props.onCompleteSign(
        {
          showSpinner: true
        },
        this.onSignUpUserCallback(
          firstName,
          lastName,
          signUpEmail,
          signUpPassword
        )
      );
    }
  };

  render() {
    const {
      isChecking,
      signUpFormVisible,
      signUpSuccessMsg,
      signUpErrorMsg,
      signInErrorMsg,
      signInFormVisible,
      checkIfIsAuthenticated,
      credentials,
      errorEmailFormat,
      errorMsg,
      showSpinner,
      fieldErrors,
      successMsg
    } = this.props;
    return (
      <div className="login__container">
        {isChecking ? (
          <div className="ui">
            <div className="ui active inverted dimmer">
              <div className="ui medium text loader">Loading</div>
            </div>
          </div>
        ) : (
          <div
            className={`form__container ${
              signUpFormVisible ? "sign-up-active" : ""
            } ${
              signUpSuccessMsg || signUpErrorMsg ? "sign-in-with-error" : ""
            } ${signInErrorMsg ? "sign-in-with-error" : ""}
            
            `}
          >
            <Transition
              visible={signInFormVisible}
              animation="fade"
              duration={500}
              onComplete={signInFormVisible ? null : this.onCompleteSignUp}
            >
              <div>
                <span className="form__container-title">Sign In With</span>
                <div className="form__container-content">
                  <FormField
                    labelClassName="content-email"
                    labelName="Email"
                    errorVisible={fieldErrors.email}
                    inputName="email"
                    inputType="email"
                    inputValue={this.props.credentials.email}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.email}
                    popupContent={
                      errorEmailFormat
                        ? "This Is Not A Valid Email"
                        : "Email is Required9"
                    }
                  />
                  <FormField
                    labelClassName="content-password"
                    labelName="password"
                    errorVisible={fieldErrors.password}
                    inputName="password"
                    inputType="password"
                    inputValue={credentials.password}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.password}
                    popupContent="Password Is Required"
                  />

                  <div className="content-sign-in-btn">
                    <button
                      className="ui fluid huge white button"
                      onClick={this.onClickSignInButton}
                    >
                      Sign In
                    </button>
                  </div>
                  {signInErrorMsg ? (
                    <div className="ui negative message">
                      <i
                        className="close icon"
                        onClick={this.onCloseErrorMsg}
                      />
                      <div className="small message">{errorMsg}</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="content-sign-up">
                    <span>Not a member?</span>
                    <span onClick={this.onClickSignUp}>Sign up now</span>
                  </div>
                </div>
              </div>
            </Transition>
            <Transition
              visible={signUpFormVisible}
              animation="fade"
              duration={500}
              onComplete={signUpFormVisible ? null : this.onCompleteSignIn}
            >
              <div>
                <span className="form__container-title">Sign Up With</span>
                <div className="form__container-content">
                  <FormField
                    labelClassName="content-email"
                    labelName="First Name"
                    errorVisible={fieldErrors.firstName}
                    inputName="firstName"
                    inputType="text"
                    inputValue={credentials.firstName}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.firstName}
                    popupContent="First Name Is Required"
                  />
                  <FormField
                    labelClassName="content-email"
                    labelName="Last Name"
                    errorVisible={fieldErrors.lastName}
                    inputName="lastName"
                    inputType="text"
                    inputValue={credentials.lastName}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.lastName}
                    popupContent="Last Name Is Required"
                  />
                  <FormField
                    labelClassName="content-email"
                    labelName="Email"
                    errorVisible={fieldErrors.signUpEmail}
                    inputName="signUpEmail"
                    inputType="email"
                    inputValue={credentials.signUpEmail}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.signUpEmail}
                    popupContent={
                      errorEmailFormat
                        ? "This Is Not A Valid Email"
                        : "Email is Required22"
                    }
                  />
                  <FormField
                    labelClassName="content-password"
                    labelName="Password"
                    errorVisible={fieldErrors.signUpPassword}
                    inputName="signUpPassword"
                    inputType="password"
                    inputValue={credentials.signUpPassword}
                    handleInputChange={this.handleInputChange}
                    popupVisible={fieldErrors.signUpPassword}
                    popupContent="Password Is Required"
                  />
                  <div className="content-sign-in-btn">
                    <button
                      className="ui fluid huge black button"
                      onClick={this.onClickSignUpButton}
                    >
                      Sign Up
                    </button>
                  </div>
                  {signUpSuccessMsg ? (
                    <div className="ui success message">
                      <i
                        className="close icon"
                        onClick={this.onCloseSuccessMsg}
                      />
                      <div className="small message">{successMsg}</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {signUpErrorMsg ? (
                    <div className="ui negative message">
                      <i
                        className="close icon"
                        onClick={this.onCloseErrorMsg}
                      />
                      <div className="small message">{errorMsg}</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="content-sign-up">
                    <span>Sign In?</span>
                    <span onClick={this.onClickSignIn}>Go Back</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        )}

        <div className="ui">
          <div className={`ui ${showSpinner ? "active" : "disabled"} dimmer`}>
            <div className="ui medium text loader">Loading</div>
          </div>
        </div>
        {checkIfIsAuthenticated ? this.redirectToTarget("/home") : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.main
  };
};

const mapDispatchToProps = dispatch => ({
  onClickSignIn: () => dispatch(onClickSignIn()),
  onClickSignUp: () => dispatch(onClickSignUp()),
  onCompleteSign: (data, callback = () => console.log("")) =>
    dispatch(onCompleteSign(data)).then(() => callback()),
  onCredentialsChange: data => dispatch(onCredentialsChange(data)),
  onErrorChange: data => dispatch(onErrorChange(data))
});

// export default withStyles(styles)(Login);/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
