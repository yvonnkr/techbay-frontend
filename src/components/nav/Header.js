import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "antd/lib/menu";
import UserAddOutlined from "@ant-design/icons/UserAddOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu
        icon={<SettingOutlined />}
        title="Username"
        className="float-right"
      >
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
