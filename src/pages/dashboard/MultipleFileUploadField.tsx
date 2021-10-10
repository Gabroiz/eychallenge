import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Grid, Typography, Paper, Box} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { useFileUpload } from 'use-file-upload';
import { useForm } from 'react-hook-form';
//import "bootstrap/dist/css/bootstrap.min.css";
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';

const Input = styled('input')({
    display: 'none',
  });

export interface UploadbleFile {
    file: File;
    errors: FileError[];
    url?: string;
}


export default function MultipleFileUploadField(){
    //const { register, handleSubmit } = useForm();
    const [files, setFiles] = useState<UploadbleFile[]>([]);
    const onDrop = useCallback((accFiles:File[], rejFiles:FileRejection[]) => {
        const mappedAcc = accFiles.map(file => ({file, errors: []}));
        setFiles(curr => [...curr, ...mappedAcc, ...rejFiles])
      }, []);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    
    function onDelete(file: File){
        setFiles(curr => 
            curr.filter(fw => fw.file !== file)
        )
    }

    function onUpload(file: File, url: string){
        setFiles((curr) => curr.filter((fw) => {
            if(fw.file === file) {
                return {...fw, url};
            }
            return fw;
        }));
    }

    return (
        <React.Fragment>
            
                <Grid item>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Box justifyContent="center" alignItems="center" minHeight="100vh" component="span" sx={{ p: 2, border: '3px dashed grey' }}>
                            <Button>Clique aqui ou arraste aqui os arquivos .CSV!</Button>
                        </Box>
                        
                         {/* {JSON.stringify(files)}  */}
                    </div>
                    {/* {JSON.stringify(files)}  */}
                </Grid>
               
                {files.map((fileWrapper, idx) =>(
                    <SingleFileUploadWithProgress onUpload={onUpload} onDelete={onDelete} key={idx} file={fileWrapper.file}/>
                ))}
            
        </React.Fragment>
    )
}