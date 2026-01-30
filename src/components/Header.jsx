import React from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import "./Header.css";
const Header = () => {

  return (
    <div className="header">
      <h1></h1>
      <h3 className="add-btn"><MdOutlineAdminPanelSettings />Admin</h3>
    </div>
  );
};

export default Header;
