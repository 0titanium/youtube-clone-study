import React, { useState } from "react";
import { Comment, Avatar, Button, Input, Modal } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import { getCookie } from "../../../../utils/getCookie";
import LikeDislikes from "./LikeDislikes";
import { COMMENT_SERVER } from "../../../../Config";
import { DeleteFilled } from "@ant-design/icons";

function SingleComment(props) {
  const { TextArea } = Input;

  const userId = getCookie("user_id", document.cookie);
  const writerId = props.writerId;
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const fetchComments = (variables) => {
    Axios.post(`${COMMENT_SERVER}/saveComment`, variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.id);
      } else {
        alert("댓글 입력에 실패했습니다.");
      }
    });
  };

  const fetchDeleteComment = (variables) => {
    Axios.post(`${COMMENT_SERVER}/deleteComment`, variables).then(
      (response) => {
        if (response.data.success) {
          setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
          }, 2000);
          props.refreshFunction([]);
        } else {
          alert("댓글 삭제에 실패했습니다.");
        }
      }
    );
  };

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    if (userId !== "") {
      fetchComments(variables);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
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
    const deleteInfo = {
      writer: user.userData._id,
      postId: props.postId,
      _id: props.comment._id,
    };

    setModalText("삭제하시겠습니까?");
    setConfirmLoading(true);
    fetchDeleteComment(deleteInfo);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    
  };

  const actions = [
    <LikeDislikes comment commentId={props.comment._id} userId={userId} />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to
    </span>,
    writerId === userId && (
      <React.Fragment>
        <Button
          onClick={showModal}
          style={{
            bottom: "0px",
            left: "9rem",
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
    ),
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px", resize: "none" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="댓글을 입력하세요."
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
