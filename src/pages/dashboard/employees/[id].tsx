import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, IconButton, Grid, TextField, Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Box, Dialog, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { AddBox, HighlightOff} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

import { format, parse } from 'date-fns'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { styles } from 'Styles/dashboard/employees/idStyle'

type Emp = {
    emp: EmpType
}

type EmpType = {
    id: number
    gpn: string
    name: string
    employeeStatus: string
    gender: string
    jobTitle: string
    hiringDate: string
    utilization: number
    promotion: string
    actualLead: string
    futureRank: string
}

const Employee = ({ emp }: Emp) => {
    
    const [status, setStatus] = React.useState('');
    const [attribute, setAttribute] = React.useState('');
    const [currentPosition, setCurrentPosition] = React.useState('');
    const [business, setBusiness] = React.useState('');

    const [hiringDate, setHiringDate] = React.useState<Date | null>(parse(emp.hiringDate, 'yyyy-dd-MM', new Date()));
    const [lastPromotionDate, setLastPromotionDate] = React.useState<Date | null>(new Date());
    
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
        setAttribute(event.target.value);
        setCurrentPosition(event.target.value);
        setBusiness(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const router = useRouter()
    if (!router.isFallback && !emp?.id) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <React.Fragment>
            <Paper sx={styles.paperDefault}>  
                <Grid container spacing={3}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="GPN" defaultValue={emp.gpn} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="Situação de Promoção" defaultValue={emp.promotion} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="Lead atual" defaultValue={emp.actualLead} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Nome" defaultValue={emp.name} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl sx={styles.formControl} size="small">
                            <InputLabel id="attribute-select-label" >Cargo Atual</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={emp.jobTitle} label="Cargo Atual" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={0}>Staff/Assistent</MenuItem>
                                <MenuItem value={1}>Senior</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Senior Manager</MenuItem>
                                <MenuItem value={4}>Executive Director</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField fullWidth id="outlined-basic" label="Genero" defaultValue={emp.gender} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField fullWidth id="outlined-basic" label="Status Funcionario" defaultValue={emp.employeeStatus} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="País de atuação" defaultValue={emp.name} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Office location" defaultValue={emp.name} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Utilização" defaultValue={emp.utilization} variant="outlined" size="small"  InputProps={{ inputProps: {  } }}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                readOnly
                                label="Hiring Date"
                                value={hiringDate}
                                onChange={(newValue) => {
                                    setHiringDate(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                readOnly
                                label="Last Promotion Date"
                                value={lastPromotionDate}
                                onChange={(newValue) => {
                                    setLastPromotionDate(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} marginTop={1}><Typography variant="h6">Características</Typography></Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="attribute-select-label" >Característica</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={attribute} label="Caracteristica" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="status-select-label" >Status</InputLabel>
                            <Select labelId="status-select-label" id="status-select" value={status} label="Status" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={0}>Need to Progress</MenuItem>
                                <MenuItem value={1}>Progressing</MenuItem>
                                <MenuItem value={2}>Differentiating</MenuItem>
                                <MenuItem value={3}>Strategic Impact</MenuItem>
                                <MenuItem value={4}>Promoção</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={1}>
                        <IconButton sx={{ color: red[500] }} aria-label="upload picture" component="span"><HighlightOff /></IconButton >
                        <IconButton sx={{ color: green[500] }} aria-label="upload picture" component="span"><AddBox /></IconButton >
                    </Grid>
                    <Grid item xs={12} marginTop={1}><Typography variant="h6" >Empresa</Typography></Grid>
                    <Grid item xs={6} md={6}>
                        <TextField fullWidth id="outlined-basic" label="Nome" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="business-select-label" >Setor do mercado</InputLabel>
                            <Select labelId="business-select-label" id="business-select" value={business} label="Setor do mercado" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} marginTop={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button color="secondary" variant="contained" onClick={handleClickOpen}>Simular Promoção</Button>
                            <Dialog
                                fullScreen
                                open={open}
                                onClose={handleClose}>
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
                        
                </Grid>
            </Paper>
        </React.Fragment>
    )
}

export default Employee

type Params = {
    params: {
      id: string
    }
}

export async function getStaticPaths() {
    
    //const headers = new Headers()
    //headers = headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    //const config = { method: 'GET', headers: headers }

    const res = await fetch('https://performance-tracker-fiap.herokuapp.com/employee-evaluation')
    const emps: EmpType[] = await res.json()
    
    const paths = emps.map((emp) => ({
      params: { id: emp.id.toString() },
    }))
    
    return { paths, fallback: true }
}

export async function getStaticProps({ params }: Params ) {
    //const headers = new Headers()
    //headers = headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
    //const config = { method: 'GET', headers: headers }
    
    const res = await fetch(`https://performance-tracker-fiap.herokuapp.com/employee-evaluation/${params.id}`)
    const emp: EmpType[] = await res.json()

    return { props: { emp }}
}