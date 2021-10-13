import * as React from 'react';
import Layout from 'Components/Layout'
import { Paper, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SmuTable from 'Components/SmuTable';
import { GetServerSideProps } from 'next';
import {styles} from 'Styles/dashboard/companiesStyle';
import { GridColDef } from '@mui/x-data-grid';

//import { SmuType } from 'Types/SmuTypes' 
//import { SalarayType } from 'Types/SalarayType' 
//import { UtilizationType } from 'Types/UtilizationType' 

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)

    const config = {
        method: 'GET',
        headers: headers
    }

    let url=`https://performance-tracker-fiap.herokuapp.com/smu`
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

const columnsSmu: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true} ,
    { field: 'country', headerName: 'country', flex: 0.1} ,
    { field: 'city', headerName: 'city', flex: 0.1} ,
    { field: 'sl', headerName: 'sl', flex: 0.1} ,
    { field: 'subSL', headerName: 'subSL', flex: 0.1} ,
    { field: 'smuName', headerName: 'smuName', flex: 0.1} ,
    { field: 'budget', headerName: 'budget', flex: 0.1} ,
    { field: 'totalBudget', headerName: 'totalBudget', flex: 0.1} ,
    { field: 'percentage', headerName: 'percentage', flex: 0.1} 
  ];

const columnsSalarys: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true} ,
    { field: 'gpn', headerName: 'gpn', flex: 0.1} ,
    { field: 'name', headerName: 'name', flex: 0.1} ,
    { field: 'actualBaseSalaryFY', headerName: 'actualBaseSalaryFY', flex: 0.1} ,
];

const columnsUtilizations: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true} ,
    { field: 'gpn', headerName: 'gpn', flex: 0.1} ,
    { field: 'name', headerName: 'name', flex: 0.1} ,
    { field: 'actualUtilization', headerName: 'actualUtilization', flex: 0.1} ,
];

type Types = {
    smus: [];
    salarys: [];
    utilizations: [];
    columnsSmu: GridColDef[];
    columnsSalarys: GridColDef[];
    columnsUtilizations: GridColDef[];
}
function Controls ( {smus, salarys, utilizations}: Types)  {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>SMU</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={styles.boxDefault}>
                                <SmuTable rows={smus} columns={columnsSmu}/>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>Salarys</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={styles.boxDefault}>
                            <SmuTable rows={salarys} columns={columnsSalarys}/>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography>Utilizations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={styles.boxDefault}>
                                <SmuTable rows={utilizations} columns={columnsUtilizations}/>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Controls

Controls.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}