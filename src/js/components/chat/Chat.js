import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import firestore from "Client/firestore";

import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;
const { Search } = Input;

import { roomState, playlistState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import "./chat.scss";

const ChatHistory = () => {
  return <div className="chatHistory"></div>;
};
const Chat = props => {
  useEffect(() => {}, []);

  return (
    <Content>
      <ChatHistory />
      <Input placeholder="Enter Message..." />
    </Content>
  );
};

export default Chat;
