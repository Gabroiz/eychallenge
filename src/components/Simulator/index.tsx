
import * as React from 'react';
import { AppBar, Button, Container, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Simulator(){
    
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog fullScreen open={open} onClose={() => {setOpen(false)}}>
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={() => {setOpen(false)}}
                aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Simulação de Promoção
                </Typography>
                <Button autoFocus color="secondary" variant="contained" onClick={() => {setOpen(false)}}>
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
    )
}



