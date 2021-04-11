import { useState } from 'react';
import axios from 'axios';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if(userToken)
    axios.defaults.headers.common['Authorization'] = "token " + userToken;
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));

    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}