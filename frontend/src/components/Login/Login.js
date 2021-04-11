import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/Auth';
import useToken from '../../useToken';
import { Form, Input, Button, Typography, Space } from 'antd';

const { Text, Link, Title } = Typography;

export default function Login() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };
  const { token, setToken } = useToken();
  let history = useHistory();
  const [authError, setError] = useState();

  const handleSubmit = async values => {
    setError('')
    debugger
    await login(
      values
    ).then(res => {
      setToken(res.token); history.push("/overview");
    }).catch(error => { setError("Invalid credentials") }
    );
  }
  if (token) {
    history.push("/overview")
  }

  return (
    <div className="login-wrapper ">

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item {...tailLayout}>
          <Title>Login</Title></Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Text type="danger">{authError}</Text>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

