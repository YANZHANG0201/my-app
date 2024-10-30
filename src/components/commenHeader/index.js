import React from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar, Dropdown } from "antd";
import "./index.css";
import { useDispatch } from "react-redux";
import { collapseMenu } from "../../store/reducers/tab";

const { Header } = Layout;

const CommenHeader = (collapse) => {
  const logout = () => {};

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={() => logout} target="_blank" rel="noopener noreferrer">
          登出
        </a>
      ),
    },
  ];
  const dispatch = useDispatch();

  const setCollapsed = () => {
    console.log(collapse);
    dispatch(collapseMenu());
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuUnfoldOutlined />}
        // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          backgroundColor: "#fff",
        }}
        onClick={setCollapsed}
      />
      <Dropdown menu={{ items }}>
        <Avatar
          src={
            <img src={require("../../assests/images/user.jpg")} alt="avatar" />
          }
        />
      </Dropdown>
    </Header>
  );
};

export default CommenHeader;
