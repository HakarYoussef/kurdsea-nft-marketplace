import { useState } from 'react/cjs/react.development';
import HeadSection from '../components/HeadSection';
import Web3 from 'web3';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import axios from 'axios';
import CardItems from '../components/CardItems';
import Link from 'next/link';
import CardItemsSold from './CardItemsSold';
import EmptyIcon from './EmptyIcon';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 43114],
});

const Creations = () => {
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [createdItems, setCreatedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [nftAddress, setNftAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [isExist, setIsExist] = useState([]);

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

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
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
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

        // console.log(account);

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

        const data = await deployedMarketContract.methods
          .getMyCreations()
          .call({ from: account });

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

        const mySoldItems = items.filter((item) => item.isSold);
        setSoldItems(mySoldItems);

        setCreatedItems(items);
      } else {
      }
    };
    web3Api.web3 && loadContracts();
  }, [account]);

  return (
    <div>
      {!createdItems.length ? (
        <div>
          <EmptyIcon />
        </div>
      ) : (
        createdItems
          .filter(
            (created) =>
              !soldItems.some((sold) => sold.itemId === created.itemId)
          )
          .map((item) => {
            return (
              <>
                <CardItems key={item.itemId} {...item} index={item.itemId} />
              </>
            );
          })
      )}
      {soldItems.map((item) => {
        return (
          <>
            <CardItemsSold key={item.itemId} {...item} index={item.itemId} />
          </>
        );
      })}
    </div>
  );
};

export default Creations;
