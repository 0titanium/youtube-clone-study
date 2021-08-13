/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../_actions/user_action";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getCookie } from "../../../../utils/getCookie";
import Axios from "axios";
import { USER_SERVER } from "../../../../Config";

function RightMenu(props) {
  const userId = getCookie("user_id", document.cookie);
  const dispatch = useDispatch();
  const [UserName, setUserName] = useState("");
  const [UserImage, setUserImage] = useState("");

  const userInfo = {
    userId: userId,
  };

  const fetchUser = (userInfo) => {
    Axios.post(`${USER_SERVER}/getInfo`, userInfo).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setUserName(response.data.userName);
        setUserImage(response.data.userImage);
      } else {
        alert("사용자 정보를 불러오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userInfo);
    } else {
      setUserName("");
      setUserImage("");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSuccess) {
        props.history.push("/login"); // withRouter 필요
      } else {
        alert("Error");
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/mypage">My Page</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  if (!userId) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/video/upload">Upload</a>
        </Menu.Item>
        {/* avatar + name - click - dropdown - mypage, logout */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar src={UserImage} style={{ marginRight: "7px" }} />
            <p style={{ display: "inline" }}>{UserName}</p>
            <DownOutlined style={{ marginLeft: "5px" }} />
          </a>
        </Dropdown>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
