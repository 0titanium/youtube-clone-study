import React, { useState } from "react";
import { Button, Input } from "antd";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { getCookie } from "../../../../utils/getCookie";
import { COMMENT_SERVER } from "../../../../Config";

function Comments(props) {
  const { TextArea } = Input;

  const [Comment, setComment] = useState("");

  const userId = getCookie("user_id", document.cookie);
  
  const fetchComments = (variables) => {
    Axios.post(`${COMMENT_SERVER}/saveComment`, variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.id);
        setComment("");
        props.refreshFunction(response.data.id);
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    });
  };

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: Comment,
      writer: userId,
      postId: props.postId,
    };

    if (userId !== "") {
      fetchComments(variables);
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <div>
      <br />
      <p> replies </p>
      <br />

      {/* Comment Lists  */}
      
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  writerId={comment.writer._id}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  writerId={comment.writer._id}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px", resize: "none" }}
          onChange={handleChange}
          value={Comment}
          placeholder="댓글을 입력하세요."
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
