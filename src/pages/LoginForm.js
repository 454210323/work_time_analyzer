import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userActions";
import { API_URL } from "../configs/config";

const { Title, Link } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (values) => {
    const response = await fetch(API_URL + "/users/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();

    return user;
  };

  const onFinish = async (values) => {
    try {
      // TODO: here you send the login request and get user information
      const user = await login(values);
      dispatch(setUser(user)); // use dispatch to send the setUser action, update user state in Redux store
      message.success("Login Successful!");
      navigate("/dashboard/home");
    } catch (error) {
      message.error("Login Failed, Please Try Again!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card
        style={{
          width: "500px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title level={3}>Log In</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="user_id"
            rules={[{ required: true, message: "Please input your userId!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="UserId"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log In
            </Button>
            <Link href="/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
