import React, { useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  ToggleStyle,
  OpenLinkButton,
  NavBarItems,
  LogoWrapper,
  NavBarContainer,
  StyledLink,
  LogoStyledLink,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  ExtendStyledLink,
  MenuCloseIcon,
  MenuOpenIcon,
  ConnectBtn,
  ExtendConnectBtn,
  AddressStyle,
  ExtendAddressStyle,
  WrongNetworkBtn,
  NotInstalletWarningContainer,
  ExtendWrongNetworkBtn,
} from '../styles/Navbar.style';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 43114],
});

const NavBar = ({ themes }) => {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAcount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [notInstalletWeb3Provider, setNotInstalletWeb3Provider] =
    useState(false);

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
      setNotInstalletWeb3Provider(true);
    }
  };

  async function connectOnLoad() {
    try {
      //here we use activate to create the connection
      await activate(injected);
      setIsConnecting(false);
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
      setIsConnecting(true);
    }
    loadrovider();
  }, []);

  //Load Accounts
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
      setCurrentAcount(accounts[0]);

      const nftContractFile = await fetch('/abis/NFT.json');
      const marketContractFile = await fetch('/abis/NFTMarketPlace.json');
      //Convert to Json
      const convertNftCFile = await nftContractFile.json();
      const convertMarketCFile = await marketContractFile.json();
      //Get Abi

      const networkId = await web3Api.web3.eth.net.getId();

      const nftNetworkObject = convertNftCFile.networks[networkId];

      const marketNetworkObject = convertMarketCFile.networks[networkId];

      if (nftNetworkObject && marketNetworkObject) {
        if (accounts[0]) {
          const myBalance = await web3Api.web3.eth.getBalance(accounts[0]);
          const converBalance = Web3.utils.fromWei(myBalance, 'ether');
          setAccountBalance(converBalance);
          setIsConnected(true);
        }
      } else {
        setWrongNetwork(true);
      }
    };
    web3Api.web3 && loadAccount();
  }, [web3Api.web3]);

  async function connectOnClick() {
    if (localStorage.getItem('uAccount') == null) {
      setIsConnecting(true);
      try {
        await activate(injected);
        setIsConnecting(false);
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
      deactivate();
      localStorage.removeItem('uAccount');
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <>
      <NavBarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
          <OpenLinkButton
            onClick={() => {
              setExtendNavbar((curr) => !curr);
            }}
          >
            {extendNavbar ? <MenuCloseIcon /> : <MenuOpenIcon />}
          </OpenLinkButton>

          <LogoWrapper>
            <Link href="/">
              <LogoStyledLink>KurdSea</LogoStyledLink>
            </Link>
          </LogoWrapper>
          <NavBarItems>
            <Link href="/Explore">
              <StyledLink>Explore</StyledLink>
            </Link>
            <Link href="/MyNFTs">
              <StyledLink>My NFTs</StyledLink>
            </Link>
            <Link href="/CreateNFT">
              <StyledLink>Create NFT</StyledLink>
            </Link>
          </NavBarItems>

          {wrongNetwork ? (
            <WrongNetworkBtn>Wrong network</WrongNetworkBtn>
          ) : isConnected ? (
            <>
              <AddressStyle>
                <p> {accountBalance > 0 && accountBalance.slice(0, 6)} Ξ</p>
                {currentAccount &&
                  `${currentAccount.slice(0, 6)}...${currentAccount.slice(
                    currentAccount.length - 4,
                    currentAccount.length
                  )}`}
              </AddressStyle>
            </>
          ) : (
            <ConnectBtn onClick={connectOnClick}>
              {!isConnecting ? 'Connect' : 'Loading...'}
            </ConnectBtn>
          )}

          <ToggleStyle>{themes}</ToggleStyle>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer>
            <Link href="/Explore">
              <ExtendStyledLink
                onClick={() => setExtendNavbar(extendNavbar && false)}
              >
                Explore
              </ExtendStyledLink>
            </Link>
            <Link href="/MyNFTs">
              <ExtendStyledLink
                onClick={() => setExtendNavbar(extendNavbar && false)}
              >
                My NFTs
              </ExtendStyledLink>
            </Link>
            <Link href="/CreateNFT">
              <ExtendStyledLink
                onClick={() => setExtendNavbar(extendNavbar && false)}
              >
                Create NFT
              </ExtendStyledLink>
            </Link>

            {wrongNetwork ? (
              <ExtendWrongNetworkBtn>Wrong network</ExtendWrongNetworkBtn>
            ) : isConnected ? (
              <>
                <ExtendAddressStyle>
                  <p> {accountBalance > 0 && accountBalance.slice(0, 6)} Ξ</p>
                  {currentAccount &&
                    `${currentAccount.slice(0, 6)}...${currentAccount.slice(
                      currentAccount.length - 4,
                      currentAccount.length
                    )}`}
                </ExtendAddressStyle>
              </>
            ) : notInstalletWeb3Provider ? (
              <ExtendConnectBtn>Install Web3 Provider</ExtendConnectBtn>
            ) : (
              <ExtendConnectBtn onClick={connectOnClick}>
                Connect
              </ExtendConnectBtn>
            )}
          </NavbarExtendedContainer>
        )}
      </NavBarContainer>
      {notInstalletWeb3Provider && (
        <>
          <NotInstalletWarningContainer>
            <h4>
              It&#39;s seems you have not installed any web3 provider wallets!
              please install one (e.g. Metamask).
            </h4>
          </NotInstalletWarningContainer>
        </>
      )}
    </>
  );
};

export default NavBar;
