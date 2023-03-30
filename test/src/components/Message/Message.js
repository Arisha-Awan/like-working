import React, { useContext } from 'react';
import './Message.css';
import { UserCard, Chat, Sidebar } from '../index';
import { InscribleContext } from '../../context/Context';

const Message = () => {

    const {
        sendMessage,
        account,
        userList,
        readMessage,
        userName,
        isLoading,
        friendMsg,
        currentUserName,
        currentUserAddress,
        readUser,
    } = useContext(InscribleContext);

    return (
        <>
            <Sidebar />
            <div className="container usr-container">
                {userList.map((el, i) => (
                    <UserCard
                        key={i + 1}
                        el={el}
                        i={i}
                        readMessage={readMessage}
                        readUser={readUser}
                    />
                ))}
            </div>
            <div className="container cht-container">
                <Chat
                    functionName={sendMessage}
                    readMessage={readMessage}
                    friendMsg={friendMsg}
                    account={account}
                    userName={userName}
                    loading={isLoading}
                    currentUserName={currentUserName}
                    currentUserAddress={currentUserAddress}
                    readUser={readUser}
                />
            </div>
        </>
    )
};

export default Message;
