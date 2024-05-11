import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import "../pages/style/home.css";
import NavBar from "./navbar";
import { Form, Input, Checkbox, Button, Modal } from "antd";

function CreateTopic(props) {
  const { isModalOpen, setShowModal } = props;
  console.log(props);

  const createTopic = (values)=>{
    try{
        console.log(values);

        await axios.post("/")

    }
    catch(err){
        console.log(err.message);
    }
  }

  return (
    <div>
      <Modal title="Create a Topic" open={isModalOpen} onCancel={setShowModal} footer={false}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={createTopic}
          autoComplete="off"
        >
          <Form.Item
            label="Topic"
            name="topic"
            rules={[
              {
                required: true,
                message: "Enter Your Topic",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Description about your topic",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateTopic;
