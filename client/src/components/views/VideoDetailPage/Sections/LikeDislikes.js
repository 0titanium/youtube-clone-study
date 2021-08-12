import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Axios from "axios";
import { LIKE_SERVER } from "../../../../Config";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  // video like, reply like
  if (props.video) {
    if (props.userId === "") {
      variable = { videoId: props.videoId };
    } else {
      variable = { videoId: props.videoId, userId: props.userId };
    }
  } else {
    if (props.userId === "") {
      variable = { commentId: props.commentId };
    } else {
      variable = { commentId: props.commentId, userId: props.userId };
    }
  }

  const fetchLikesNum = (variable) => {
    Axios.post(`${LIKE_SERVER}/getLikes`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        // 좋아요 수 세팅
        setLikes(response.data.likes.length);

        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }

          return like.length;
        });
      } else {
        alert("좋아요 숫자를 불러오는데 실패했습니다.");
      }
    });
  };

  const fetchDislikesNum = (variable) => {
    Axios.post(`${LIKE_SERVER}/getDislikes`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        // 싫어요 수 세팅
        setDislikes(response.data.dislikes.length);
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("싫어요 숫자를 불러오는데 실패했습니다.");
      }
    });
  };

  const fetchLike = (variable) => {
    Axios.post(`${LIKE_SERVER}/upLike`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setLikes(Likes + 1);
        setLikeAction("liked");

        // 싫어요를 누른 경우

        if (DislikeAction !== null) {
          setDislikeAction(null);
          setDislikes(Dislikes - 1);
        }
      } else {
        alert("좋아요 숫자를 올리는데 실패했습니다.");
      }
    });
  };

  const fetchUnlike = (variable) => {
    Axios.post(`${LIKE_SERVER}/unLike`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setLikes(Likes - 1);
        setLikeAction(null);
      } else {
        alert("좋아요 숫자를 내리는데 실패했습니다.");
      }
    });
  };

  const fetchDisLike = (variable) => {
    Axios.post(`${LIKE_SERVER}/upDislike`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setDislikes(Dislikes + 1);
        setDislikeAction("disliked");

        // 싫어요를 이미 누른 경우
        if (LikeAction !== null) {
          setLikeAction(null);
          setLikes(Likes - 1);
        }
      } else {
        alert("싫어요 숫자를 올리는데 실패했습니다.");
      }
    });
  };

  const fetchUnDislike = (variable) => {
    Axios.post(`${LIKE_SERVER}/unDislike`, variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setDislikes(Dislikes - 1);
        setDislikeAction(null);
      } else {
        alert("싫어요 숫자를 내리는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    fetchLikesNum(variable);
    fetchDislikesNum(variable);
  }, []);

  const onLike = () => {
    if (props.userId !== "") {
      if (LikeAction === null) {
        fetchLike(variable);
      } else {
        fetchUnlike(variable);
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  const onDisLike = () => {
    if (props.userId !== "") {
      if (DislikeAction === null) {
        fetchDisLike(variable);
      } else {
        fetchUnDislike(variable);
      }
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {LikeAction === null ? (
            <LikeOutlined onClick={onLike} />
          ) : (
            <LikeFilled onClick={onLike} />
          )}
        </Tooltip>
        <span
          style={{ paddingLeft: "8px", paddingRight: "8px", cursor: "auto" }}
        >
          {Likes}
        </span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          {DislikeAction === null ? (
            <DislikeOutlined onClick={onDisLike} />
          ) : (
            <DislikeFilled onClick={onDisLike} />
          )}
        </Tooltip>
        <span
          style={{ paddingLeft: "8px", paddingRight: "8px", cursor: "auto" }}
        >
          {Dislikes}
        </span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
