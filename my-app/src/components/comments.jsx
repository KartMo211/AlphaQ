import React, { useState } from "react";
import { Modal } from "antd";
import "../pages/style/chat.css";

const Comment = (props) => {
  
    const {commentModal,closeCommentModal} = props;

  return (
    <Modal title="Basic Modal" open={commentModal} onCancel={closeCommentModal} footer={false}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
  );
};

export default Comment;
