import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link';

type Emp = {
    id: number
    gpn: string
    name: string
    jobTitle: string
    promotion: string
    actualLead: string
    futureRank: string
  }
  
  export const getStaticProps = async () => {
    const res = await fetch('https://performance-tracker-fiap.herokuapp.com/employee-evaluation')
    const emps: Emp[] = await res.json()
  
    return {
      props: {
        emps,
      },
    }
  }

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'gpn', headerName: 'GPN', flex: 0.1 },
    { field: 'name', headerName: 'Nome', flex: 0.2 },
    { field: 'jobTitle', headerName: 'Cargo', flex: 0.2 },
    { field: 'promotion', headerName: 'Promoção', flex: 0.1 },
    { field: 'actualLead', headerName: 'Lead Atual', flex: 0.1 },
    { field: 'futureRank', headerName: 'Próximo Cargo', flex: 0.2 },
];

export default function Employee({ emps }: InferGetStaticPropsType<typeof getStaticProps>) {
    const gpn = 1

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    const [btnStatus, setBtnStatus] = React.useState(true);
    function handleClick(value: boolean) {
        setBtnStatus(value);
      }
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>
                        <Grid container direction="row" justifyContent="space-between" >
                            <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                            <Link href={`/dashboard/employees/${encodeURIComponent(selectionModel[0])}`} passHref>
                                <Button disabled={btnStatus} color="secondary" variant="contained">Exibir Funcionário</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mt:2 }}>
                                <Box style={{ height: 350, width: '100%' }}>
                                    <DataGrid
                                        onSelectionModelChange={(newSelectionModel) => {
                                            setSelectionModel(newSelectionModel);
                                            if (newSelectionModel.length < 1) {
                                                handleClick(true)
                                            } else {
                                                handleClick(false)
                                            }
                                        }}
                                        selectionModel={selectionModel}
                                        rows={emps}
                                        columns={columns}
                                        pageSize={4}
                                        rowsPerPageOptions={[4]}/>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}