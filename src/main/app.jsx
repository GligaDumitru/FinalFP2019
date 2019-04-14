import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../components/login/Login";
import Home from "../components/home/home";
import WithAuth from "../components/withAuth/WithAuth";
import MainLayout from "../components/mainLayout/MainLayout";

// pages

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/home"
          render={props => (
            <WithAuth {...props}>
              <MainLayout {...props}>
                <Home />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default withRouter(connect(mapStateToProps)(App));
