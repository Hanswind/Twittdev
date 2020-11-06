import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Naviagtion from "components/Navigation";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Naviagtion />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
