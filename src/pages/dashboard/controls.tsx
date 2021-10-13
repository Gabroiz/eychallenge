import * as React from 'react';
import Layout from 'Components/Layout'
import { Paper, Grid, Typography, Box } from '@mui/material';
import SmuTable from 'Components/SmuTable';
import { GetServerSideProps } from 'next';
import {styles} from 'Styles/dashboard/companiesStyle';

//import { SmuType } from 'Types/SmuTypes' 
//import { SalarayType } from 'Types/SalarayType' 
//import { UtilizationType } from 'Types/UtilizationType' 

type Types = {
    smus: []
    salarys: []
    utilizations: []
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let url=`https://performance-tracker-fiap.herokuapp.com/smu`
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)

    const config = {
        method: 'GET',
        headers: headers
    }

    const res = await fetch(url, config)
    const smus: [] = await res.json()

    let urlSalary=`https://performance-tracker-fiap.herokuapp.com/base-salary`
    const resSalary = await fetch(urlSalary, config)
    const salarys: [] = await resSalary.json()
    
    let urlUtilizations=`https://performance-tracker-fiap.herokuapp.com/utilization`
    const resUtilizations = await fetch(urlUtilizations, config)
    const utilizations: [] = await resUtilizations.json()
    
    return {
        props: {
            smus,
            salarys,
            utilizations
        },
    }
}

function Smu ( {smus, salarys, utilizations}: Types)  {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={styles.paperDefault}>  
                        <Typography component="h2" variant="h6" gutterBottom>SMU</Typography>
                        <Box sx={styles.boxDefault}>
                            <SmuTable rows={smus}/>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={styles.paperDefault}>  
                        <Typography component="h2" variant="h6" gutterBottom>Base de Salários</Typography>
                        <Box sx={styles.boxDefault}>
                            <SmuTable rows={salarys}/>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={styles.paperDefault}>  
                        <Typography component="h2" variant="h6" gutterBottom>Base de Ultilization</Typography>
                        <Box sx={styles.boxDefault}>
                            <SmuTable rows={utilizations}/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Smu

Smu.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}