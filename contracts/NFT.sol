// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract NFT is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private nftTokenId;

    address contractAddress;

    constructor(address marketplaceAddress)ERC721("KurdSea","KNFT"){
        contractAddress = marketplaceAddress;
    }



    function createNftToken(string memory nftTokenURl)public returns(uint256){
        nftTokenId.increment();
        uint256 id = nftTokenId.current();
        //mint
       
        _mint(msg.sender, id);
        //set URl 
        
       _setTokenURI(id,nftTokenURl);      
       //approval for all
        setApprovalForAll(contractAddress, true);

        return id;
    }

}
