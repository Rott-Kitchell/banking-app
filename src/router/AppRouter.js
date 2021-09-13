import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
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
