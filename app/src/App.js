import classes from "./App.Module.css";

import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Nav } from "./Components/Nav/Nav";

import { AuthContainer } from "./Screens/Auth/AuthContainer";
import { Resources } from "./Screens/Resources/Resources";
import { Settings } from "./Screens/Settings/Settings";
import { Parsing } from "./Screens/Parsing/Parsing";
import { Stats } from "./Screens/Stats/Stats";

function App({ isAuth, setAuth }) {
  const history = useHistory();
  console.log(isAuth);
  !isAuth && history.push("/auth");
  return (
    <div>
      {isAuth ? <Nav setAuth={setAuth} /> : ""}
      <Switch>
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/parsing" component={Parsing} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/auth" component={AuthContainer} />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
}

export default App;
