import classes from "./App.Module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContainer } from "./Screens/Auth/AuthContainer";
import { ResourcesContainer } from "./Screens/Resources/ResourcesContainer";
import { Nav } from "./Components/Nav/Nav";

function App({ isAuth }) {
  return (
    <div>
      {isAuth ? <Nav /> : ""}
      <Switch>
        <Route exact path="/resources" component={ResourcesContainer} />
        <Route exact path="/auth" component={AuthContainer} />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
}

export default App;
