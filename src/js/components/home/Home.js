import React, { useEffect } from "react";
import { firestore } from "Client/firestore";

import { useHistory } from "react-router-dom";

import { useRecoilValue, useRecoilState } from "recoil";
import { roomResultsState } from "JS/atoms";
import { roomResultsSelector } from "JS/selectors";

import { Layout, Input, Row, Col, Card } from "antd";
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

  const rooms = useRecoilValue(roomResultsSelector);
  return (
    <div className="home">
      <Content>
        <AddRoom />
        {rooms.map(room => (
          <RoomResult roomId={room.roomId} name={room.name} key={room.roomId} />
        ))}
      </Content>
    </div>
  );
};

export default Home;
