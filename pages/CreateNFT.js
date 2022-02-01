import React, { useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import detectEthereumProvider from '@metamask/detect-provider';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import {
  CreateNftContainer,
  DescInput,
  InputWrapper,
  PriceInput,
  TitleInput,
  UploadWrapper,
  CreateNftInnerContainer,
  MintBtn,
  UploadedImagePrev,
} from '../styles/CreateNFT.style';
import ImgSpinner from '../components/ImgSpinner';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import SucceedCard from '../components/SucceedCard';

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');

const CreateNft = () => {
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [uploaded, setUploaded] = useState(true);
  const [txnConfirmed, setTxnConfirmed] = useState(true);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  const router = useRouter();

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

  const [urlHash, setUrlHash] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);

  const onChange = async (e) => {
    const file = e.target.files[0];
    setIsImageLoading(true);
    try {
      const addFile = await ipfsClient.add(file);
      console.log(addFile.path);
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${addFile.path}`;
      setUrlHash(ipfsUrl);
      setIsImageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [nftFormInput, setNftFormInput] = useState({
    title: '',
    price: '',
    description: '',
  });

  const createMarketItem = async () => {
    const { title, price, description } = nftFormInput;

    if (!title || !price || !description || !urlHash) return;

    const data = JSON.stringify({
      title,
      description,
      image: urlHash,
    });

    try {
      const addFile = await ipfsClient.add(data);

      const ipfsUrl = `https://ipfs.infura.io/ipfs/${addFile.path}`;
      console.log(ipfsUrl);
      //Todo: createNftToken() function
      createMarketForSale(ipfsUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const createMarketForSale = async (url) => {
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
      const marketAddress = marketNetworkObject.address;

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

      ///start here

      let createTokenResult = await deployedNftContract.methods
        .createNftToken(url)
        .send({ from: account });

      // const transHash = createTokenResult.transactionHash;

      // web3Api.web3.eth.getTransactionReceipt(transHash, function (err, txn) {
      //   console.log('createNFT', txn.status);
      //   isConfirmed = txn.status;
      //   setTxnConfirmed(isConfirmed);
      // });

      const tokenId = createTokenResult.events.Transfer.returnValues['2'];

      let marketFees = await deployedMarketContract.methods
        .getMarketFees()
        .call();
      marketFees = marketFees.toString();

      const priceToWei = Web3.utils.toWei(nftFormInput.price, 'ether');

      const launchNftForSale = await deployedMarketContract.methods
        .createItemForSale(nftAddress, tokenId, priceToWei)
        .send({ from: account, value: marketFees });

      router.push('/');
      // setUploaded(true);
    } else {
    }
  };

  return (
    <CreateNftContainer>
      {/* {uploaded ? <SucceedCard /> : ''} */}
      <CreateNftInnerContainer>
        <InputWrapper>
          <TitleInput
            onChange={(e) =>
              setNftFormInput({ ...nftFormInput, title: e.target.value })
            }
            type="text"
            placeholder="Title"
          />
          <PriceInput
            onChange={(e) =>
              setNftFormInput({ ...nftFormInput, price: e.target.value })
            }
            type="text"
            placeholder="Price (ETH)"
          />
          <DescInput
            onChange={(e) =>
              setNftFormInput({ ...nftFormInput, description: e.target.value })
            }
            type="text"
            placeholder="Description"
          />
        </InputWrapper>

        <UploadWrapper>
          {isImageLoading ? (
            <UploadedImagePrev>
              <ImgSpinner />
            </UploadedImagePrev>
          ) : urlHash ? (
            <UploadedImagePrev>
              <img src={urlHash} alt="img" />
            </UploadedImagePrev>
          ) : (
            <UploadedImagePrev>
              <img src="/uploadIcon.svg" alt="img" />
            </UploadedImagePrev>
          )}

          <h3>Drop your image here, or</h3>
          <input type="file" onChange={onChange} />
          <p>Support PNG, JPG, GIF</p>
        </UploadWrapper>
        <MintBtn onClick={createMarketItem} type="button" value="Mint NFT" />
      </CreateNftInnerContainer>
    </CreateNftContainer>
  );
};

export default CreateNft;
