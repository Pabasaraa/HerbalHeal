/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles/Header.css";

import Button from "./Button";

// Assets
import Logo from "../../Assets/Logo.png";

// React Icons
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";

// Material UI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const Menus = ["Profile", "LogOut"];

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!localStorage.getItem("token")) {
        setIsLoggedIn(false);
        return;
      }

      axios
        .post(
          "http://localhost:8000/users/validatetoken",
          {},
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
        });
    };

    checkLoginStatus();
  }, [token]);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Items",
      icon: <InfoIcon />,
    },
    {
      text: "Review",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Cart",
      icon: <ShoppingCartRoundedIcon />,
    },
  ];
  return (
    <nav
      style={{
        height: "auto",
        padding: "0 60px",
        boxShadow: "rgba(99, 99, 99, 0.1) 0px 1px 10px 0px",
      }}
    >
      <div className="nav-logo-container">
        <img
          src={Logo}
          alt=""
          onClick={() => {
            navigate("/");
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
        />
      </div>
      <div className="navbar-links-container">
        {/* Change these to buttons and use navigate('/path') for navigation */}
        <a href="">Home</a>
        <a href="/products">Items</a>
        <a href="">Review</a>
        <a href="">Contact</a>
        <a href="/cart">
          <BsCart2 className="navbar-cart-icon" />
        </a>

        {isLoggedIn ? (
          <>
            <Button
              text="Log out"
              onClick={() => {
                localStorage.clear();
                setIsLoggedIn(false);
                navigate("/login");
              }}
            />

            <img
              onClick={() => setOpen(!open)}
              src="../profile_icon.png"
              alt=""
              className="img2"
            />

            {open && (
              <div className="sub-menu">
                <ul>
                  {Menus.map((menu, icon) => (
                    <li onClick={() => setOpen(false)} key={menu}>
                      {menu}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Button
            text="Sign up"
            onClick={() => {
              navigate("/register");
            }}
          />
        )}
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Header;
