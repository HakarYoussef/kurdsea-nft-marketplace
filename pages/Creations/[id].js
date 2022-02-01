import { useState } from 'react/cjs/react.development';
import Web3 from 'web3';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  BtnWrapper,
  Description,
  DetailPageContainer,
  DetailPageLeftSide,
  DetailPageRightSide,
  ImageWrapper,
  Owner,
  OwnerAndSellerContainer,
  OwnerWrapper,
  Price,
  PriceAndBtnContainer,
  PriceWrapper,
  Seller,
  SellerWrapper,
  Title,
} from '../../styles/DetailsPage.style';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 43114],
});

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

const ItemDetailPage = ({ params }) => {
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [account, setAccount] = useState(null);
  const [isAllreadyBought, setIsAllreadyBought] = useState(null);
  const [nftAddress, setNftAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  const router = useRouter();
  //   const rauter = useRouter();
  //   const itemId = rauter.query.id;

  //   console.log('itemId', itemId);

  const { id } = params;

  const { active, uAccount, library, connector, activate, deactivate } =
    useWeb3React();
  const providerChanged = (provider) => {
    provider.on('accountsChanged', (_) => window.location.reload());
    provider.on('chainChanged', (_) => window.location.reload());
  };

  if (typeof window !== 'undefined') {
    var acc = localStorage.getItem('uAccount');
  } else {
    console.log('You are on the server');
  }

  const loadrovider = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      providerChanged(provider);
      setWeb3Api({
        provider,
        web3: new Web3(provider),
      });
      provider.request({ method: 'eth_requestAccounts' });
    } else {
    }
  };

  async function connectOnLoad() {
    try {
      //here we use activate to create the connection
      await activate(injected);
      connected = true;
    } catch (ex) {
      console.log(ex);
    }

    //we use web3.eth to get the accounts to store it in local storage
    // var accounts1 = await web3Api.web3.eth.getAccounts();
    // acc = localStorage.setItem('uAccount', accounts1);
  }

  useEffect(() => {
    if (acc != null) {
      connectOnLoad();
    }
    loadrovider();
  }, []);

  //Load Accounts

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      setIsAllreadyBought(accounts[0]);
    };
    web3Api.web3 && loadAccount();
  }, [web3Api.web3]);

  async function connectOnClick() {
    if (localStorage.getItem('uAccount') == null) {
      console.log('Loading...');
      try {
        await activate(injected);
      } catch (ex) {
        console.log(ex);
      }
      // window.location.reload();
      var accounts1 = await web3Api.web3.eth.getAccounts();

      acc = localStorage.setItem('uAccount', accounts1);
      console.log(acc);
      setTimeout(function () {}, 1600); //wait 2 seconds
    } else {
      disconnect();
    }
  }

  async function disconnect() {
    try {
      console.log('trying');
      deactivate();
      localStorage.removeItem('uAccount');
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const loadContracts = async () => {
      //Json File

      const nftContractFile = await fetch('/abis/NFT.json');
      const marketContractFile = await fetch('/abis/NFTMarketPlace.json');
      //Convert to Json
      const convertNftCFile = await nftContractFile.json();
      const convertMarketCFile = await marketContractFile.json();
      //Get Abi
      const NFTAbi = convertNftCFile.abi;
      const MarketAbi = convertMarketCFile.abi;

      const networkId = await web3Api.web3.eth.net.getId();

      const nftNetworkObject = convertNftCFile.networks[networkId];

      const marketNetworkObject = convertMarketCFile.networks[networkId];

      if (nftNetworkObject && marketNetworkObject) {
        const nftAddress = nftNetworkObject.address;
        setNftAddress(nftAddress);
        const marketAddress = marketNetworkObject.address;
        setMarketAddress(marketAddress);

        const deployedNftContract = await new web3Api.web3.eth.Contract(
          NFTAbi,
          nftAddress
        );
        setNftContract(deployedNftContract);
        const deployedMarketContract = await new web3Api.web3.eth.Contract(
          MarketAbi,
          marketAddress
        );

        setMarketContract(deployedMarketContract);

        // Fetching unSold Data
        const data = await deployedMarketContract.methods
          .getAllUnsoldItems()
          .call();

        const items = await Promise.all(
          data.map(async (item) => {
            const nftUrl = await deployedNftContract.methods
              .tokenURI(item.tokenId)
              .call();

            const priceToWei = Web3.utils.fromWei(
              item.price.toString(),
              'ether'
            );

            const metaData = await axios.get(nftUrl);

            //Todo fix this object
            let myItems = {
              price: priceToWei,
              itemId: item.id,
              isSold: item.isSold,
              owner: item.owner,
              seller: item.seller,
              image: metaData.data.image,
              title: metaData.data.title,
              description: metaData.data.description,
            };
            return myItems;
          })
        );

        // Fetching Sold Data

        const SoldData = await deployedMarketContract.methods
          .getAllSoldItems()
          .call();

        const SoldItems = await Promise.all(
          SoldData.map(async (SoldItem) => {
            const SoldNftUrl = await deployedNftContract.methods
              .tokenURI(SoldItem.tokenId)
              .call();

            const priceToWei = Web3.utils.fromWei(
              SoldItem.price.toString(),
              'ether'
            );

            const SoldMetaData = await axios.get(SoldNftUrl);

            //Todo fix this object
            let mySoldItems = {
              price: priceToWei,
              itemId: SoldItem.id,
              isSold: SoldItem.isSold,
              owner: SoldItem.owner,
              seller: SoldItem.seller,
              image: SoldMetaData.data.image,
              title: SoldMetaData.data.title,
              description: SoldMetaData.data.description,
            };
            return mySoldItems;
          })
        );
        setSoldItems(SoldItems);
        setUnsoldItems(items);
      } else {
      }
    };
    web3Api.web3 && loadContracts();
  }, [web3Api.web3]);

  /////////////Buy Function

  const buyNFT = async (nftItem) => {
    const priceToWei = Web3.utils.toWei(nftItem.price.toString(), 'ether');

    const convertIdToInt = Number(nftItem.itemId);

    const result = await marketContract.methods
      .createMarketforSale(nftAddress, convertIdToInt)
      .send({ from: account, value: priceToWei });

    // router.push('/' + nftItem.itemId + '/Sold');
    router.push('/');
  };

  return (
    <>
      {unsoldItems
        .filter((item) => item.itemId == id)
        .map((item) => {
          return (
            <>
              <DetailPageContainer key={item.itemId}>
                <DetailPageLeftSide>
                  <Title>{item.title}</Title>
                  <p>Description</p>
                  <Description>{item.description}</Description>
                  <OwnerAndSellerContainer>
                    <SellerWrapper>
                      <p>Creator</p>
                      <Seller>
                        {item.seller &&
                          `${item.seller.slice(0, 6)}...${item.seller.slice(
                            item.seller.length - 4,
                            item.seller.length
                          )}`}
                      </Seller>
                    </SellerWrapper>
                    <OwnerWrapper>
                      <p>Owner</p>
                      <Owner>
                        {item.owner ==
                        '0x0000000000000000000000000000000000000000' ? (
                          <>
                            <h4>
                              {item.seller &&
                                `${item.seller.slice(
                                  0,
                                  6
                                )}...${item.seller.slice(
                                  item.seller.length - 4,
                                  item.seller.length
                                )}`}
                            </h4>
                          </>
                        ) : (
                          <>
                            <h4>
                              {item.owner &&
                                `${item.owner.slice(0, 6)}...${item.owner.slice(
                                  item.owner.length - 4,
                                  item.owner.length
                                )}`}
                            </h4>
                          </>
                        )}
                      </Owner>
                    </OwnerWrapper>
                  </OwnerAndSellerContainer>

                  <PriceWrapper>
                    <p>Price</p>
                    <Price>{item.price} Ξ</Price>
                  </PriceWrapper>

                  {account === item.seller ? (
                    ''
                  ) : (
                    <BtnWrapper>
                      <button onClick={() => buyNFT(item)}>BUY</button>
                    </BtnWrapper>
                  )}
                </DetailPageLeftSide>
                <DetailPageRightSide>
                  <ImageWrapper>
                    <img src={item.image} alt="" />
                  </ImageWrapper>
                </DetailPageRightSide>
              </DetailPageContainer>
              {/* {item.isSold === true ? <p>{item.owner} bought it</p> : ''} */}
            </>
          );
        })}
      {soldItems
        .filter((item) => item.itemId == id)
        .map((item) => {
          return (
            <>
              <DetailPageContainer key={item.itemId}>
                <DetailPageLeftSide>
                  <Title>{item.title}</Title>
                  <p>Description</p>
                  <Description>{item.description}</Description>
                  <OwnerAndSellerContainer>
                    <SellerWrapper>
                      <p>Creator</p>
                      <Seller>
                        {item.seller &&
                          `${item.seller.slice(0, 6)}...${item.seller.slice(
                            item.seller.length - 4,
                            item.seller.length
                          )}`}
                      </Seller>
                    </SellerWrapper>
                    <OwnerWrapper>
                      <p>Owner</p>
                      <Owner>
                        {item.owner ==
                        '0x0000000000000000000000000000000000000000' ? (
                          <>
                            <h4>
                              {item.seller &&
                                `${item.seller.slice(
                                  0,
                                  6
                                )}...${item.seller.slice(
                                  item.seller.length - 4,
                                  item.seller.length
                                )}`}
                            </h4>
                          </>
                        ) : (
                          <>
                            <h4>
                              {item.owner &&
                                `${item.owner.slice(0, 6)}...${item.owner.slice(
                                  item.owner.length - 4,
                                  item.owner.length
                                )}`}
                            </h4>
                          </>
                        )}
                      </Owner>
                    </OwnerWrapper>
                  </OwnerAndSellerContainer>

                  <PriceWrapper>
                    <p>Price</p>
                    <Price>{item.price} Ξ</Price>
                  </PriceWrapper>

                  {account === item.seller ? (
                    ''
                  ) : isAllreadyBought === item.owner ? (
                    ''
                  ) : (
                    <BtnWrapper>
                      <button onClick={() => buyNFT(item)}>BUY</button>
                    </BtnWrapper>
                  )}
                </DetailPageLeftSide>
                <DetailPageRightSide>
                  <ImageWrapper>
                    <img src={item.image} alt="" />
                  </ImageWrapper>
                </DetailPageRightSide>
              </DetailPageContainer>
              {/* {item.isSold === true ? <p>{item.owner} bought it</p> : ''} */}
            </>
          );
        })}
    </>
  );
};

export default ItemDetailPage;
