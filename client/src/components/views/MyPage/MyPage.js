import React, { useState, useEffect } from "react";
import Axios from "axios";
import { VIDEO_SERVER } from "../../../Config";
import { Typography, Row, Col, Avatar, Card } from "antd";

function MyPage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const [Videos, setVideo] = useState([]);

  // const fetchMyVideos = () => {
  //   Axios.get(`${VIDEO_SERVER}/getMyVideos`).then((response) => {
  //     if (response.data.success) {
  //       console.log(response.data);
  //       setVideo(response.data.videos);
  //     } else {
  //       alert("비디오를 가져오는데 실패했습니다.");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   fetchMyVideos();
  // }, []);

  const renderCards = () => {};

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>My Uploads</Title>
      <hr />
      <Row gutter={(32, 16)}>{Videos !== [] && renderCards}</Row>
    </div>
  );
}

export default MyPage;
