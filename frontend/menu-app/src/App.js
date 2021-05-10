import Menu from '../src/menu/pages/Menu/Menu';
import NavBar from './shared/components/Navigation/NavigationBar/NavigationBar';
import Footer from "./shared/components/Footer/Footer";
import Login from "./user/pages/Login/Login";
import Signup from "./user/pages/Signup/Signup";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import './App.css';

function App() {

  let isLoggedIn = false;
  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/menus" exact>
          {/* add home path here */}
        </Route>
        <Route path="/:userId/:menuId/edit/:itemId}">
          {/* edit item modal */}
        </Route>
        <Route path="/:userId/:menuId/delete/:itemId}">
          {/* delete item modal */}
        </Route>
        <Route path="/:userId/:menuId/create}">
          {/* create item modal */}
        </Route>
        <Route path="/:userId/:menuId">
          <Menu />
        </Route>
        <Redirect to="/menus">
          {/* add home path here */}
        </Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login">
          <Login />
        </Redirect>
      </Switch>
    );
  }

  return (
    <Router>
      <div className="App">
        <NavBar isAuthenticated={isLoggedIn} />
        {routes}
        <Footer isAuthenticated={isLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
