import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import "./user.css";
import { getUser, addUser, editUser, delUser } from "../../api";
import dayjs from "dayjs";

const User = () => {
  const [listData, setListData] = useState({
    name: "",
  });
  const [TableData, setTableData] = useState([]);
  const [modaltype, setModalType] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen);
    if (type == "add") {
      setModalType(1);
    } else {
      setModalType(0);
      const cloneData = JSON.parse(JSON.stringify(rowData));
      cloneData.birth = dayjs(cloneData.birth);
      console.log(cloneData);
      form.setFieldsValue(cloneData);
    }
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((val) => {
        val.birth = dayjs(val.birth).format("YYYY-MM-DD");
        if (modaltype) {
          addUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        } else {
          editUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFinish = (e) => {
    setListData({ name: e.keyword });
    console.log(e);
  };
  useEffect(() => {
    getTableData();
  }, [listData]);
  const handleDelete = ({ id }) => {
    delUser({ id }).then(() => {
      getTableData();
    });
  };

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
        <Table
          style={{ marginTop: "10px" }}
          columns={columns}
          dataSource={TableData}
          rowKey={"id"}
        />
        <Modal
          open={isModalOpen}
          title={modaltype ? "Add User" : "Edit User"}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={modaltype ? "Add" : "Edit"}
        >
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
          >
            {modaltype == 0 && (
              <Form.Item name="id" hidden>
                <Input></Input>
              </Form.Item>
            )}

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please enter the name",
                },
              ]}
            >
              <Input placeholder="please enter the name"></Input>
            </Form.Item>
            <Form.Item
              label="Age"
              name="age"
              rules={[
                {
                  required: true,
                  message: "please choose the gender",
                },
              ]}
            >
              <InputNumber min={1} max={100}></InputNumber>
            </Form.Item>
            <Form.Item
              label="Gender"
              name="sex"
              rules={[
                {
                  required: true,
                  message: "please choose the gender",
                },
              ]}
            >
              <Select
                placeholder="Choose your gender"
                options={[
                  { value: 0, label: "men" },
                  {
                    value: 1,
                    label: "women",
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              label="Birth"
              name="birth"
              rules={[
                {
                  required: true,
                  message: "please enter the age",
                },
              ]}
            >
              <DatePicker
                placeholder="please choose"
                format="YYYY/MM/DD"
              ></DatePicker>
            </Form.Item>
            <Form.Item
              label="Address"
              name="addr"
              rules={[
                {
                  required: true,
                  message: "please enter the address",
                },
              ]}
            >
              <Input placeholder="please enter the address"></Input>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default User;
