import * as React from 'react';
import Layout from 'Components/Layout'
import Button from '@mui/material/Button';
import { Paper, IconButton, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Box, Dialog, AppBar, Toolbar, Typography, Container, ThemeProvider, createTheme, InputAdornment, Input, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { parse } from 'date-fns'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import { styles } from 'Styles/dashboard/employees/idStyle'
import { GetServerSideProps } from 'next';

import { useTheme } from '@mui/material/styles';

import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { api } from 'services/api';

type Emp = {
    emp: EmpType
}

type EmpType = {
    id: number
    gpn: string
    name: string
    employeeStatus: string
    gender: string
    locationCity: string
    serviceLine: string
    smuName: string
    subSL: string
    actualRank: string
    actualLevelExp: number
    jobTitle: string
    hiringDate: string
    proportionalHiringDate: number
    utilization: number
    promotion: string
    actualLead: string
    futureRank: string
    futureLevelExp: string
    altered: boolean
    actualUtilization: number
    salary: number
    //promotionDate: string
}

var formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 3, // (causes 2500.99 to be printed as $2,501)
});

var formatterN = new Intl.NumberFormat('pt-br', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3, 
});

export const getServerSideProps: GetServerSideProps = async (context) => {
    //const cookies = parseCookies();
    
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)

    const config = {
        method: 'GET',
        headers: headers
    }

    const { id } = context.params

    const res = await fetch(`https://performance-tracker-fiap.herokuapp.com/employee-evaluation/${id}`,config)
    const emp: EmpType[] = await res.json()
    
    return {
        props: {
            emp,
        },
    }
}

const mdTheme = createTheme({
    palette: {
        primary: {
          main: '#424242',
        },
        secondary: {
          main: '#FFCE56',
        },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 1000,
        md: 1300,
        lg: 1400,
        xl: 1736,
      },
    },
});

const Employee = ({ emp }: Emp) => {
    
    const [status, setStatus] = React.useState('');
    const [actualLevelExp, setCurrentPosition] = React.useState(emp.actualLevelExp.toString());
    const [employeeStatus, setStatusEmp] = React.useState(emp.employeeStatus.toString());
    const [gender, setGender] = React.useState(emp.gender);
    const [business, setBusiness] = React.useState('');

    const [hiringDate, setHiringDate] = React.useState<Date | null>(parse(emp.hiringDate, 'yyyy-dd-MM', new Date()));
    const [lastPromotionDate, setLastPromotionDate] = React.useState<Date | null>(parse(emp.hiringDate, 'yyyy-dd-MM', new Date()));

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const [totalBudget, setBudget] = React.useState(0);
    
    useEffect(() => {
        getBudgetData();
    }, [])
    
    function getBudgetData() {
        api.get('/smu').then((response) => {
          let totalBudget = 0;
          
          response.data.map((record: { budget: number; totalBudget: number; }) => {
            totalBudget += record.budget;
          })
          
          setBudget(totalBudget)
        })
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const router = useRouter()
    if ( !emp?.id) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Paper sx={styles.paperDefault}>  
                <Grid container spacing={3}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="GPN" defaultValue={emp.gpn} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="Situação de Promoção" defaultValue={emp.promotion} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField fullWidth id="outlined-basic" label="Lead atual" defaultValue={emp.actualLead} variant="filled" size="small" InputProps={{readOnly: true}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Nome" defaultValue={emp.name} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Cargo Atual" defaultValue={emp.jobTitle} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl sx={styles.formControl} size="small">
                            <InputLabel id="attribute-select-label" >Gênero</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={gender} label="Gênero" onChange={(event) => setGender(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={"F"}>Feminino</MenuItem>
                                <MenuItem value={"M"}>Masculino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <FormControl sx={styles.formControl} size="small">
                            <InputLabel id="attribute-select-label" >Status Funcionario</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={employeeStatus} label="Status Funcionario" onChange={(event) => setStatusEmp(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={"Active"}>Active</MenuItem>
                                <MenuItem value={"Disabled"}>Disabled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Cidade" defaultValue={emp.locationCity} variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl sx={styles.formControl} size="small">
                            <InputLabel id="attribute-select-label" >Rank Atual</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={emp.actualRank} label="Rank Atual" onChange={(event) => setCurrentPosition(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={"32-Manager"}>32-Manager</MenuItem>
                                <MenuItem value={"65-Senior Associate"}>65-Senior Associate</MenuItem>
                                <MenuItem value={"21-Senior Manager"}>21-Senior Manager</MenuItem>
                                <MenuItem value={"57-Administrative Intermediate"}>57-Administrative Intermediate</MenuItem>
                                <MenuItem value={"14-Exec Manager"}>14-Exec Manager</MenuItem>
                                <MenuItem value={"63-Assistant Director"}>63-Assistant Director</MenuItem>
                                <MenuItem value={"51-Intern (CS)"}>51-Intern (CS)</MenuItem>
                                <MenuItem value={"42-Senior"}>42-Senior</MenuItem>
                                <MenuItem value={"13-Executive Director"}>13-Executive Director</MenuItem>
                                <MenuItem value={"66-Associate"}>66-Associate</MenuItem>
                                <MenuItem value={"44-Staff/Assistant"}>44-Staff/Assistant</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Área de atuação" defaultValue={emp.smuName} variant="outlined" size="small"  InputProps={{ inputProps: {  } }}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Utilização" defaultValue={emp.utilization} variant="outlined" size="small"  InputProps={{ inputProps: {  } }}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
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
                    <Grid item xs={12} sm={6} md={4}>
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
                    {/* <Grid item xs={12} marginTop={1}><Typography variant="h6">Características</Typography></Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="attribute-select-label" >Característica</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={""} label="Caracteristica" onChange={(event) => setBusiness(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="status-select-label" >Status</InputLabel>
                            <Select labelId="status-select-label" id="status-select" value={status} label="Status" onChange={(event) => setStatus(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={0}>Need to Progress</MenuItem>
                                <MenuItem value={1}>Progressing</MenuItem>
                                <MenuItem value={2}>Differentiating</MenuItem>
                                <MenuItem value={3}>Strategic Impact</MenuItem>
                                <MenuItem value={4}>Promoção</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <IconButton sx={{ color: red[500] }} aria-label="upload picture" component="span"><HighlightOff /></IconButton >
                        <IconButton sx={{ color: green[500] }} aria-label="upload picture" component="span"><AddBox /></IconButton >
                    </Grid>
                    <Grid item xs={12} marginTop={1}><Typography variant="h6" >Empresa</Typography></Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth id="outlined-basic" label="Nome" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="business-select-label" >Setor do mercado</InputLabel>
                            <Select labelId="business-select-label" id="business-select" defaultValue={emp.serviceLine} value={business} label="Setor do mercado" onChange={(event) => setGender(event.target.value)}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} md={12} marginTop={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button color="secondary" variant="contained" onClick={() => {setOpen(true)}}>Simular Promoção</Button>
                            <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
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
                                        <Grid container item xs={12} spacing={3}>
                                            <Grid item xs={12} sm={6} md={2}>
                                                <TextField fullWidth id="outlined-basic" label="GPN" defaultValue={emp.gpn} variant="filled" size="small" InputProps={{readOnly: true}}/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Nome" defaultValue={emp.name} variant="filled" size="small" InputProps={{readOnly: true}}/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField fullWidth id="outlined-basic" label="Situação de Promoção" defaultValue={emp.promotion} variant="filled" size="small" InputProps={{readOnly: true}}/>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <TextField fullWidth id="outlined-basic" label="Lead atual" defaultValue={emp.actualLead} variant="filled" size="small" InputProps={{readOnly: true}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField fullWidth id="outlined-basic" defaultValue={emp.actualRank} label="Cargo atual" variant="filled" size="small" InputProps={{readOnly: true}}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField fullWidth id="outlined-basic" defaultValue={formatter.format(emp.salary)} label="Salário Atual" variant="filled" size="small" InputProps={{readOnly: true}}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField fullWidth id="outlined-basic" defaultValue={emp.futureRank} label="Novo Cargo" variant="filled" size="small" InputProps={{readOnly: true}}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <InputLabel htmlFor="standard-adornment-amount">Salário com Bonificação</InputLabel>
                                            <Input 
                                                fullWidth
                                                required={true}
                                                id="standard-adornment-amount"
                                                value={formatterN.format(emp.salary)}
                                                //onChange={handleChange('amount')}
                                                size='small'
                                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                            />
                                        </Grid>
                                        <Grid container item xs={12} spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Paper sx={{ p:1 }} variant='outlined'>
                                                    <Typography variant='subtitle1' >Budget Atual</Typography>
                                                    <Box sx={{ p:1 }}>
                                                        <Typography variant='h5'>{formatter.format(totalBudget)}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Paper sx={{ p:1 }} variant='outlined'>
                                                    <Typography variant='subtitle1' >Budget Restante</Typography>
                                                    <Box sx={{ p:1 }}>
                                                        <Typography variant='h5'>{formatter.format(totalBudget)}</Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Dialog>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}

export default Employee

Employee.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}