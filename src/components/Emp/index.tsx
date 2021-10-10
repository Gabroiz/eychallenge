import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box, ClickAwayListener } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { styles } from './indexStyle'
import { makeStyles } from '@mui/styles';

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
    { field: 'gpn', headerName: 'GPN', flex: 0.1, minWidth: 130, },
    { field: 'name', headerName: 'Nome', flex: 0.1 },
    { field: 'jobTitle', headerName: 'Cargo', flex: 0.1 },
    { field: 'promotion', headerName: 'Promoção', flex: 0.1 },
    { field: 'actualLead', headerName: 'Lead Atual', flex: 0.1 },
    { field: 'futureRank', headerName: 'Próximo Cargo', flex: 0.1 },
];

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

type Props = {
    pageRows: number;
    headerHeight: number;
    rowHeight: number;
    heightPaper: number;
};

const Emp: React.FC<Props> = ({pageRows, headerHeight, rowHeight, heightPaper}) => {
    
    const classes = useStyles();
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

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    const [btnStatus, setBtnStatus] = React.useState(true);

    const handleClick = (value: boolean) => {
        if (value){ setSelectionModel([]); }
        setBtnStatus(value);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, height: heightPaper}} variant="outlined" square>
                    <Grid container direction="row" justifyContent="space-between" >
                        <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                        <Box>
                            <Link href={`/dashboard/employees/${encodeURIComponent(selectionModel[0])}`} passHref>
                                <Button sx={{ ml:1, mr:1 }} disabled={btnStatus} color="secondary" variant="contained">Exibir Funcionário</Button>
                            </Link>
                            <Link href={`/dashboard/employees/${encodeURIComponent(selectionModel[0])}`} passHref>
                                <Button sx={{ ml:1, mr:1 }} disabled={btnStatus} color="secondary" variant="contained">Simular Promoção</Button>
                            </Link>
                        </Box>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={styles.boxDefault}>
                            <Box style={styles.boxTable}>
                                <ClickAwayListener onClickAway={() => { handleClick(true) }}>
                                    <DataGrid
                                        className={classes.root}
                                        onPageChange={() => {
                                            handleClick(true)
                                        }}
                                        onColumnHeaderClick={() => {
                                            handleClick(true)
                                        }}
                                        onSelectionModelChange={(newSelectionModel) => {
                                            setSelectionModel(newSelectionModel);
                                            if (newSelectionModel.length < 1) { handleClick(true) } 
                                            else { handleClick(false)}
                                        }}
                                        pageSize={pageRows}
                                        rowsPerPageOptions={[pageRows]}
                                        headerHeight={headerHeight}
                                        rowHeight={rowHeight}
                                        autoHeight={true}
                                        selectionModel={selectionModel}
                                        rows={emps}
                                        columns={columns}
                                        />
                                </ClickAwayListener>
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Emp