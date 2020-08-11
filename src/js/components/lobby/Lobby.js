import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import firestore from "Client/firestore";

import { Avatar, Layout, Input, Row, Col } from "antd";
import { Host } from "Icons";
const { Content } = Layout;
const { Search } = Input;

import { roomState, lobbyState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";

import "./lobby.scss";

const User = ({ user, room }) => {
  const isHost = user.userId == room.hostUserId;

  return (
    user && (
      <div className="user">
        <Avatar src={user.photoUrl} />
        {user.name} {isHost && Host}
      </div>
    )
  );
};

const Lobby = props => {
  useEffect(() => {}, []);
  const lobby = useRecoilValue(lobbyState);
  const room = useRecoilValue(roomState);
  return (
    <Content className="lobby">
      {lobby.map(user => (
        <User user={user} room={room} key={user.userId} />
      ))}
    </Content>
  );
};

export default Lobby;
