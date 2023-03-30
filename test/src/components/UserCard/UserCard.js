import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';

const UserCard = ({ readMessage, el, i, readUser }) => {
    return (
        <Link
            to={{
                pathname: "/Message",
                search: `?name=${el.name}&address=${el.userAddress}`,
            }}

            className='user-link'
        >
            <div className='main-user-card'
                onClick={() => (
                    readMessage(el.userAddress), readUser(el.userAddress)
                )}>
                <span className="user-name">{el.name}</span><br></br>
                <small className='add'>{el.userAddress}</small>
            </div>
        </Link>
    )
};

export default UserCard;
