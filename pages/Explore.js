import * as React from 'react';
import { useState } from 'react/cjs/react.development';
import Web3 from 'web3';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import axios from 'axios';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { TabContainer, TabPanelWrapper } from '../styles/MyNFTs.style';
import { makeStyles } from '@material-ui/core/styles';

import {
  ExploreContainer,
  MarketItemsWrapper,
  SearchAndFilterWrapper,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  StyledReactSelect,
} from '../styles/Explore.style';
import SoldItems from '../components/SoldItems';
import UnSoldItems from '../components/UnsoldItems';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 43114],
});

function Explore(props) {
  const [nftContract, setNftContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [nftAddress, setNftAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });
  const { active, uAccount, library, connector, activate, deactivate } =
    useWeb3React();
  const [options, setOpions] = useState([]);

  useEffect(() => {
    setOpions([
      { value: 'asc', label: 'Price: High to Low' },
      { value: 'desc', label: 'Price: Low to High' },
    ]);
  }, []);

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
      setIsLoading(true);
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
              nftUrl,
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
        ///////////////////////////SOLD ITEMS
        const soldData = await deployedMarketContract.methods
          .getAllSoldItems()
          .call();

        const SoldItems = await Promise.all(
          soldData.map(async (soldItem) => {
            const nftUrl = await deployedNftContract.methods
              .tokenURI(soldItem.tokenId)
              .call();

            const soldPriceToWei = Web3.utils.fromWei(
              soldItem.price.toString(),
              'ether'
            );

            const soldMetaData = await axios.get(nftUrl);

            //Todo fix this object
            let myItemsSold = {
              price: soldPriceToWei,
              itemId: soldItem.id,
              nftUrl,
              isSold: soldItem.isSold,
              owner: soldItem.owner,
              seller: soldItem.seller,
              image: soldMetaData.data.image,
              title: soldMetaData.data.title,
              description: soldMetaData.data.description,
            };

            return myItemsSold;
          })
        );

        setTimeout(() => {
          const marketSoldItems = SoldItems.filter((item) => item.isSold);
          setSoldItems(marketSoldItems);
          console.log(marketSoldItems);
          setUnsoldItems(items);
          setIsLoading(false);
        }, 2000);
      } else {
      }
    };
    web3Api.web3 && loadContracts();
  }, [web3Api.web3]);

  // unsoldItems.map((value) => {
  //   const last = unsoldItems.slice(-1).pop();
  //   console.log(last.title);
  // });

  // const SoldFilteredItems = soldItems.filter((soldItem) =>
  //   soldItem.title.toLowerCase().includes(search.toLowerCase())
  // );

  const unSoldFilteredItems = unsoldItems.filter((unSoldItem) =>
    unSoldItem.title.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  function handleSort(sortOrder) {
    setSortOrder(sortOrder);
    if (sortOrder.value) {
      setUnsoldItems(_.orderBy(unsoldItems, ['price'], [sortOrder.value]));
    }
  }

  // const LatestArtworks = unsoldItems.slice(-8).reverse();

  const [value, setValue] = React.useState('1');

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    tabs: {
      '& .MuiTabs-indicator': {
        backgroundColor: '#2f89fc',
        height: 3,
      },
      '& .MuiTab-root.Mui-selected': {
        color: '#2f89fc',
      },
    },
    tab: {
      width: '100%',

      color: '#2f89fc',
      opacity: ' 0.5',
    },
  });

  const classes = useStyles();

  return (
    <ExploreContainer>
      <SearchAndFilterWrapper>
        <SearchWrapper>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
            type="search"
            onChange={handleChange}
          />
        </SearchWrapper>

        <StyledReactSelect
          classNamePrefix={'Select'}
          placeholder="Latest"
          isSearchable={false}
          value={sortOrder}
          onChange={handleSort}
          options={options}
        />
      </SearchAndFilterWrapper>
      <MarketItemsWrapper>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChangeValue}
                aria-label="lab API tabs example"
                className={classes.tabs}
              >
                <Tab className={classes.tab} label="Creations" value="1" />
                <Tab className={classes.tab} label="Sold" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <UnSoldItems unSoldFilteredItems={unSoldFilteredItems} />
            </TabPanel>
            <TabPanel value="2">
              <SoldItems SoldFilteredItems={soldItems} />
            </TabPanel>
          </TabContext>
        </Box>
      </MarketItemsWrapper>
    </ExploreContainer>
  );
}

export default Explore;
