import React from "react"
import "./App.css"
import Signup from "./Signup";
import Login from "./Login";
import Error from "./Error"
import { Route, Switch } from "react-router-dom"
import Welcome from "./Welcome";

class App extends React.Component {

  render() {

    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Welcome" component={Welcome} />
          <Route component={Error} />
        </Switch>
      </>

    )
  }
}
export default App;
