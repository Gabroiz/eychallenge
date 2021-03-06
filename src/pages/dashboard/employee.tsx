import * as React from 'react';
import Button from '@mui/material/Button';
import { Paper, IconButton, Grid, TextField, Typography, Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Box } from '@mui/material';
import { AddBox, HighlightOff} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';


export default function Employee() {
    const [status, setStatus] = React.useState('');
    const [attribute, setAttribute] = React.useState('');
    const [currentPosition, setCurrentPosition] = React.useState('');
    const [business, setBusiness] = React.useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
        setAttribute(event.target.value);
        setCurrentPosition(event.target.value);
        setBusiness(event.target.value);
    };

    return (
        <React.Fragment>
            <Paper sx={{ p:5 }}>  
                <Grid container spacing={2}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={6} md={3}>
                            <TextField fullWidth id="outlined-basic" label="GPN" defaultValue="000000001" variant="filled" size="small" InputProps={{readOnly: true,}}/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <TextField fullWidth id="outlined-basic" label="Situação (Lead)" defaultValue="Promotion" variant="filled" size="small" InputProps={{readOnly: true,}}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth id="outlined-basic" label="Nome" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth id="outlined-basic" label="Sobrenome" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="attribute-select-label" >Cargo Atual</InputLabel>
                            <Select labelId="attribute-select-label" id="attribute-select" value={attribute} label="Cargo Atual" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                                <MenuItem value={0}>Staff/Assistent</MenuItem>
                                <MenuItem value={1}>Senior</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Senior Manager</MenuItem>
                                <MenuItem value={4}>Executive Director</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="País de atuação" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Office location" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Hiring Date" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Last Promotion Date" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth id="outlined-basic" label="Utilização" variant="outlined" size="small"/>
                    </Grid>

                    <Grid item xs={12} marginTop={2}><Typography variant="h6">Características</Typography></Grid>
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
                    <Grid item xs={12} marginTop={2}><Typography variant="h6" >Empresa</Typography></Grid>
                    <Grid item xs={6} md={6}>
                        <TextField fullWidth id="outlined-basic" label="Nome" variant="outlined" size="small"/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl sx={{ width: "100%"  }} size="small">
                            <InputLabel id="business-select-label" >Ramo de atuação</InputLabel>
                            <Select labelId="business-select-label" id="business-select" value={business} label="Ramo de atuação" onChange={handleChange}>
                                <MenuItem value=""> <em>None</em> </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} marginTop={2}>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button color="secondary" variant="contained">Simular Promoção</Button>
                        </Box>
                    </Grid>
                        
                </Grid>
            </Paper>
        </React.Fragment>
    )
}