import * as React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PieChart from 'Components/PieChart';
import EmpTable from 'Components/EmpTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { styles } from 'Styles/dashboard/indexStyle';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={styles.chartsPaper} variant="outlined" square>
            <Box sx={styles.box}>
              <Box sx={styles.panelBox}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                  <Tab label="Budget" {...a11yProps(0)} />
                  <Tab label="Promoções" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Box sx={styles.chartBox} >
                  <PieChart />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={styles.paperDefault}>
            <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
            <EmpTable/>

          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={styles.paperDefault} variant="outlined" square></Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={styles.paperDefault} variant="outlined" square></Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}