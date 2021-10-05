import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, TextField, Typography, Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Box } from '@mui/material';
import { AddBox, HighlightOff} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import EmpTable from 'Components/EmpTable';


export default function Employee() {

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>
                    <Grid container
  direction="row"
  justifyContent="space-between" >
                
                        <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                        
                            <Button disabled color="secondary" variant="contained">Exibir Funcionário</Button>
                        </Grid>
                        
                        
                        <Grid item xs={12}>
                        <Box sx={{ mt:2 }}>
                            <EmpTable/>
                        </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}