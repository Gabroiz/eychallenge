import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'GPN', width: 100 },
    { field: 'nome', headerName: 'Nome', width: 100 },
];
  
const rows = [
    { id: 1, nome: 'Snow' },
];

export default function Employee() {
    const gpn = 'd-000001'

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>
                        <Grid container direction="row" justifyContent="space-between" >
                            <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                            <Link href={'employees/' + gpn} passHref>
                                <Button disabled color="secondary" variant="contained">Exibir Funcionário</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mt:2 }}>
                                <div style={{ height: 350, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={4}
                                        rowsPerPageOptions={[4]}/>
                                </div>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}