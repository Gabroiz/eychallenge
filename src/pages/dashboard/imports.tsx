import * as React from 'react';
import Layout from 'Components/Layout'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import { FileCopy, Publish } from '@mui/icons-material';
import { styles } from 'Styles/dashboard/importsStyle';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from '../../components/Uploads/SingleFileUploadWithProgress';

const Input = styled('input')({
    display: 'none',
});

export interface UploadbleFile {
    file: File;
    errors: FileError[];
    url?: string;
}

export default function Imports() {
    const [importOption, setimportOption] = React.useState('');
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [files, setFiles] = useState<UploadbleFile[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setimportOption(event.target.value);
        setBtnDisabled(!event.target.value);
    };


    const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
        const mappedAcc = accFiles.map(file => ({ file, errors: [] }));
        setFiles(curr => [...curr, ...mappedAcc, ...rejFiles])
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    function onUpload(file: File, url: string) {
        setFiles((curr) => curr.filter((fw) => {
            if (fw.file === file) {
                return { ...fw, url };
            }
            return fw;
        }));
    }

    function onDelete(file: File) {
        setFiles(curr =>
            curr.filter(fw => fw.file !== file)
        )
    }

    function onSubmit(file: File){

    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={styles.paper}>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item xs={12}><Typography sx={styles.title} variant="h6">Importações</Typography></Grid>
                        
                        <Grid item xs={6} md={3}>
                            <FormControl sx={{ width: "100%" }} size="small">
                                <InputLabel id="attribute-select-label" >Base de Informações</InputLabel>
                                <Select labelId="attribute-select-label" id="attribute-select" value={importOption} label="Base de Informações" onChange={handleChange}>
                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                    <MenuItem value={1}>Avaliação de Funcionários</MenuItem>
                                    <MenuItem value={2}>Departamentos</MenuItem>
                                    <MenuItem value={3}>Salários</MenuItem>
                                    <MenuItem value={4}>Utilização</MenuItem>
                                    <MenuItem value={5}>Dissídio</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={8}>
                            <div {...getRootProps()}>
                                <Input {...getInputProps()} />
                                <Button variant="outlined" size="large" startIcon={<FileCopy />}>Clique aqui ou arraste aqui os arquivos .CSV!</Button>
                                {/* {JSON.stringify(files)}  */}
                            </div>
                            {/* {JSON.stringify(files)}  */}
                        </Grid>

                        <Grid item xs={10} md={10}>
                            {files.map((fileWrapper, idx) => (
                                <SingleFileUploadWithProgress onDelete={onDelete} key={idx} file={fileWrapper.file} />
                            ))}
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <label htmlFor="contained-button-file">
                                <Input accept="*" id="contained-button-file" multiple type="file" disabled onChange={handleChange} />
                                <Button 
                                    variant="contained" 
                                    component="span" 
                                    startIcon={<Publish />} 
                                    disabled={btnDisabled}
                                >
                                    Importar CSV
                                </Button>
                            </label>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

Imports.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}