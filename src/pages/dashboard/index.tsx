import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import PieChart from 'Components/PieChart';
import EmpTable from 'Components/EmpTable';


export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{  display: "flex", flexDirection: "row", justifyContent: "center", height: 350 }} variant="outlined" square>

            <Box sx={{ width: 300, height: 350 }} >
            
              <PieChart />
  
            </Box>

          </Paper>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 350 }}>

            <EmpTable/>

          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 350 }} variant="outlined" square></Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 350 }} variant="outlined" square></Paper>
        </Grid>
      </Grid>
    </Container>
  )
}