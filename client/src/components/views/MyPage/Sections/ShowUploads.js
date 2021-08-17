import React, { useState, useEffect } from "react";
import { VIDEO_SERVER } from "../../../../Config";
import Axios from "axios";
import { Col, Avatar, Card, Button, Modal } from "antd";
import moment from "moment";
import { DeleteFilled } from "@ant-design/icons";

function ShowUploads(props) {
  const { Meta } = Card;
  const [Videos, setVideos] = useState([]);
  const userId = props.userId;
  const userInfo = {
    userId: userId,
  };

  // get videos
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

  // delete video
  const fetchDeleteVideo = (deleteInfo) => {
    Axios.post(`${VIDEO_SERVER}/deleteVideo`, deleteInfo).then((response) => {
      if (response.data.success) {
        fetchMyVideos(userInfo);
      } else {
        alert("비디오를 삭제하는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    if (userId) {
      fetchMyVideos(userInfo);
    }
  }, []);

  // modal

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("삭제하시겠습니까?");

  const deleteComponent = (videoId) => {
    const deleteInfo = {
      videoId: videoId,
    };

    const showModal = () => {
      setVisible(true);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const handleOk = () => {
      setModalText("삭제하시겠습니까?");
      setConfirmLoading(true);
      fetchDeleteVideo(deleteInfo);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };

    return (
      <React.Fragment>
        <Button
          onClick={showModal}
          style={{
            bottom: "1px",
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
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </React.Fragment>
    );
  };

  const renderCards = Videos.reverse().map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={video._id} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className="duration"
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
        {deleteComponent(video._id)}
      </Col>
    );
  });

  return (
    <React.Fragment>
      {Videos !== [] && renderCards}
    </React.Fragment>
  );
}

export default ShowUploads;
