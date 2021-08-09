import React, { useState, useEffect } from "react";
import { List, Avatar, Row, Col } from "antd";
import Axios from "axios";
import { VIDEO_SERVER } from "../../../Config";
import SideVideos from "./Sections/SideVideos";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";

function VideoDetailPage(props) {
  const getCookie = (name, cookies) => {
    const searchName = name + "=";
    const searchNameLength = searchName.length;
    const nameIndexStart = cookies.indexOf(searchName);
    const Cookieval = cookies.substring(nameIndexStart + searchNameLength);

    return Cookieval;
  };
  const userId = getCookie("user_id", document.cookie);
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [SameUser, setSameUser] = useState(false);
  const [CommentLists, setCommentLists] = useState([]);

  const videoVariable = {
    videoId: videoId,
  };

  const isSameId = (uploaderId) => {
    if (uploaderId !== userId) {
      setSameUser(true);
    }
  };

  const fetchVideos = () => {
    Axios.post(`${VIDEO_SERVER}/getVideoDetail`, videoVariable).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videoDetail);
          isSameId(response.data.videoDetail.writer._id);
        } else {
          alert("비디오를 불러오는데 실패했습니다.");
        }
      }
    );
    console.log(CommentLists);
  };

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
          {Video && (
            <video
              style={{ width: "100%", height: "527px" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>
          )}

          <List.Item
            // actions={[
            //   <LikeDislikes
            //     video
            //     videoId={videoId}
            //     userId={localStorage.getItem("userId")}
            //   />,
            //   <Subscriber
            //     userTo={Video.writer._id}
            //     userFrom={localStorage.getItem("userId")}
            //   />,
            // ]}

            actions={
              SameUser && [
                <Subscriber userTo={Video.writer} userFrom={userId} />,
              ]
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={Video.writer && Video.writer.image} />}
              title={<a href="/">{Video.title}</a>}
              description={Video.description}
            />
            <div></div>
          </List.Item>

          {/* Comments */}
          <Comments
            CommentLists={CommentLists}
            postId={Video._id}
            // refreshFunction={updateComment}
          />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideos />
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
