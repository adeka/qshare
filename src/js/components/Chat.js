import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { firestore } from "Client/firestore";

import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;
const { Search } = Input;

import { roomState, lobbyState, chatState, userState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import "Styles/chat.scss";

const Message = ({ message, userId }) => {
  const lobby = useRecoilValue(lobbyState);
  const user = lobby.find(user => user.userId == userId);
  return (
    <div className="message">
      <span className="messageHeader">{user?.name}:</span>
      <span className="messageBody">{message}</span>
    </div>
  );
};

const ChatHistory = () => {
  const chat = useRecoilValue(chatState);
  return (
    <div className="chatHistory">
      {[...chat].reverse().map(({ message, userId, timestamp }) => {
        return <Message userId={userId} message={message} key={timestamp} />;
      })}
    </div>
  );
};
const Chat = props => {
  const [currentMessage, updateCurrentMessage] = useState("");
  useEffect(() => {});
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);

  return (
    <Content>
      <ChatHistory />
      <Input
        placeholder="Enter Message..."
        value={currentMessage}
        onChange={e => updateCurrentMessage(e.target.value)}
        onPressEnter={e => {
          const message = e.target.value;
          const date = new Date();

          if (message) {
            firestore
              .collection("rooms")
              .doc(room.roomId)
              .collection("chat")
              .add({
                userId: user.userId,
                message: message,
                timestamp: date.getTime()
              });
            updateCurrentMessage("");
          }
        }}
      />
    </Content>
  );
};

export default Chat;
