import React, { useState, useEffect } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  const fetchVideos = () => {};

  const fetchComments = () => {};

  useEffect(() => {
    fetchVideos();
    fetchComments();
  }, []);

  return (
    <Row>
      <Col lg={18} xs={24}>
        <div
          className="postPage"
          style={{ width: "100%", padding: "3rem 4em" }}
        >
        mainVideo
          {/* <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${Video.filePath}`}
            controls
          ></video>

          <List.Item
            actions={[
              <LikeDislikes
                video
                videoId={videoId}
                userId={localStorage.getItem("userId")}
              />,
              <Subscriber
                userTo={Video.writer._id}
                userFrom={localStorage.getItem("userId")}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={Video.writer && Video.writer.image} />}
              title={<a href="https://ant.design">{Video.title}</a>}
              description={Video.description}
            />
            <div></div>
          </List.Item>

          <Comments
            CommentLists={CommentLists}
            postId={Video._id}
            refreshFunction={updateComment}
          /> */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
      sideVideo
        {/* <SideVideo /> */}
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
