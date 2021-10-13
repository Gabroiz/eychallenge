import * as React from 'react';
import Layout from 'Components/Layout'
import { Box, Typography, Grid, Paper } from '@mui/material';
import PieChart from 'Components/PieChart';
import BarChart from 'Components/barChart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { styles } from 'Styles/dashboard/indexStyle';
import Emp from 'Components/Emp';
import LastPromoted from 'Components/LastPromoted';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { api } from 'services/api';
import { useEffect } from 'react';
import BudgetUses from 'Components/BudgetUses';
import Indicators from 'Components/Indicators';
import { height } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function a11yProps2(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type EmpType = {
  id: number
  gpn: string
  name: string
  jobTitle: string
  promotion: string
  actualLead: string
  futureRank: string
}

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     let url=`https://performance-tracker-fiap.herokuapp.com/employee-evaluation`

//     const headers = new Headers()
//     headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)
//     const config = {
//         method: 'GET',
//         headers: headers
//     }

//     const res = await fetch(url,config)
//     const emps: EmpType[] = await res.json()

//     return {
//         props: {
//             emps,
//         },
//     }
// }

export default function Dashboard() {
  const [valueTab1, setvalueTab1] = React.useState(0);

  const [value, setValue] = React.useState(0);

  const [emps, setEmps] = React.useState([]);
  const [lastPromotions, setLastPromotions] = React.useState([]);
  const [budgetUses, setBudgetHistory] = React.useState([]);
  
  useEffect(() => {
    getEmployesData();
    getLastPromotionsData();
    getbudgetUses();
  }, [])

  async function getEmployesData() {
    await api.get('https://performance-tracker-fiap.herokuapp.com/employee-evaluation').then((response) => {
      setEmps(response.data)
    })
  }

  async function getLastPromotionsData() {
    await api.get('https://performance-tracker-fiap.herokuapp.com/history/promotions').then((response) => {
      setLastPromotions(response.data)
    })
  }

  async function getbudgetUses() {
    await api.get('https://performance-tracker-fiap.herokuapp.com/history/budgets').then((response) => {
      setBudgetHistory(response.data)
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} lg={4}>
        <Paper sx={styles.chartsPaper} elevation={0}>
          <Box sx={styles.chartBox} >
            <PieChart />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} lg={8}>
        <Box style={styles.paperDefault}>
          <Box>
            <Box>
              <Tabs value={valueTab1} onChange={(event, newValue) => { setvalueTab1(newValue);}} aria-label="basic tabs example" centered>
                <Tab label="Budget por área" {...a11yProps2(0)} />
                <Tab label="Indicadores" {...a11yProps2(1)} />
              </Tabs>
            </Box>
            <Paper elevation={0}>
              <TabPanel value={valueTab1} index={0}>
                <Box sx={{p:2, height: 320}}>
                  <BarChart />
                </Box>
              </TabPanel>
            </Paper>
            <TabPanel value={valueTab1} index={1}>
              <Indicators/>
            </TabPanel>
          </Box>
        </Box>
        
      </Grid>
      <Grid item xs={12} sm={12} lg={4} >
        <Box sx={styles.boxHistory} >
          <Box>
            <Tabs value={value} onChange={(event, newValue) => { setValue(newValue);}} aria-label="basic tabs example" centered>
              <Tab label="Promoções realizadas" {...a11yProps(0)} />
              <Tab label="Budget utilizado" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Paper elevation={0}>
            <TabPanel value={value} index={0}>
              <LastPromoted rows={lastPromotions} pageRows={6} headerHeight={37} rowHeight={31} height={320} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BudgetUses rows={budgetUses} pageRows={6} headerHeight={37} rowHeight={31} height={320} />
            </TabPanel>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={8}>
        <Emp rows={emps} pageRows={7} headerHeight={37} rowHeight={31} heightPaper={400} height={320} />
      </Grid>
    </Grid>
  )
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}