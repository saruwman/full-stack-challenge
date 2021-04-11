import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Complaints/Dashboard';
import Overview from './components/Complaints/ComplaintOverview';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import PrivateRoute from './PrivateRoute';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  return (
    <>
     
      <div className="wrapper">

        <BrowserRouter>
          <Switch>


            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path='/overview' component={Overview} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <Route render={() => (<Redirect to="/overview" />)}
            />

          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;