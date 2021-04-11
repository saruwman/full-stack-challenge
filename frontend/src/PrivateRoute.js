import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useToken from './useToken';
export default function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useToken();
  console.log(token)
  return (
    <Route
      {...rest}
      render={(props) => token 
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}