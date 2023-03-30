import React, { useContext, useState } from "react";
import { Sidebar, Loader,Error, Model } from '../index';
import { InscribleContext } from '../../context/Context';
import './Post.css';

const Post = () => {

    const { appData, isLoading, account, ConnectWallet, userName, error, createAccount } = useContext(InscribleContext);
    const [openModel, setOpenModel] = useState(false);

    return (
        <>
            <Sidebar />
            <div className="post-main-container container">
                {!isLoading ?
                appData
                    // <span>testing</span>
                    : <Loader />}
            </div>

            <div className="connect-create-btn">
                {account === "" ? (
                    <button onClick={() => ConnectWallet()}>
                        {""}
                        <span>Connect Wallet</span>
                    </button>
                ) : (
                    <button onClick={() => setOpenModel(true)}>
                        {/* {""}
                        <img
                            src={userName ? images.accountName : images.create2}
                            alt="Account "
                            width={20}
                            height={20}
                        />
                        {""} */}
                        <small>{userName || "Create Account"}</small>
                    </button>
                )}
            </div>
            {openModel && (
                <div className="modelBox">
                    <Model
                        openBox={setOpenModel}
                        functionName={createAccount}
                        address={account}
                    />
                </div>
            )}{" "}
            {error === "" ? "" : <Error error={error} />}
        </>
    )
}

export default Post;