import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, Grid, Typography, Box, ClickAwayListener } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Link from 'next/link';

import { AppBar, Container, Dialog, IconButton, TextField, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { styles } from './indexStyle'
import { makeStyles } from '@mui/styles';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', hide: true },
    { field: 'gpn', headerName: 'GPN', flex: 0.1, minWidth: 130, },
    { field: 'name', headerName: 'Nome', flex: 0.1 },
    { field: 'jobTitle', headerName: 'Cargo', flex: 0.1 },
    { field: 'promotion', headerName: 'Promoção', flex: 0.1 },
    { field: 'actualLead', headerName: 'Lead Atual', flex: 0.1 },
    { field: 'futureRank', headerName: 'Próximo Cargo', flex: 0.1 },
];

type EmpType = {
    id: number
    gpn: string
    name: string
    jobTitle: string
    promotion: string
    actualLead: string
    futureRank: string
}

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
    rows: EmpType[];
    pageRows: number;
    headerHeight: number;
    rowHeight: number;
    heightPaper: number;
    height: number;
};

const Emp: React.FC<Props> = (props) => {
    
    const { pageRows, headerHeight, rowHeight, heightPaper, height, rows} = props

    const classes = useStyles();
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [btnStatus, setBtnStatus] = React.useState(true);

    const handleClick = (value: boolean) => {
        if (value) { setSelectionModel([]); }
        setBtnStatus(value);
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    } 

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, height: heightPaper }} elevation={0}>
                    <Grid container direction="row" justifyContent="space-between" >
                        <Typography component="h2" variant="h6" gutterBottom>Funcionarios</Typography>
                        <Box>
                            <Link href={`/dashboard/employees/${encodeURIComponent(selectionModel[0])}`} passHref>
                                <Button disabled={btnStatus} sx={{ ml: 1, mr: 1 }} color="secondary" variant="contained">Exibir Funcionário</Button>
                            </Link>
                            <Button disabled={btnStatus} color="secondary" variant="contained" onClick={handleClickOpen}>Simular Promoção</Button>
                            <Dialog fullScreen open={open} onClose={handleClose}>
                                <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close">
                                    <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Simulação de Promoção
                                    </Typography>
                                    <Button autoFocus color="secondary" variant="contained" onClick={handleClose}>
                                        Promover
                                    </Button>
                                </Toolbar>
                                </AppBar>
                                <Container maxWidth="xl" sx={{p:5}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth id="outlined-basic" label="Salário Atual" variant="outlined" size="small"/>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <TextField fullWidth id="outlined-basic" label="Salário com Bonificação" variant="outlined" size="small"/>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <TextField fullWidth id="outlined-basic" label="Novo Cargo" variant="outlined" size="small"/>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Dialog>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', mt: 1, height: height }} >
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
                                            else { handleClick(false) }
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
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Emp