import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const Input = styled('input')({
    display: 'none',
  });

export default function Imports() {
    const [importOption, setimportOption] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setimportOption(event.target.value);
    };
    
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} marginTop={1}><Typography variant="h6">Importações</Typography></Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl sx={{ width: "100%"  }} size="small">
                                    <InputLabel id="attribute-select-label" >Base de Informações</InputLabel>
                                    <Select labelId="attribute-select-label" id="attribute-select" value={importOption} label="Base de Informações" onChange={handleChange}>
                                        <MenuItem value=""> <em>None</em> </MenuItem>
                                        <MenuItem value={0}>Funcionários</MenuItem>
                                        <MenuItem value={1}>Empresas</MenuItem>
                                        <MenuItem value={1}>Salários</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button disabled variant="contained" component="span" startIcon={<FileCopy />}>
                                        Importar CSV
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
        
    )
}