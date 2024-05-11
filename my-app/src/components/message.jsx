import React, { useState } from "react";
import "../pages/style/chat.css";


const Message = (props) => {
  const { content, id, username,userId,getComments } = props;

  const currUserId=JSON.parse(localStorage.getItem("AlphaQ")).userID;
  const src ="https://bootdey.com/img/Content/avatar/avatar3.png";

  return (
      <div className="chatContainer" onClick={()=>getComments(id)}>
        <img src={src} className={currUserId==userId && "right"} alt={username} />
        <p>{username}:</p>
        <p>{content}</p>
        <span className={currUserId==userId?"time-left":"time-right"}>11:00</span>
      </div>
  );
};

export default Message;
