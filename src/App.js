import React from "react";
import MainNavbar from "./components/navbar/navbar-component";
import LoginSignup from "./pages/login-signup/login-signup-component";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/homepage/homepage-component";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signin-signup" component={LoginSignup} />
      </Switch>

      <div className="container"></div>
    </div>
  );
}

export default App;
