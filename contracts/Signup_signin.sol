//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract Signup_signin {
    
    uint public imageCount=0;
    struct Post{
        address user;
        string imageHash;
        string description;
        string imageText;
    } 
    mapping(address=>Post[]) Images_List;
    address [] userAddresses;

    function addPostImage(string memory _imgHash, string memory desc, string memory imgText) public 
    {   
        require(bytes(_imgHash).length > 0);
        Post memory newPost = Post({
            user: msg.sender,
            imageHash: _imgHash,
            description: desc,
            imageText: imgText
        });

        Images_List[msg.sender].push(newPost);
        imageCount++;
        bool isOldAddress = isAddressPresent(userAddresses, msg.sender);
        if(isOldAddress == false){
            userAddresses.push(msg.sender);
        }
    }

    function isAddressPresent(address[] memory userAddress, address addressToCheck) public pure returns (bool) {
        for (uint i = 0; i < userAddress.length; i++) {
            if (userAddress[i] == addressToCheck) {
                return true;
            }
        }
        return false;
    }

    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](imageCount);
        uint currentIndex = 0;
        for (uint i = 0; i < userAddresses.length; i++) {
            Post[] memory userPosts = Images_List[userAddresses[i]];
            for (uint j = 0; j < userPosts.length; j++) {
                allPosts[currentIndex] = userPosts[j];
                currentIndex++;
            }
        }

        return allPosts;
    }
    
    receive() external payable {}
}