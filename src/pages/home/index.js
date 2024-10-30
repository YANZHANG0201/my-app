import React, { useEffect, useState } from "react";
import { Col, Row, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";
import "./home.css";
import { getData } from "../../api";
import MyEcharts from "../../components/echarts";
//table column
const columns = [
  {
    title: "课程",
    dataIndex: "name",
  },
  {
    title: "今日购买",
    dataIndex: "todayBuy",
  },
  {
    title: "本月购买",
    dataIndex: "monthBuy",
  },
  {
    title: "总购买",
    dataIndex: "totalBuy",
  },
];
const countData = [
  {
    name: "今日支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "今日收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "今日未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "本月支付订单",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "本月收藏订单",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "本月未支付订单",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];
const iconToelement = (name) => React.createElement(Icon[name]);
const Home = () => {
  const userimg = require("../../assests/images/user.jpg");
  //dom 首次渲染完成
  //创建echart响应式数据
  const [echartData, setEchartData] = useState({});

  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData, orderData } = data.data;
      setTableData(tableData);
      const order = orderData;
      const xData = order.date;
      const keyArray = Object.keys(order.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      setEchartData({
        order: {
          xData,
          series,
        },
      });
    });
  }, []);
  const [tableData, setTableData] = useState([]);
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userimg} />
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="supername">Super Admin</p>
            </div>
          </div>
          <div className="loginfor">
            <p>
              lastTimelogin<span>2022-2-2</span>
            </p>
            <p>
              lastlocationlogin<span>Guangxi</span>
            </p>
          </div>
        </Card>
        <Card>
          <Table
            rowKey={"name"}
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div className="icon-box" style={{ background: item.color }}>
                  {iconToelement(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">${item.value}</p>
                  <p className="txt"> {item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {echartData.order && (
          <MyEcharts chartData={echartData.order} style={{ height: "280px" }} />
        )}
      </Col>
    </Row>
  );
};

export default Home;
