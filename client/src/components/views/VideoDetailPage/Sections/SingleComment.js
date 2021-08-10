import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";
import { getCookie } from "../../../../getCookie/getCookie";
// import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {
  const { TextArea } = Input;

  const userId = getCookie("user_id", document.cookie);

  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const fetchComments = (variables) => {
    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.CommentValue);
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

  const actions = [
    // <LikeDislikes
    //   comment
    //   commentId={props.comment._id}
    //   userId={localStorage.getItem("userId")}
    // />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to
    </span>,
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