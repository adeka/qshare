import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistState, roomState, activeVideoState } from "JS/atoms";
import { playlistSelector } from "JS/selectors";
import { firestore, incrementCurrentVideoIndex } from "Client/firestore";
import { Delete } from "Icons";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Layout, Input, Card } from "antd";
import { stringFormat } from "JS/utils";
import "Styles/playlist.scss";

export const PlaylistResult = ({
  video,
  room,
  playlist,
  roomId,
  videoId,
  thumbnailUrl,
  title,
  index
}) => {
  const isCurrentVideo = room.currentVideoIndex == video.index;
  return (
    <Card
      onClick={() => {
        firestore.doc(`rooms/${roomId}`).update({ currentVideoIndex: index });
      }}
      style={{ background: `url(${thumbnailUrl}` }}
      className={classNames("playlistVideo", { selected: isCurrentVideo })}
    >
      {stringFormat(title)}
      <div className="index">{index}</div>
      <div
        onClick={e => {
          e.stopPropagation();

          if (isCurrentVideo) {
            incrementCurrentVideoIndex(room, playlist, video, true);
          }

          firestore
            .collection("rooms")
            .doc(roomId)
            .collection("videos")
            .doc(videoId)
            .delete();
        }}
      >
        {Delete}
      </div>
    </Card>
  );
};

const Playlist = props => {
  const [playlist, updatePlaylist] = useRecoilState(playlistState);

  const room = useRecoilValue(roomState);
  const activeVideo = useRecoilValue(activeVideoState);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragUpdate = result => {
    // this article explains how we can update the list in realtime
    // to avoid the lovely flicker we get onDragEnd
    // https://itnext.io/dynamically-update-positions-during-drag-using-react-beautiful-dnd-4a986d704c2e
  };

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const orderedPlaylist = reorder(
      [...playlist],
      result.source.index,
      result.destination.index
    );

    firestore
      .collection("rooms")
      .doc(room.roomId)
      .collection("videos")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc);
          const orderedVideo = orderedPlaylist.find(
            video => video.videoId == doc.id
          );
          const newIndex = orderedPlaylist.indexOf(orderedVideo);
          doc.ref.update({
            index: newIndex
          });
        });
      });

    const reorderedCurrentVideo = orderedPlaylist.find(
      video => video.videoId == activeVideo.videoId
    );

    const reorderedCurrentVideoIndex = orderedPlaylist.indexOf(
      reorderedCurrentVideo
    );

    firestore
      .doc(`rooms/${room.roomId}`)
      .update({ currentVideoIndex: reorderedCurrentVideoIndex });

    updatePlaylist(orderedPlaylist);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: 4,
    marginBottom: "1em",

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "lightblue" : "lightgrey"
  });

  return (
    <>
      <div className="playlistHeader">
        Playlist <span>{playlist.length} videos</span>
      </div>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragUpdate={onDragUpdate}
        className="playlist"
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {playlist.map((result, index) => (
                <Draggable
                  key={result.videoId}
                  draggableId={result.videoId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <PlaylistResult
                        playlist={playlist}
                        room={room}
                        video={result}
                        index={result.index}
                        roomId={room.roomId}
                        videoId={result.videoId}
                        thumbnailUrl={result.thumbnailUrl}
                        title={result.title}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Playlist;
