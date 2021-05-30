import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Suspense } from 'react';
import './App.css';

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/LoadingSpinner/LoadingSpinner";

const Home = React.lazy(() => import('./menu/pages/Home/Home'));
const NavBar = React.lazy(() => import('./shared/components/Navigation/NavigationBar/NavigationBar'));
const Login = React.lazy(() => import('./user/pages/Login/Login'));
const Signup = React.lazy(() => import('./user/pages/Signup/Signup'));
const CreateItem = React.lazy(() => import('./menu/pages/CreateItem/CreateItem'));
const RemoveItem = React.lazy(() => import('./menu/components/RemoveItem/RemoveItem'));
const RemoveMenu = React.lazy(() => import('./menu/pages/RemoveMenu/RemoveMenu'));
const EditMenuTD = React.lazy(() => import('./menu/pages/EditMenuTD/EditMenuTD'));
const MyMenus = React.lazy(() => import('./menu/pages/MyMenus/MyMenus'));
const CreateMenu = React.lazy(() => import('./menu/pages/CreateMenu/CreateMenu'));
const EditMenu = React.lazy(() => import('./menu/pages/EditMenu/EditMenu'));
const UpdateItem = React.lazy(() => import('./menu/components/UpdateItem/UpdateItem'));
const ViewMenu = React.lazy(() => import('./menu/pages/ViewMenu/ViewMenu'));

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
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
            }
          >
            <NavBar />
            {routes}
          </Suspense>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
