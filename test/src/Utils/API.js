import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../context/constants';


// export const CheckIfWalletConnected = async () => {
//     try {
//         if (!window.ethereum) return console.log("Install Metamask!")

//         //GETTING ACCOUNTS ARRAY FROM ETHEREUM
//         const accounts = window.ethereum.request({
//             method: 'eth_accoutns'
//         });

//         //GETTING THE FIRST ACCOUNT FROM ACCOUNT ARRAY
//         const firstAccount = accounts[0];
//         return firstAccount;
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const ConnectWallet = async () => {
//     try {
//         if (!window.ethereum) return console.log("Install Metamask!")
//         console.log("inside connect wallet")
//         //GETTING ACCOUTNS ARRAY FROM ETHEREUM/METAMASK
//         const accounts = window.ethereum.request({
//             method: 'eth_requestAccounts'
//         });

//         //GETTING FIRST ACCOUNT FROM ACCOUNTS ARRAY
//         const firstAccount = accounts[0];
//         console.log(firstAccount)
//         return firstAccount;
//     } catch (error) {
//         console.log(error);
//     }
// };

// const FetchContract = (signerProvider) =>
//     new ethers.Contract(contractAddress, contractABI, signerProvider);

// export const ConnectWithContract = () => {
//     try {
//         //CREATING A ETHEREUM PROVIDER AND GETTING THE SIGNER
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         //SENDING THE SIGNER TO FetchContract FUNCTION TO GET THE SMART CONTRACT
//         const contract = FetchContract(signer);

//         return contract;

//     } catch (error) {
//         console.log(error);
//     }
// };

export const CreateContract = async () => {
    const prov = new ethers.providers.Web3Provider(window.ethereum);

    if (prov) {
        window.ethereum.on("chainChanged", () => {
            window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
            window.location.reload();
        });
        await prov.send("eth_requestAccounts", []);
        const signer = prov.getSigner();

        const address = await signer.getAddress();
        console.log("Currently signed in user in metamask : ", address);
        console.log("Checking ABI object : ", contractABI);
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        console.log("Checking Contract address : ", contract);

        return contract;

    }
    else {
        console.log("no provivder");
    }
};

export const MapDataToFrontend = (data) => {
    const images = data.map((item, i) => {
        return (
            <div className="single-post-container">
                <span className="account-name">USER ADDRESS:{item[0]}</span>
                <div className="image-container">
                    <img
                        key={i}
                        src={`https://gateway.pinata.cloud/ipfs/${item[1].substring(6)}`}
                        alt="new"
                        className="image-list"
                    ></img>
                    <div className="img-text-container">
                        <span className="img-text" id="img-text">{item[3]}</span>
                    </div>
                </div>
                <div className="discription">
                    <span className="discription-text">{item[2]}</span>
                </div>
                <hr />
            </div>
        );
    });

    return images;
};