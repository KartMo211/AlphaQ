import React, { useState, useEffect } from "react";
import { Modal, message, Form, Input, Button } from "antd";
import axios from "axios";
import Message from "./message";

import "../pages/style/chat.css";

const Topic = (props) => {
  const { topicModal, topicName, closeTopicModal, id, topicContent } = props;

  //fetch all the data from the posts table
  const [comment, setComment] = useState([]);
    const [commentId, setCommentId] = useState(-1);

  const [post, setPost] = useState([]);

  const userId = JSON.parse(localStorage.getItem("AlphaQ")).userID;

  const submitPost = async (values) => {
    try {
      const response = await axios.post("/api/posts/insertPost", {
        ...values,
        userId: userId,
        topicId: id,
      });
      getPosts();
      message.success("Successfully Posted");
    } catch (err) {
      message.error(err.message);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.post("/api/posts/getPost", { topicId: id });
      setPost(response.data);
    } catch (err) {
      message.error(err.message);
    }
  };

  const submitComment = async (values) => {
    try {
      const response = await axios.post("/api/comment/insertComment", {
        ...values,
        userId: userId,
        postId: commentId,
      });
      getComments(commentId);
      message.success("Successfully Commented");
    } catch (err) {
      message.error(err.message);
    }
  };
  const getComments = async (id) => {
    try {
      const response = await axios.post("/api/comment/getComment", { id: id });
      console.log(response.data);
      setComment(response.data);
      setCommentId(id);
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [id]);

  const [follow,setFollow] = useState(false);

  const getFollow = async()=>{
    try {
        const response = await axios.post("/api/interest/check", {userId: userId, topicId:id});
        console.log(response.data);
        if(response.data.length==0){
            setFollow(true);
        }
        else{
            setFollow(false);
        }
      } catch (err) {
        console.log(err);
        message.error(err.message);
      }
  }

  useEffect(()=>{
    getFollow();
  },[topicModal]);

  const followTopic = async ()=>{
    try{
        await axios.post("/api/interest/follow",{userId: userId,topicId:id});
        message.success("Successfully Followed");
        getFollow();
    }
    catch(err){
        message.error(err.message);
    }
  }

  const unfollowTopic = async ()=>{
    try{
        await axios.post("/api/interest/unfollow",{userId: userId,topicId:id});
        message.success("Successfully unfollowed");
        getFollow();
    }
    catch(err){
        message.error(err.message);
    }
  }


  return (
    <Modal
      title="Basic Modal"
      open={topicModal}
      onCancel={closeTopicModal}
      footer={false}
      width={"800px"}
    >
      <div>
 
        <p>Topic Name: {topicName}</p>
        <p>Topic Content: {topicContent}</p>

        <Button type="primary" style={{backgroundColor: follow ? "green" : "red" }} onClick={()=> follow?followTopic():unfollowTopic()}>
            {follow?"Follow": "Unfollow"}
        </Button>

      </div>

      <div class="chatRow">
        <div class="chatCol">
          {post.length == 0 && <div>There are no posts. Be there first.</div>}
          <div className="chatContent">
            {post.map((value) => {
              return (
                <Message
                  key={value._id}
                  id={value._id}
                  content={value.content}
                  username={value.username}
                  userId={value.user_id}
                  getComments={getComments}
                />
              );
            })}
          </div>
          <Form
            name="basic"
            autoComplete="off"
            layout="inline"
            onFinish={submitPost}
          >
            <Form.Item
              name="post"
              rules={[
                {
                  required: true,
                  message: "Type your thoughts",
                },
              ]}
              style={{ width: "275px" }}
            >
              <Input />
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
        </div>
        <div className="chatCol">
          Here is the list of comments for this particular post
          <div class="chatContent">
            {comment.map((value) => {
              console.log(value);
              return (
                <div>
                  {value.username}:<br></br>
                  {value.content}
                  <br></br>
                </div>
              );
            })}
          </div>
          <Form
            name="basic"
            autoComplete="off"
            layout="inline"
            onFinish={submitComment}
          >
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Type your thoughts",
                },
              ]}
              style={{ width: "150px" }}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ width: "25px" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default Topic;
