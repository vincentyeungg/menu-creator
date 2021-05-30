import Home from './menu/pages/Home/Home';
import NavBar from './shared/components/Navigation/NavigationBar/NavigationBar';
import Login from "./user/pages/Login/Login";
import Signup from "./user/pages/Signup/Signup";
import CreateItem from "./menu/pages/CreateItem/CreateItem";
import RemoveItem from "./menu/components/RemoveItem/RemoveItem";
import RemoveMenu from "./menu/pages/RemoveMenu/RemoveMenu";
import EditMenuTD from "./menu/pages/EditMenuTD/EditMenuTD";
import MyMenus from "./menu/pages/MyMenus/MyMenus";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React from 'react';

import './App.css';
import CreateMenu from './menu/pages/CreateMenu/CreateMenu';
import EditMenu from './menu/pages/EditMenu/EditMenu';
import UpdateItem from "./menu/components/UpdateItem/UpdateItem";
import ViewMenu from "./menu/pages/ViewMenu/ViewMenu";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/:userId/menu/:menuId/editMenu/edit">
          <EditMenuTD />
        </Route>
        <Route path="/:userId/:menuId/editMenu/editItem/:itemId">
          <UpdateItem />
        </Route>
        <Route path="/:userId/:menuId/editMenu/removeItem/:itemId">
          <RemoveItem />
        </Route>
        <Route path="/:userId/menu/:menuId/editMenu">
          <EditMenu />
        </Route>
        <Route path="/:userId/menu/:menuId/deleteMenu">
          <RemoveMenu />
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
    <AuthContext.Provider value={
      {isLoggedIn: !!token, 
      token: token, 
      userId: userId, 
      login: login, 
      logout: logout}
    }>
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
