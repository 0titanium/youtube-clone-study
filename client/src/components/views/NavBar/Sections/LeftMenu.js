import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Videos</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/subscription">Subscriptions</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
