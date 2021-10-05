import * as React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import CompTable from 'Components/CompTable';

export default function Employee() {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>  
                        <Typography component="h2" variant="h6" gutterBottom>Empresas</Typography>
                        <Box sx={{ mt:2 }}>
                            <CompTable/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}