import React, { useContext } from "react";
import {Sidebar, Loader} from '../index';
import {InscribleContext} from '../../context/Context';
import './Post.css';

const Post = () => {

    const {appData, isLoading} = useContext(InscribleContext);
    return (
        <>
            <Sidebar />
            <div className="post-main-container container">
                {!isLoading ? 
                    appData
                    // <span>testing</span>
                    : <Loader/>}
            </div>
        </>
    )
}

export default Post;