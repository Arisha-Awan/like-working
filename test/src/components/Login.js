import React from "react";
import './Login.css'
import Navbar from "./Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e)=>{
        const name = e.target.name;//to see which input field is being targeted
        const value = e.target.value;//to get value of targeted input
        setUserLogin({...userLogin, [name] : value}) // Setting value in the varialbles
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className="container my-8">
                <div className="title">Login</div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="user-details">

                        <div className="form-group input-box">
                            <label htmlFor="email" className="reg-field-label">Account Address:</label>
                            <input type="text" name="email" id="email" className="form-control" placeholder="email@provider.com" required
                                value={userLogin.email}
                                onChange={handleInput} />
                        </div>

                        <div className="form-group input-box">
                            <label htmlFor="password" className="reg-field-label">Password :</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Enter password" autoComplete="off" required
                                value={userLogin.password}
                                onChange={handleInput} />
                        </div>

                    </div>

                    <div className="button">
                        <Link to='/inscrible'>
                            <input type="submit" name="login" value="Login" />
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;