import React, { useState, useEffect } from "react";
import Axios from "axios";
import { VIDEO_SERVER } from "../../../Config";
import { getCookie } from "../../../utils/getCookie";
import { Typography, Row, Col, Avatar, Card, Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import moment from "moment";

function MyPage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const [Videos, setVideos] = useState([]);
  const userId = getCookie("user_id", document.cookie);
  const userInfo = {
    userId: userId,
  };

  // modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("삭제하시겠습니까?");
  const fetchMyVideos = (userInfo) => {
    Axios.post(`${VIDEO_SERVER}/getMyVideos`, userInfo).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideos(response.data.videos);
      } else {
        alert("비디오를 가져오는데 실패했습니다.");
      }
    });
  };

  const fetchDeleteVideo = (deleteInfo) => {
    Axios.delete(`${VIDEO_SERVER}/deleteVideo`, deleteInfo).then((response) => {
      if (!response.data.success) {
        alert("비디오를 삭제하는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    if (userId) {
      fetchMyVideos(userInfo);
    }
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = (videoId) => {
    const deleteInfo = {
      videoId: videoId,
    };

    setModalText("삭제하시겠습니까?");
    setConfirmLoading(true);
    fetchDeleteVideo(deleteInfo);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const renderCards = Videos.reverse().map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span> {video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        <Button
          onClick={showModal}
          style={{
            bottom: "3px",
            right: "8px",
            position: "absolute",
            color: "red",
          }}
        >
          <DeleteFilled />
        </Button>
        <Modal
          title="Delete"
          visible={visible}
          // onOk={handleOk(video._id)}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>My Uploads</Title>
      <hr />
      <Row gutter={(32, 16)}>{Videos !== [] && renderCards}</Row>
    </div>
  );
}

export default MyPage;
