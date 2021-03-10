import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Menu from "antd/lib/menu";
import UserAddOutlined from "@ant-design/icons/UserAddOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";

import { logout } from "../../actions/authActions";
import { auth } from "../../firebase";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    auth.signOut();

    dispatch(logout());

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home">
        <Link to="/">Home</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.name}
          className="float-right"
        >
          {user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
