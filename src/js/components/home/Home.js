import React, { useEffect, Suspense } from "react";

import { useHistory } from "react-router-dom";

import { useRecoilValue, useRecoilState } from "recoil";
import { roomResultsState } from "JS/atoms";
import { roomResultsSelector } from "JS/selectors";
import { firestore } from "Client/firestore";

import { Layout, Input, Row, Col, Card, Spin } from "antd";
const { Content } = Layout;
const { Search } = Input;
import { Add } from "Icons";

import "./home.scss";

const RoomResult = ({ roomId, name }) => {
  const history = useHistory();

  return (
    <Card
      onClick={() => {
        history.push(`/room/${roomId}`);
      }}
      className="roomResult"
    >
      {name}
    </Card>
  );
};

const AddRoom = ({}) => {
  const history = useHistory();

  return (
    <Card
      onClick={() => {
        // history.push(`/room/${roomId}`);
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
        <RoomResult roomId={room.roomId} name={room.name} key={room.roomId} />
      ))}
    </div>
  );
};
const Home = props => {
  const [roomResults, updateRoomResults] = useRecoilState(roomResultsState);

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await firestore.collection("rooms").onSnapshot(snapshot => {
        const roomResults = [];
        snapshot.forEach(doc => {
          roomResults.push({
            ...doc.data(),
            roomId: doc.id
          });
        });
        updateRoomResults(roomResults);
      });
    };
    getRooms();
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
