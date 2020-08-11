import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import firestore from "Client/firestore";

import { Avatar, Layout, Input, Row, Col } from "antd";
import { Host } from "Icons";
const { Content } = Layout;
const { Search } = Input;

import { roomState, lobbyState } from "JS/atoms";
import { currentRoomName, currentVideos } from "JS/selectors";
import { isHost } from "JS/utils";

import "Styles/lobby.scss";

const User = ({ user, room }) => {
  return (
    user && (
      <div className="user">
        <Avatar src={user.photoUrl} />
        {user.name} {isHost(room, user) && Host}
      </div>
    )
  );
};

const Lobby = props => {
  useEffect(() => {}, []);
  const lobby = useRecoilValue(lobbyState);
  const room = useRecoilValue(roomState);

  // spread lobby into new array because calling sort will throw an error
  // if we call it on the lobby array reference (its frozen by recoil)
  // if only JS had a way to pass by value :kappa:
  return (
    <Content className="lobby">
      {[...lobby]
        .sort((a, b) => (!isHost(room, a) ? 1 : -1))
        .map(user => (
          <User user={user} room={room} key={user.userId} />
        ))}
    </Content>
  );
};

export default Lobby;
