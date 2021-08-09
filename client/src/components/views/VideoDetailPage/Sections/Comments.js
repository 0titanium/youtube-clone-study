import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
// import SingleComment from "./SingleComment";
// import ReplyComment from "./ReplyComment";
const { TextArea } = Input;

function Comments(props) {
  const [Comment, setComment] = useState("");

  const getCookie = (name, cookies) => {
    const searchName = name + "=";
    const searchNameLength = searchName.length;
    const nameIndexStart = cookies.indexOf(searchName);
    const Cookieval = cookies.substring(nameIndexStart + searchNameLength);

    return Cookieval;
  };

  const userId = getCookie("user_id", document.cookie);

  const fetchComments = (variables) => {
    axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
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

    if(userId === undefined){
        alert("로그인이 필요한 기능입니다.");
    }

    const variables = {
      content: Comment,
      writer: userId,
      postId: props.postId,
    };

    // fetchComments(variables);
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {/* {console.log(props.CommentLists)}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )} */}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px", resize: "none" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
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
