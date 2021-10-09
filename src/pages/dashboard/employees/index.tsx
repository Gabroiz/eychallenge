import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link';

import { styles } from 'Styles/dashboard/employees/indexStyle'

type Emp = {
    id: number
    gpn: string
    name: string
    jobTitle: string
    promotion: string
    actualLead: string
    futureRank: string
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

export default function Employee() {
    
    const [emps, setEmps] = React.useState([]);

    React.useEffect(() => {
        const fetchEmployees = async () => {
            const headers = new Headers()
            headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

            const config = {
                method: 'GET',
                headers: headers
            }

            const res = await fetch('https://performance-tracker-fiap.herokuapp.com/employee-evaluation', config)

            const emps = await res.json();
            
            setEmps(emps)
        }

        fetchEmployees()
    }, []);

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
                    <Paper sx={styles.paperDefault}>
                        <Grid container direction="row" justifyContent="space-between" >
                            <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                            <Link href={`/dashboard/employees/${encodeURIComponent(selectionModel[0])}`} passHref>
                                <Button disabled={btnStatus} color="secondary" variant="contained">Exibir Funcionário</Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.boxDefault}>
                                <Box style={styles.boxTable}>
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