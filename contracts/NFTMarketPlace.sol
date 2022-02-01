// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarketPlace is ReentrancyGuard{
    uint256 private marketFees = 0.010 ether;
    address payable owner;

    using Counters for Counters.Counter;
    Counters.Counter private itemId;
    Counters.Counter private itemSold;

    constructor(){
        owner = payable(msg.sender);
    }

    struct NftMarketItem{
        address nftContract;
        uint256 id;
        uint256 tokenId;
         address payable owner;
        address payable seller;
        uint256 price;
        bool isSold;
    }

    event NftMarketItemCreated(
        address indexed nftContract,
        uint256 indexed id,
        uint256 tokenId,
        address owner,
        address seller,
        uint256 price,
        bool isSold
    );

    function getMarketFees()public view returns(uint256){
        return marketFees;
    }
    ///////////////////////////
    mapping(uint256=>NftMarketItem) private idForMarketItem;
    ///////////////////////////

    function createItemForSale(address nftContract, uint256 tokenId,uint256 price )public payable nonReentrant{
        require(price > 0, "Price should be more than 1");
        require(tokenId > 0, "Token ID should be more than 1");
        require(msg.value == marketFees, "The market fees is 0.010 Ether");
        require(nftContract != address(0), "Address should not be equal 0x0");
        itemId.increment();
        uint256 id = itemId.current();

        idForMarketItem[id] = NftMarketItem(
            nftContract,
            id,
            tokenId,
            payable (address(0)),
            payable (msg.sender),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NftMarketItemCreated(nftContract, id, tokenId, address(0), msg.sender, price, false);
    }
    //Create Market

    function createMarketforSale(address nftContract,uint256 nftItemId )public payable nonReentrant{
        uint256 price = idForMarketItem[nftItemId].price;
        uint256 tokenId = idForMarketItem[nftItemId].tokenId;

        require(msg.value == price, "Price value should be equal to item price");
        idForMarketItem[nftItemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId); //buy
        idForMarketItem[nftItemId].owner = payable(msg.sender);
        idForMarketItem[nftItemId].isSold = true;
        payable(owner).transfer(marketFees);
        itemSold.increment();

    }
    //My Items => sold, on sale, buy
      function getMyCreations() public view returns(NftMarketItem[] memory){
        uint256 totalItemsCount = itemId.current(); 
        uint myItemsCount= 0;
        uint myCurrenIndex = 0;

        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].seller == msg.sender){
                myItemsCount +=1;
            }
        }
        NftMarketItem [] memory nftItems = new  NftMarketItem[](myItemsCount);
        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].seller==msg.sender){
              uint currentId = i+1;
              NftMarketItem  storage currentItems = idForMarketItem[currentId];  
              nftItems[myCurrenIndex] = currentItems;
              myCurrenIndex += 1;
            }
        }

        return nftItems;
    }
    //Create my purchased NFT items

        function getMyPurchasedNFTs() public view returns(NftMarketItem[] memory){
        uint256 totalItemsCount = itemId.current(); 
        uint myItemsCount= 0;
        uint myCurrenIndex = 0;

        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].owner == msg.sender){
                myItemsCount +=1;
            }
        }
        NftMarketItem [] memory nftItems = new  NftMarketItem[](myItemsCount);
        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].owner==msg.sender){
              uint currentId = i+1;
              NftMarketItem  storage currentItems = idForMarketItem[currentId];  
              nftItems[myCurrenIndex] = currentItems;
              myCurrenIndex += 1;
            }
        }

        return nftItems;
    }
    //Fetch all unsold items

    function getAllUnsoldItems()public view returns(NftMarketItem[] memory){

        uint256 totalItemsCount = itemId.current(); 
        uint myItemsCount= itemId.current() - itemSold.current();
        uint myCurrenIndex = 0;

          NftMarketItem [] memory nftItems = new  NftMarketItem[](myItemsCount);
        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].owner==address(0)){
              uint currentId = i+1;
              NftMarketItem  storage currentItems = idForMarketItem[currentId];  
              nftItems[myCurrenIndex] = currentItems;
              myCurrenIndex += 1;
            }
        }

        return nftItems;

    }

     function getAllSoldItems()public view returns(NftMarketItem[] memory){

        uint256 totalItemsCount = itemSold.current(); 
        uint myItemsCount=  itemSold.current();
        uint myCurrenIndex = 0;

          NftMarketItem [] memory nftItems = new  NftMarketItem[](myItemsCount);
        for (uint i = 0; i < totalItemsCount; i++) {
            if(idForMarketItem[i+1].owner!=address(0)){
              uint currentId = i+1;
              NftMarketItem  storage currentItems = idForMarketItem[currentId];  
              nftItems[myCurrenIndex] = currentItems;
              myCurrenIndex += 1;
            }
        }

        return nftItems;

    }

    

    
}