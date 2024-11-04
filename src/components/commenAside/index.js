import React from "react";
import * as Icon from "@ant-design/icons";
import MenuConfig from "../../config";
import { useNavigate } from "react-router";
import { Button, Layout, Menu, theme } from "antd";
import { useDispatch } from "react-redux";
import { selectMenuList } from "../../store/reducers/tab";

const { Header, Sider, Content } = Layout;

const iconToelement = (name) => React.createElement(Icon[name]);
const items = MenuConfig.map((item) => {
  const child = {
    key: item.path,
    icon: iconToelement(item.icon),
    label: item.label,
  };
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});

const CommonAside = ({ collapse }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setTabsList = (val) => {
    dispatch(selectMenuList(val));
  };
  const selectMenu = (e) => {
    let data;
    MenuConfig.forEach((item) => {
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path == e.key;
          });
        }
      }
    });
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label,
    });
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsed={collapse}>
      <h3 className="app-name">{collapse ? "Yan" : "Yan management system"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          height: "100%",
        }}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonAside;
