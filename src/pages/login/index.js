import React from "react";
import { Form, Input, Button, message } from "antd";
import "./login.css";
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }
  const handleSubmit = (val) => {
    if (!val.password || !val.username) {
      return message.open({
        type: "warning",
        content: "please enter your username and password",
      });
    }
    getMenu(val).then(({ data }) => {
      localStorage.setItem("token", data.data.token);
      navigate("/home");
    });
  };
  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login_title">Login</div>
      <Form.Item label="Account" name="username">
        <Input placeholder="please enter your account"></Input>
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password placeholder="please enter your password"></Input.Password>
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
