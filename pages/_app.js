import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/themes';
import { GlobalStyles } from '../styles/globalStyles';
import useDarkMode from '../Theme/useDarkMode';
import Toggle from '../Theme/Toggle';
import NavBar from '../components/NavBar';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const [isConnected, setIsConnected] = useState(false);

  const onLogin = () => {
    setIsConnected(true);
    console.log('connected');
  };

  const onLogout = () => {
    setIsConnected(false);
    console.log('not connected');
  };

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Web3ReactProvider getLibrary={getLibrary}>
          <NavBar
            onLogin={onLogin}
            onLogout={onLogout}
            themes={<Toggle theme={theme} toggleTheme={toggleTheme} />}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
