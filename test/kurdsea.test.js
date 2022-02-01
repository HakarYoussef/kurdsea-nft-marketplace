const { assert } = require('chai');
const { default: Web3 } = require('web3');

const NFTMarketPlace = artifacts.require('NFTMarketPlace');
const NFT = artifacts.require('NFT');
require('chai').use(require('chai-as-promised')).should();

contract('NFT', (accounts) => {
  let market;
  let nftInstance;
  let nftAddress;
  let marketAddress;
  let fees;
  let items = [];
  before(async () => {
    market = await NFTMarketPlace.new();
    nftInstance = await NFT.new(market.address);
  });

  describe('development', async () => {
    it('check market fees', async () => {
      fees = await market.getMarketFees();
      const converFees = fees.toString();

      assert.equal(
        converFees,
        '10000000000000000',
        'the market fees is 10000000000000000'
      );
    });

    it('check the contract address and convert to wei', async () => {
      nftAddress = await nftInstance.address;
      marketAddress = await market.address;

      assert.notEqual(nftAddress, ' ');
      assert.notEqual(nftAddress, '0x0');
      assert.notEqual(nftAddress, 'undifined');

      assert.notEqual(marketAddress, ' ');
      assert.notEqual(marketAddress, '0x0');
      assert.notEqual(marketAddress, 'undifined');
    });

    it('Create NFTs', async () => {
      const oneEther = web3.utils.toWei('1', 'ether');
      const mySymbol = await nftInstance.symbol();
      await nftInstance.createNftToken('https://kurdsea.com/1.png');
      await nftInstance.createNftToken('https://kurdsea.com/2.png');

      await market.createItemForSale(nftAddress, 1, oneEther, { value: fees });
      await market.createItemForSale(nftAddress, 2, oneEther, { value: fees });

      items = await market.getAllUnsoldItems();
      items = await Promise.all(
        items.map(async (item) => {
          const nftUrl = await nftInstance.tokenURI(item.tokenId);

          let myItems = {
            price: item.price.toString(),
            tokenId: item.tokenId.toString(),
            nftUrl,
            owner: item.owner,
            seller: item.seller,
          };
          return myItems;
        })
      );
      console.log('My Items Are', items);
    });
  });
});
