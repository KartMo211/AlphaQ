import React, { useState } from "react";
import { Modal } from "antd";

import "../pages/style/chat.css";


const Topic = (props) => {
  const { topicModal, closeTopicModal, id } = props;
  console.log(props);

  return (
    <Modal
      title="Basic Modal"
      open={topicModal}
      onCancel={closeTopicModal}
      footer={false}
    >
      <div>
        <p>{id}</p>
      </div>

      <div class="chatContainer">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" />
        <p>Hello. How are you today?</p>
        <span class="time-right">11:00</span>
      </div>

      <div class="chatContainer darker">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" class="right" />
        <p>Hey! I'm fine. Thanks for asking!</p>
        <span class="time-left">11:01</span>
      </div>

      <div class="chatContainer">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" />
        <p>Sweet! So, what do you wanna do today?</p>
        <span class="time-right">11:02</span>
      </div>

      <div class="chatContainer darker">
        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Avatar" class="right" />
        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
        <span class="time-left">11:05</span>
      </div>
    </Modal>
  );
};

export default Topic;
