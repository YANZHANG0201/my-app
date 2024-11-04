import React from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useSelector } from "react-redux";

const CommonTag = () => {
  const tabsList = useSelector((state) => state.tab.tabList);
  const currentMenu = useSelector((state) => state.tab.currentMenu);
  console.log(tabsList);
  const handlleClose = () => {
    console.log(tabsList);
  };
  //点击tag实现
  const handleChange = (tag) => {};
  //tab逻辑显示
  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag color="#55acee" closeIcon onClose={() => handlleClose(item, index)}>
        {item.label}
      </Tag>
    ) : (
      <Tag onClick={() => handleChange(item)} key={item.name}>
        {item.label}
      </Tag>
    );
  };

  return (
    <Space className="commontag" size={[0, 8]} wrap>
      {currentMenu.name &&
        tabsList.map((item, index) =>
          setTag(item.path === currentMenu.path, item, index)
        )}
    </Space>
  );
};

export default CommonTag;
