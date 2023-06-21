import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Card,
  Typography,
  message
} from "antd";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../configs/config";
import useFetch from "../utils/useFetch";
const { Title } = Typography;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [teams, setTeams] = useState([])

  useFetch(`${API_URL}/team`, setTeams)

  const register = async (values) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  };
  const onFinish = async (values) => {
    try {
      const result = await register(values);
      message.success("Login Successful!");
      navigate("/login");
    } catch (error) {
      message.error("Regist Failed, Please Try Again!");
    }
  };
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
    }}>
      <Card
        style={{
          width: "500px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "5px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title level={3}>Register</Title>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="id"
            label="User ID"
            rules={[{ required: true, message: "Please input your userId!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="team_id"
            label="Team"
            rules={[
              {
                required: true,
                message: "Please select team!",
              },
            ]}
          >
            <Select placeholder="select your team">
              {teams.map((team) => (
                <Option key={team.team_id} value={team.team_id}>
                  {team.team_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
