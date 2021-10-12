import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box, ClickAwayListener } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { styles } from './indexStyle'
import { makeStyles } from '@mui/styles';
import { GetServerSideProps } from 'next';

type BudgetHistory = {
    id: number
    useDate: string
    manager: string
    amountUsed: string
    task: string
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'useDate', headerName: 'Data', },
    { field: 'manager', headerName: 'Gerente', flex: 0.07 },
    { field: 'amountUsed', headerName: 'Budget Ultilizado', flex: 0.05 },
    { field: 'task', headerName: 'Tarefa realizada', flex: 0.1 },
];

const useStyles = makeStyles({
    root: {
        border: 0,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#ececec' 
          },
        WebkitFontSmoothing: 'auto',
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

type Props = {
    rows: BudgetHistory[];
    pageRows: number;
    headerHeight: number;
    rowHeight: number;
    height: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let url=`https://performance-tracker-fiap.herokuapp.com/employee-evaluation/history/budgets`
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)
    const config = {
        method: 'GET',
        headers: headers
    }

    const res = await fetch(url,config)
    const budgets: BudgetHistory[] = await res.json()
  
    return {
        props: {
            budgets,
        },
    }
}

const LastPromoted: React.FC<Props> = (props) => {
    
    const { pageRows, headerHeight, rowHeight, height, rows} = props

    const classes = useStyles();

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [btnStatus, setBtnStatus] = React.useState(true);

    const handleClick = (value: boolean) => {
        if (value){ setSelectionModel([]); }
        setBtnStatus(value);
    }

    return (
        <Box sx={{ display: 'flex', height: height}}>
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
                        autoHeight={false}
                        selectionModel={selectionModel}
                        rows={rows}
                        columns={columns}
                        />
                </ClickAwayListener>
            </Box>
        </Box>
    )
}

export default LastPromoted