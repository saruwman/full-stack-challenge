import React, { useState } from 'react';
import './Logout.css';
import { useHistory } from 'react-router-dom';
import useToken from '../../useToken';
import { Menu } from 'antd';
export default function Logout() {
   
  const { token, setToken } = useToken();
  let history = useHistory();
  const [authError, setError] = useState();

  const logout = () => {   
      setToken("");
      history.push("/login")
  }
 

  return (
    
    <Menu mode="horizontal">
      <Menu.Item key="alipay" onClick={()=>logout()}>
        
          Logout
       
      </Menu.Item>
    </Menu>
  )
}

