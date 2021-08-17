import React, { useState, useEffect } from "react";
import { getCookie } from "../../../utils/getCookie";
import { Typography, Row } from "antd";
import ShowUploads from "./Sections/ShowUploads";
import { VIDEO_SERVER } from "../../../Config";
import Axios from "axios";

function MyPage() {
  const { Title } = Typography;
  const userId = getCookie("user_id", document.cookie);
  const [VideoLists, setVideoLists] = useState([]);

  const userInfo = {
    userId: userId,
  };

  const updateVideos = (someChange) => {
    setVideoLists(VideoLists.concat(someChange));
  };

  const fetchMyVideos = (userInfo) => {
    Axios.post(`${VIDEO_SERVER}/getMyVideos`, userInfo).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideoLists(response.data.videos);
      } else {
        alert("비디오를 가져오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    if (userId) {
      fetchMyVideos(userInfo);
    }
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>My Uploads</Title>
      <hr />
      <Row gutter={(32, 16)}>
        <ShowUploads VideoLists={VideoLists} refreshFunc={updateVideos} userId={userId} />
      </Row>
    </div>
  );
}

export default MyPage;
