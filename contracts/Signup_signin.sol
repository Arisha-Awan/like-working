//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract Signup_signin {
    //mapping of User to email
    // mapping(address => User) public users;
    

    //  mapping(address=>string[]) Description_List;

    // address[] public addresses;

    // struct User {
    //     string name;
    //     string email;
    //     bytes32 password;
    //     bool isVerified;
    //     address u_address;
    // }

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
        // Make sure the image hash exists
        require(bytes(_imgHash).length > 0);
       // Make sure image description exists
    //    require(bytes(_description).length > 0);
    //    // Make sure uploader address exists
    //    require(msg.sender!=address(0));


    // Add Image to the contract
    
        // Post_List[msg.sender].push(Post(_imgHash,_description,0));
        // count=count+1;

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

    // function getPostbyAddress(address _userAddress) external view returns(string [] memory)
    // {
    //     return Images_List;
    // }
    
   

    // function addPostDescription(string memory _postDesc) external
    // {   
    //     // Make sure the post exists
    //     require(bytes(_postDesc).length > 0);
      
    //     Description_List[msg.sender].push(_postDesc);
    // }

    


    // function getDescPostbyAddress(address _userAddress) external view returns(string [] memory)
    // {
    //    return Description_List[_userAddress];
    // }




    // function signup(
    //     string memory _name,
    //     string memory _email,
    //     string memory _password
    // ) public {
    
    //     require(!isUserExist(msg.sender), "User already exists");

    //     // Hash the password for storage
    //     bytes32 passwordHash = sha256(abi.encodePacked(_password));
    //     users[msg.sender].name = _name;
    //     users[msg.sender].email = _email;
    //     users[msg.sender].password = passwordHash;
    //     users[msg.sender].isVerified = true;
    //     users[msg.sender].u_address=msg.sender;
    //     addresses.push(msg.sender);
    // }

    // function getAddresses() public view returns(address[] memory)
    // {   
    //     return addresses;
    // }

//     function getUserByAddress(address _address) public view returns(User memory)
//     {   
//         require(isUserExist(_address),"user not exist");
        
//          return users[_address];       
//     }
//    function isUserExist(address _address) public view returns(bool)
//    {
//        return users[_address].isVerified;

//    }
    // function updateProfile(string memory _name, string memory _email, string memory _password) public {
  

    // function signin(address _address, string memory _password)
    //     public
    //     view
    //     returns (bool)
    // {
        
    //     bool _check = false;
    //     if (!isUserExist(_address)) {
    //         _check = false;
    //         return _check;
    //     }
    //     if(msg.sender == _address){
    //         bytes32 passwordHash = sha256(abi.encodePacked(_password));
    //         if (users[_address].password == passwordHash ) {
    //         _check = true;
    //         }
    //     }
    //     else
    //     {
    //         _check=false;
    //     }
    //     return _check;
    // }
    receive() external payable {}
}