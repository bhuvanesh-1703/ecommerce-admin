import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Users from "./users";
import { TbCategoryPlus } from "react-icons/tb";
import "./Sidebar.css";

const Sidebar = () => {
    const iconStyle = { marginRight: "10px" };
    const navigate = useNavigate()

    return (
        <div className="sidebar" style={{backgroundColor:"#F3F4F4"}}>
            <h2>Ours</h2>


            <ul className="sidebar-menu">

                <li  >
                    <RxDashboard style={iconStyle} /> Dashboard
                </li>
                <li onClick={() => navigate("/admin/category")}><TbCategoryPlus style={iconStyle} />Category</li>

                <li onClick={() => navigate("/admin/product")}> <MdOutlineProductionQuantityLimits style={{ marginRight: "5px" }} />

                    Product
                </li>

                <li onClick={() => navigate("/admin/order")}>
                    <MdBorderColor style={iconStyle} /> Orders
                </li>

                <li onClick={() => navigate("/admin/users")}>
                    <FaUsers style={iconStyle} /> Users
                </li>

                <li>
                    <IoSettingsSharp style={iconStyle} /> Settings
                </li>

                <li>
                    <IoMdLogOut style={iconStyle} /> Log Out
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
