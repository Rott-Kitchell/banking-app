import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Header from "../components/Header";
import _ from "lodash";

export const history = createBrowserHistory();

const AppRouter = ({auth}) => {
  return (
    <Router history={history}>
      <div>
          {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
          <Switch>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(AppRouter);
