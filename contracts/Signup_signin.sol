//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract Signup_signin {
    //SINGLE USER MAPPING
    struct User{
        string name;
        address userAddress;
    }

    //CONTAINING ALL USERS REGISTERED/CREATED ACCOUNT IN APP
    struct AllUsers{
        string name;
        address userAddress;
    }
    
    //POST COUNT
    uint public imageCount=0;

    //CONTAINING ALL THE POSTS UPLOADED BY USERS
    struct Post{
        string name;
        address user;
        string imageHash;
        string description;
        string imageText;
    }

    //STRUCT CONTAINING ALL POSTS
    struct AllPost{
        string name;
        address user;
        string imageHash;
        string description;
        string imageText;
    }

    //STRUCT TO STORE MESSAGES
    struct Message{
        address sender;
        uint256 timestamp;
        string msg;
    } 

    mapping(address=>User) userList;
    AllUsers [] allusers;
    mapping(address=>Post[]) Images_List;
    AllPost [] allposts;
    // address [] userAddresses;
    mapping(bytes32=>Message[]) allMessages;

    //CHECK IS A USER HAS AN ACCOUNT
    function checkUser(address key) public view returns(bool){
        return bytes(userList[key].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name) external {
        require(checkUser(msg.sender) == false, "User alredy has an account!");
        require(bytes(name).length > 0, "User name should not be empty!");

        userList[msg.sender].name = name;
        allusers.push(AllUsers(name, msg.sender));
    }

    //GET CURRENTLY LOGGED IN USER'S NAME
    function getUserName(address key) external view returns(string memory){
        require(checkUser(key), "User not registered!");
        return userList[key].name;
    }

    //TO GET THE CHAT CODE--> WILL DIFFERENTIATE CHAT BETWEEN DIFFERENT USERS
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else 
        return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //SEND MESSAGES
    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkUser(msg.sender), "Create an account first");
        require(checkUser(friend_key), "User is not registered");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        Message memory newMsg = Message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSAGES
    function readMessage(address friend_key) external view returns(Message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    //TO GET ALL THE REGISTERED USERS
    function getAllAppUser() public view returns(AllUsers[] memory){
        return allusers;
    }

    //TO POST IMAGES TO BLOCKCHAIN
    function addPostImage(string memory _imgHash, string memory desc, string memory imgText) public 
    {   
        require(checkUser(msg.sender), "User not registered!");
        require(bytes(_imgHash).length > 0);
        Post memory newPost = Post({
            name: userList[msg.sender].name,
            user: msg.sender,
            imageHash: _imgHash,
            description: desc,
            imageText: imgText
        });

        AllPost memory post = AllPost({
            name: userList[msg.sender].name,
            user: msg.sender,
            imageHash: _imgHash,
            description: desc,
            imageText: imgText
        });

        Images_List[msg.sender].push(newPost);
        allposts.push(post);
        imageCount++;
        // bool isOldAddress = isAddressPresent(userAddresses, msg.sender);
        // if(isOldAddress == false){
        //     userAddresses.push(msg.sender);
        // }
    }

    function isAddressPresent(address[] memory userAddress, address addressToCheck) public pure returns (bool) {
        for (uint i = 0; i < userAddress.length; i++) {
            if (userAddress[i] == addressToCheck) {
                return true;
            }
        }
        return false;
    }

    //RETURNS ALL POSTS UPLOADED TILL NOW
    function getAllPosts() external view returns (AllPost[] memory) {
        // Post[] memory allPosts = new Post[](imageCount);
        // uint currentIndex = 0;
        // for (uint i = 0; i < userAddresses.length; i++) {
        //     Post[] memory userPosts = Images_List[userAddresses[i]];
        //     for (uint j = 0; j < userPosts.length; j++) {
        //         allPosts[currentIndex] = userPosts[j];
        //         currentIndex++;
        //     }
        // }
        require(allposts.length > 0, "No posts");
        return allposts;
    }

    receive() external payable {}
}