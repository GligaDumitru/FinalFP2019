import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  onClickSignIn,
  onClickSignUp,
  onCompleteSign,
  onCredentialsChange,
  onErrorChange
} from "../../actions/mainActions";

import AuthService from "../../services/AuthService";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      profile: {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        userId: localStorage.getItem("userId")
      }
    };
  }

  handleLogoutClick = () => {
    const Auth = new AuthService();
    Auth.logout().then(() => {
      this.setState({ logout: true });
    });
  };

  redirectToTarget = target => {
    return <Redirect to={target} />;
  };
  render() {
    const { firstName, lastName } = this.state.profile;
    return (
      <header>
        <div className="header__component">
          <div className="header__component-logo">
            <i className="map pin inverted white icon" />
            event<span>Hooks</span>
          </div>
          <div className="header__component-profile">
            <div className="header__component-username">
              {lastName.concat(" ", firstName)}
            </div>
            <span className="header__component-icon">
              <i className="user circle icon" />
            </span>
            <div className="header__component-delimiter">|</div>
            <div
              className="header__component-logout"
              onClick={this.handleLogoutClick}
            >
              Logout
            </div>
          </div>
          {this.state.logout ? this.redirectToTarget("/login") : ""}
        </div>
      </header>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
