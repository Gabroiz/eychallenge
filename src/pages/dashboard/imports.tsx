import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Grid, Typography} from '@mui/material';
import { FileCopy } from '@material-ui/icons';

const Input = styled('input')({
    display: 'none',
  });

export default function Imports() {

    return (
        <Container style={{ width: '100%' }}>

            <Grid container spacing={2}>
                <Grid item xs={12} marginTop={2}><Typography variant="h6">Funcionários</Typography></Grid>

                <Grid item xs={6} md={4}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span" startIcon={<FileCopy />}>
                        Importar CSV
                        </Button>
                    </label>
                </Grid>
                
                <Grid item xs={12} marginTop={2}><Typography variant="h6" >Empresas</Typography></Grid>
                <Grid item xs={6} md={6}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" component="span" startIcon={<FileCopy />}>
                        Importar CSV
                        </Button>
                    </label>
                </Grid>
                
                    
            </Grid>
        </Container>
    )
}