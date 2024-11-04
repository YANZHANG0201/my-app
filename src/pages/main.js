import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import CommonAside from "../components/commenAside";
import CommenHeader from "../components/commenHeader";
import { useSelector } from "react-redux";
import CommonTag from "../components/commonTag";
import { RouterAuth } from "../router/routerAuth";

const { Content } = Layout;

const Main = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //获取展开收起状态
  const collapse = useSelector((state) => state.tab.isCollpase);
  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonAside collapse={collapse} />
        <Layout>
          <CommenHeader collapse={collapse} />
          <CommonTag />
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
    </RouterAuth>
  );
};

export default Main;
