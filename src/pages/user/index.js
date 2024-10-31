import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm } from "antd";
import "./user.css";
import { getUser } from "../../api";

const User = () => {
  const [listData, setListData] = useState({
    name: "",
  });
  const [TableData, setTableData] = useState([]);
  const handleClick = (type, rowData) => {};
  const handleFinish = (e) => {
    setListData({ name: e.name });
    console.log(e);
  };
  const handleDelete = (rowData) => {};

  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  };
  const columns = [
    { title: "name", dataIndex: "name" },
    {
      title: "age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      render: (val) => {
        return val ? "women" : "man";
      },
    },
    {
      title: "birth",
      dataIndex: "birth",
    },
    {
      title: "address",
      dataIndex: "addr",
    },
    {
      title: "Edit",
      render: (rowData) => {
        return (
          <div className="edit-flex">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              Edit
            </Button>
            <Popconfirm
              title="infor"
              description="This will delete "
              okText="yes"
              cancelText="no"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                {" "}
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getTableData();
  }, []);
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
      <div>
        <Table columns={columns} dataSource={TableData} rowKey={"id"} />
      </div>
    </div>
  );
};

export default User;
