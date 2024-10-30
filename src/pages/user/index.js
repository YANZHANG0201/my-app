import React from "react";
import { Button, Form, Input } from "antd";
import "./user.css";

const User = () => {
  const handleClick = () => {};
  const handleFinish = (e) => {
    console.log(e);
  };
  return (
    <div className="userlist">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick("add")}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="please enter user name" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default User;
