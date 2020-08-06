import React, { useEffect } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { searchResultsState, videoPlayerState } from "JS/atoms";
import YouTube from "react-youtube";

import SearchResults from "Components/searchResults/SearchResults";
import Playlist from "Components/playlist/Playlist";
import { Layout, Input, Row, Col } from "antd";
const { Content } = Layout;
const { Search } = Input;

import "./home.scss";

import { SearchRequest } from "Client/apiClient";

const Home = props => {
  useEffect(() => {
    search("");
  }, []);

  const [searchResults, updateSearchResults] = useRecoilState(
    searchResultsState
  );

  const [videoPlayer, updateVideoPlayer] = useRecoilState(videoPlayerState);

  const search = async query => {
    try {
      const { data } = await SearchRequest(query);
      updateSearchResults(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <Content>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Search placeholder="Search" onSearch={value => search(value)} />
            <SearchResults />
          </Col>
          <Col span={12}>
            <YouTube
              className="player"
              // videoId={null}
              opts={{}}
              onReady={e => {
                updateVideoPlayer(e.target);
              }}
            />
          </Col>
          <Col span={6}>
            <Playlist />
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default Home;
