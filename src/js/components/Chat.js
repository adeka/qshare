import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { firestore } from "Client/firestore";

import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;
const { Search } = Input;

import { roomState, lobbyState, chatState, userState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";
import { cleanString, timeConverter, isUrl } from "JS/utils";
import "Styles/chat.scss";

const formatMessage = message => {
  let formattedMessage = message;
  if (isUrl(message)) {
    formattedMessage = (
      <a href={message} target="_blank">
        {message}
      </a>
    );
  }

  return formattedMessage;
};
const Message = ({ message, userId, timestamp, lastMessageUserId }) => {
  const lobby = useRecoilValue(lobbyState);
  const user = lobby.find(user => user.userId == userId);
  const parsedTimestamp = timeConverter(timestamp);
  const firstMessage = lastMessageUserId !== userId;
  return (
    <div className="messageWrapper">
      {firstMessage && <img className="messageAvatar" src={user?.photoUrl} />}
      <div className="message">
        {firstMessage && (
          <div className="messageHeader">
            {user?.name}
            <span className="messageTimestamp">{parsedTimestamp}</span>
          </div>
        )}
        <div className="messageBody">{formatMessage(message)}</div>
      </div>
    </div>
  );
};

const ChatHistory = () => {
  const chat = useRecoilValue(chatState);
  return (
    <div className="chatHistory">
      {[...chat].reverse().map(({ message, userId, timestamp }, index) => {
        const lastChatMessage = [...chat].reverse()[index + 1];
        const lastMessageUserId = lastChatMessage?.userId;
        return (
          <Message
            userId={userId}
            message={message}
            timestamp={timestamp}
            key={timestamp}
            lastMessageUserId={lastMessageUserId}
          />
        );
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
          const message = cleanString(e.target.value);
          const date = new Date();

          if (message && message.length <= 256) {
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
