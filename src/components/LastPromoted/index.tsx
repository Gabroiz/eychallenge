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
    lastRank: string
    actualRank: string
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'gpn', headerName: 'GPN', flex: 0.1, minWidth: 130, },
    { field: 'jobTitle', headerName: 'Cargo Anterior', flex: 0.1 },
    { field: 'futureRank', headerName: 'Cargo Atual', flex: 0.1 },
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
};

const LastPromoted: React.FC<Props> = ({pageRows, headerHeight, rowHeight}) => {
    
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
        <Box sx={{ display: 'flex', height: '100%'}}>
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
    )
}

export default LastPromoted