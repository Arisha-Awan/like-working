import React from "react";
import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidebar = ()=>{
    return(
        <div className="main-div-sidebar">
            <div className="inscrible-title">
                <h1 id="inscrible-title-text">Inscrible</h1>
            </div>
            <hr />
            <Link to='/inscrible' className="item-link">
                <div className="item-container">
                    <span className="item"><i class="bi bi-house-fill"></i>Home</span>
                </div>
            </Link>
            <div className="item-container">
                <span className="item"><i class="bi bi-search-heart"></i>Search</span>
            </div>
            <div className="item-container">
                <span className="item"><i class="bi bi-person-video2"></i>Reels</span>
            </div>
            <div className="item-container">
                <span className="item"><i class="bi bi-send-fill"></i>Messages</span>
            </div>
            <div className="item-container">
                <span className="item"><i class="bi bi-bell-fill"></i>Notifications</span>
            </div>
            <Link to='/new-post' className="item-link">
                <div className="item-container">
                    <span className="item"><i class="bi bi-plus-square-fill"></i>Create</span>
                </div>
            </Link>
            <div className="item-container">
                <span className="item"><i class="bi bi-person-circle"></i>Profile</span>
            </div>
        </div>
    )
}

export default Sidebar;