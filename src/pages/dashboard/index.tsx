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
        <Box sx={{ p: 2 }}>
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
  const [value, setValue] = React.useState(0);
  const [emps, setEmps] = React.useState([]);

  useEffect(() => {
    getEmployesData();
  }, [])

  async function getEmployesData() {
    await api.get('https://performance-tracker-fiap.herokuapp.com/employee-evaluation').then((response) => {
      setEmps(response.data)
    })
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} lg={4}>
        <Paper sx={styles.chartsPaper} variant="outlined" square>
          <Box sx={styles.chartBox} >
            <PieChart />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} lg={8}>
        <Paper sx={styles.paperDefault} variant="outlined" square>
          <BarChart />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} lg={4} >
        <Paper sx={styles.paperDown} variant="outlined" square>
          <Box sx={styles.box}>
            <Box sx={styles.panelBox}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Promoções realizadas" {...a11yProps(0)} />
                <Tab label="Budget utilizado" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <LastPromoted rows={emps} pageRows={6} headerHeight={37} rowHeight={31} />
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} lg={8}>
        <Emp rows={emps} pageRows={6} headerHeight={37} rowHeight={31} heightPaper={400} />
      </Grid>
    </Grid>
  )
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}