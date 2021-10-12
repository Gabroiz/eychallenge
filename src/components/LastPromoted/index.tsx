import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box, ClickAwayListener } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { styles } from './indexStyle'
import { makeStyles } from '@mui/styles';
import { GetServerSideProps } from 'next';

type Emp = {
    id: number
    gpn: string
    oldJobTitle: string
    newJobTitle: string
    promotionDate: string
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'promotionDate', headerName: 'Data', flex: 0.08 },
    { field: 'gpn', headerName: 'GPN', flex: 0.1, minWidth: 120, },
    { field: 'oldJobTitle', headerName: 'Cargo Anterior', flex: 0.1 },
    { field: 'newJobTitle', headerName: 'Cargo Atual', flex: 0.1 },
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
    rows: Emp[];
    pageRows: number;
    headerHeight: number;
    rowHeight: number;
    height: number;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let url=`https://performance-tracker-fiap.herokuapp.com/employee-evaluation/history/promotions`
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)
    const config = {
        method: 'GET',
        headers: headers
    }

    const res = await fetch(url,config)
    const emps: Emp[] = await res.json()
  
    return {
        props: {
            emps,
        },
    }
}

const LastPromoted: React.FC<Props> = (props) => {
    
    const { pageRows, headerHeight, rowHeight,  height, rows} = props

    const classes = useStyles();

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [btnStatus, setBtnStatus] = React.useState(true);

    const handleClick = (value: boolean) => {
        if (value){ setSelectionModel([]); }
        setBtnStatus(value);
    }

    return (
        <Box sx={{ display: 'flex', height: '100%'}}>
            <Box sx={{ height: height }} style={styles.boxTable}>
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