import * as React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import CompTable from 'Components/CompTable';

import {styles} from 'Styles/dashboard/companiesStyle';

export default function Employee() {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={styles.paperDefault}>  
                        <Typography component="h2" variant="h6" gutterBottom>Empresas</Typography>
                        <Box sx={styles.boxDefault}>
                            <CompTable/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}