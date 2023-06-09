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
    uint postCount=0;

    //CONTAINING ALL THE POSTS UPLOADED BY USERS
    struct Post{
        string name;
        address payable user;
        string imageHash;
        string description;
        string imageText;
        uint256  tipAmount;
        uint256 id;
        uint likeCount;
        string [] likedByUser;
    }

    //STRUCT CONTAINING ALL POSTS
    // struct AllPost{
    //     string name;
    //     address user;
    //     string imageHash;
    //     string description;
    //     string imageText;
    // }

    //STRUCT TO STORE MESSAGES
    struct Message{
        address sender;
        uint256 timestamp;
        string msg;
    } 

    mapping(address=>User) userList;
    AllUsers [] allusers;
    mapping(address=>Post[]) Images_List;
    Post [] allposts;
    // address [] userAddresses;
    mapping(bytes32=>Message[]) allMessages;

     //mapping for a distinct post
     mapping(uint=>Post)  onePost;

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
         postCount++;
        Post memory newPost = Post({
            name: userList[msg.sender].name,
            user: payable(msg.sender),
            imageHash: _imgHash,
            description: desc,
            imageText: imgText,
            tipAmount:0,
            id:postCount,
            likeCount:0,
            likedByUser : new string[](0)         
        });

        // AllPost memory post = AllPost({
        //     name: userList[msg.sender].name,
        //     user: msg.sender,
        //     imageHash: _imgHash,
        //     description: desc,
        //     imageText: imgText
        // });

        Images_List[msg.sender].push(newPost);
        allposts.push(newPost);
        
        onePost[postCount]=newPost;
        

        
        
     
        // bool isOldAddress = isAddressPresent(userAddresses, msg.sender);
        // if(isOldAddress == false){
        //     userAddresses.push(msg.sender);
        // }
    }



    ///like the post and send the tip
   

   function tipPostOwner(uint256 _id) external payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= postCount, "Invalid post id");
        require(allposts[_id-1].user != msg.sender, "Cannot tip your own post");
        // Fetch the post
        
        address payable user=allposts[_id-1].user;
        
        // Pay the author by sending them Ether
        user.transfer(msg.value);
        // Increment the tip amount
        allposts[_id-1].tipAmount += msg.value;
        
    }

    function checkIfLikedByExists(string[] memory likedBy, string memory username) public pure returns (bool) 
    {
        for (uint i = 0; i < likedBy.length; i++) {
           if (keccak256(bytes(likedBy[i])) == keccak256(bytes(username))) {
               return true;
            }
        }
        return false;
    }
    //increment like Count
   function incrementLike(uint  post_id) external 
   { 
     require(post_id > 0 && post_id <= postCount);
     require(allposts[post_id-1].user != msg.sender, "Cannot tip your own post");
     require(!checkIfLikedByExists(allposts[post_id-1].likedByUser,userList[msg.sender].name),"Cannot tip your own post");
        // Increment the like post
        allposts[post_id-1].likeCount++;
        // allposts[post_id-1].likedByUser[allposts[post_id-1].likeCount]=userList[msg.sender].name;
        allposts[post_id-1].likedByUser.push(userList[msg.sender].name);
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
    function getAllPosts() external view returns (Post[] memory) {
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