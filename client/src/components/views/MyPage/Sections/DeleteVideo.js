import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { VIDEO_SERVER } from "../../../../Config";
import Axios from "axios";

function DeleteVideo(props) {
  const videoId = props.videoId;

  const deleteInfo = {
    videoId: videoId,
  };

  const fetchDeleteVideo = (deleteInfo) => {
    Axios.post(`${VIDEO_SERVER}/deleteVideo`, deleteInfo).then((response) => {
      if (response.data.success) {
        props.refreshFunc(response.data.videos);
      }
      else{
        alert("비디오를 삭제하는데 실패했습니다.");
      }
      
    });
  };

  // modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("삭제하시겠습니까?");

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
}

export default DeleteVideo;
