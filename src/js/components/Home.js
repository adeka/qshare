import React, { useEffect, Suspense } from "react";

import { useHistory } from "react-router-dom";

import { useRecoilValue, useRecoilState } from "recoil";
import { roomResultsState, userState } from "JS/atoms";
import { roomResultsSelector, userSelector } from "JS/selectors";
import { firestore } from "Client/firestore";

import { Layout, Input, Row, Col, Card, Spin } from "antd";
const { Content } = Layout;
const { Search } = Input;
import { Add, Delete } from "Icons";
import { isHost } from "JS/utils";

import "Styles/home.scss";

const RoomResult = ({ roomId, name, hostUserId }) => {
  const history = useHistory();
  const user = useRecoilValue(userState);

  return (
    <Card
      onClick={e => {
        history.push(`/room/${roomId}`);
      }}
    >
      {name}
      {user && isHost(user, { hostUserId }) && (
        <div
          onClick={e => {
            e.stopPropagation();
            firestore
              .collection("rooms")
              .doc(roomId)
              .delete();
          }}
        >
          {Delete}
        </div>
      )}
    </Card>
  );
};

const AddRoom = ({}) => {
  const history = useHistory();
  const user = useRecoilValue(userState);
  return (
    <Card
      onClick={async () => {
        const room = await firestore.collection("rooms").add({
          name: `${user.name}'s room`,
          hostUserId: user.userId,
          currentVideoIndex: 0
        });
        history.push(`/room/${room.id}`);
      }}
      className="addRoom"
    >
      New
      {Add}
    </Card>
  );
};

const Rooms = props => {
  const rooms = useRecoilValue(roomResultsState);
  return (
    <div>
      {rooms.map(room => (
        <RoomResult
          roomId={room.roomId}
          name={room.name}
          key={room.roomId}
          hostUserId={room.hostUserId}
        />
      ))}
    </div>
  );
};
const Home = props => {
  const [roomResults, updateRoomResults] = useRecoilState(roomResultsState);

  useEffect(() => {
    firestore.collection("rooms").onSnapshot(snapshot => {
      const roomResults = [];
      snapshot.forEach(doc => {
        roomResults.push({
          ...doc.data(),
          roomId: doc.id
        });
      });
      updateRoomResults(roomResults);
    });
  }, []);

  return (
    <div className="home">
      <Content>
        <AddRoom />
        <Rooms />
      </Content>
    </div>
  );
};

export default Home;
