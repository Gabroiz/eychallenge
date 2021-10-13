import * as React from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';

import { styles } from './indexStyle'
import { makeStyles } from '@mui/styles';
import { GetServerSideProps } from 'next';

type DissentHistory = {
    id: number
    date: string
    manager: string
    amountUsed: number 
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'date', headerName: 'Data', },
    { field: 'manager', headerName: 'Gerente', flex: 0.07 },
    { field: 'amountUsed', headerName: 'Budget Ultilizado', flex: 0.05 },
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
    rows: DissentHistory[];
    pageRows: number;
    headerHeight: number;
    rowHeight: number;
    height: number;
};

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