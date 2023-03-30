import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useLocation } from "react-router-dom";
import { Loader } from '../index';

const Chat = ({ functionName,
    readMessage,
    friendMsg,
    account,
    userName,
    isLoading,
    currentUserName,
    currentUserAddress,
    readUser,
}) => {

    //USTE STATE
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState({
        name: "",
        address: "",
    });

    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setChatData({ name: query.get("name"), address: query.get("address") });
    }, [location]);

    useEffect(() => {
        if (chatData.address) {
            readMessage(chatData.address);
            readUser(chatData.address);
        }
    }, []);

    return (
        <div className="Chat">
            {currentUserName && currentUserAddress ? (
                <div className="Chat_user_info">
                    <div className="Chat_user_info_box">
                        <h4>{currentUserName}</h4>
                        <p className="show">{currentUserAddress}</p>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="Chat_box_box">
                <div className="Chat_box">
                    <div className="Chat_box_left">
                        {friendMsg.map((el, i) => (
                            <div>
                                {el.sender == chatData.address ? (
                                    <div className="Chat_box_left_title">
                                        <span>
                                            {chatData.name} {""}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="Chat_box_left_title">
                                        <span>
                                            {userName} {""}
                                        </span>
                                    </div>
                                )}
                                <p key={i + 1}>
                                    {el.msg}
                                    {""}
                                    {""}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {currentUserName && currentUserAddress ? (
                    <div className="Chat_box_send">
                        <div className="Chat_box_send_img">
                            <input
                                type="text"
                                placeholder="type your message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            {isLoading == true ? (
                                <Loader />
                            ) : (
                                <button
                                    width={50}
                                    height={50}
                                    onClick={() =>
                                        functionName({ msg: message, address: chatData.address })
                                    }
                                    className='btn btn-primary'
                                >Send</button>
                            )}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Chat;
