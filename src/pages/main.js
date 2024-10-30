import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CommonAside from "../components/commenAside";
import CommenHeader from "../components/commenHeader";
import { useSelector } from "react-redux";

const { Content } = Layout;

const Main = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收起状态
  const collapse = useSelector((state) => state.tab.isCollpase);
  return (
    <Layout className="main-container">
      <CommonAside collapse={collapse} />
      <Layout>
        <CommenHeader collapse={collapse} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
