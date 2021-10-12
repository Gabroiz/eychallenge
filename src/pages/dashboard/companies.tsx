import * as React from 'react';
import Layout from 'Components/Layout'
import { Paper, Grid, Typography, Box } from '@mui/material';
import CompTable from 'Components/CompTable';
import { GetServerSideProps } from 'next';
import {styles} from 'Styles/dashboard/companiesStyle';
import { parseCookies } from 'nookies';

type Comp = {
    comp: CompType
}

type CompType= {
    id: number
    country: String
    city: String
    sl: String
    subSL: String
    smuName: String
    budget: number 
    totalBudget: number 
    percentage: number
}

const cookies = parseCookies();

export const getServerSideProps: GetServerSideProps = async (context) => {
    let url=`https://performance-tracker-fiap.herokuapp.com/smu`
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)

    const config = {
        method: 'GET',
        headers: headers
    }

    const res = await fetch(url,config)
    const comp: CompType[] = await res.json()

    return {
        props: {
            comp,
        },
    }
}

const Comp: React.FC<Props> = (props) => {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={styles.paperDefault}>  
                        <Typography component="h2" variant="h6" gutterBottom>SMU</Typography>
                        <Box sx={styles.boxDefault}>
                            <CompTable/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Comp

Comp.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}