import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {Backdrop} from "@mui/material"
import img from "../../../images/profile.png";
import { Dashboard, Person, ExitToApp, ListAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {logout} from "../../../redux/features/authSlice";
import "./UserOptions.css"


const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

 
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "profile", func: account },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: "20"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar ? user.avatar.url : img }
            alt="Profile"
            
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
