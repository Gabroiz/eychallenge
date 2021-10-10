import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Grid, Typography, Paper} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { useFileUpload } from 'use-file-upload';
import { useForm } from 'react-hook-form';
//import "bootstrap/dist/css/bootstrap.min.css";
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import MultipleFileUploadField from './MultipleFileUploadField';
import { Formik } from 'formik';

const Input = styled('input')({
    display: 'none',
  });


export default function Imports() {
    return (
        <React.Fragment>
            <Formik initialValues={{}} onSubmit={() => {}}>
                {({ values, errors}) => (
                    <Grid container spacing={6} direction="column">
                        <MultipleFileUploadField/>
                    </Grid>
                )}
            </Formik>

        </React.Fragment>
/*         <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p:2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} marginTop={2}><Typography variant="h6">Teste</Typography></Grid>
                            <Grid item xs={6} md={4}>

                                <div {...getRootProps()}>
                                    <Input {...getInputProps()}>
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </Input>
                                </div>

                                <label htmlFor="contained-button-file">
                                   <Input accept="*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span" startIcon={<FileCopy />}>
                                        Importar CSV
                                    </Button> 
                                </label>
                            </Grid>  
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment> */


    )
}

