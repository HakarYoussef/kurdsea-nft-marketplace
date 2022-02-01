import * as React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Creations from '../components/Creations';
import Purchased from '../components/Purchased';
import { TabContainer, TabPanelWrapper } from '../styles/MyNFTs.style';

export default function MyNFTs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
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
      color: '#2f89fc',
    },
  });

  const classes = useStyles();

  return (
    <TabContainer>
      <Box sx={{ width: '100vw' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className={classes.tabs}
            >
              <Tab className={classes.tab} label="Created" value="1" />
              <Tab className={classes.tab} label="Collected" value="2" />
            </TabList>
          </Box>
          <TabPanelWrapper>
            <TabPanel value="1">
              <Creations />
            </TabPanel>
            <TabPanel value="2">
              <Purchased />
            </TabPanel>
          </TabPanelWrapper>
        </TabContext>
      </Box>
    </TabContainer>
  );
}
