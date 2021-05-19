import Home from './menu/pages/Home/Home';
import NavBar from './shared/components/Navigation/NavigationBar/NavigationBar';
import Footer from "./shared/components/Footer/Footer";
import Login from "./user/pages/Login/Login";
import Signup from "./user/pages/Signup/Signup";
import CreateItem from "./menu/pages/CreateItem/CreateItem";
import MyMenus from "./menu/pages/MyMenus/MyMenus";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useState, useCallback } from 'react';

import './App.css';
import CreateMenu from './menu/pages/CreateMenu/CreateMenu';
import EditMenu from './menu/pages/EditMenu/EditMenu';
import UpdateItem from "./menu/components/UpdateItem/UpdateItem";
import ViewMenu from "./menu/pages/ViewMenu/ViewMenu";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/:userId/:menuId/editMenu/editItem/:itemId">
          <UpdateItem />
        </Route>
        <Route path="/:userId/:menuId/editMenu/removeItem/:itemId">
          <h1>REMOVE FORM</h1>
        </Route>
        <Route path="/:userId/menu/:menuId/editMenu">
          <EditMenu />
        </Route>
        <Route path="/:userId/menu/:menuId/deleteMenu">
          <h1>DELETE MENU</h1>
        </Route>
        <Route path="/:userId/menu/:menuId/createItem">
          <CreateItem />
        </Route>
        <Route path="/:userId/createMenu">
          <CreateMenu />
        </Route>
        <Route path="/:userId/viewMenus">
          <MyMenus />
        </Route>
        <Route path="/:userId/menu/:menuId">
          <ViewMenu />
        </Route>
        <Redirect to="/home">
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
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
      <Router>
        <div className="App">
          <NavBar />
          {routes}
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
