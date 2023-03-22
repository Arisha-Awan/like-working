import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = ()=>{
    return(
        <div className="main-div-navbar">
            <nav className="nav">
                <div className="nav-left">
                    <span className="skew gradient">
                        <h1 className="nav-heading unskew">Inscrible</h1>
                    </span>
                </div>                    
                <div className="nav-right">
                    <span className="skew">
                        <Link to='/' className="nav-link unskew">
                            <span className="nav-list-item">Home</span>
                        </Link>
                    </span>
                    <span className="skew">
                        <Link to='/Registration' className="nav-link unskew">
                            <span className="nav-list-item">Registration</span>
                        </Link>
                    </span>
                    <span className="skew">
                        <Link to='/Login' className="nav-link unskew">
                            <span className="nav-list-item">Login</span>
                        </Link>
                    </span>                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar;