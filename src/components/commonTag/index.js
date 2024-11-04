import React from "react";
import { Tag, Space } from "antd";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { closeTab, setCurrentMneu } from "../../store/reducers/tab";
import { useLocation, useNavigate } from "react-router-dom";
const CommonTag = () => {
  const tabsList = useSelector((state) => state.tab.tabList);
  const currentMenu = useSelector((state) => state.tab.currentMenu);
  const dispatch = useDispatch();
  const action = useLocation();
  const navigate = useNavigate();
  console.log(tabsList);
  const handlleClose = (tag, index) => {
    let length = tabsList.length - 1;
    dispatch(closeTab(tag));
    //if 关闭非当前tag
    if (tag.path !== action.pathname) {
      //不做任何处理
      return;
    }
    if (index === length) {
      const curData = tabsList[index - 1];
      dispatch(setCurrentMneu(curData));
      navigate(curData.path);
    } else {
      if (tabsList.length > 1) {
        const nextData = tabsList[index + 1];
        dispatch(setCurrentMneu(nextData));
        navigate(nextData.path);
      }
    }
  };
  //点击tag实现
  const handleChange = (tag) => {
    dispatch(setCurrentMneu(tag));
    navigate(tag.path);
  };
  //tab逻辑显示
  const setTag = (flag, item, index) => {
    return flag ? (
      <Tag
        color="#55acee"
        closeIcon
        onClose={() => handlleClose(item, index)}
        key={item.name}
      >
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
