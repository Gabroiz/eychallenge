import * as React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PieChart from 'Components/PieChart';
import EmpTable from 'Components/EmpTable';


export default function Dashboard() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{  display: "flex", flexDirection: "row", justifyContent: "center", height: 350 }} variant="outlined" square>

            <Box sx={{ width: 300, height: 350 }} >
            
              <PieChart />
  
            </Box>

          </Paper>
          
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 350 }}>
            <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
            <EmpTable/>

          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 350 }} variant="outlined" square></Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 350 }} variant="outlined" square></Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}