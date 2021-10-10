import { Button, Grid } from "@mui/material";
import React from "react";

export interface FileHeaderProps{
    file: File;
    onDelete: (file: File) => void;
}

export function FileHeader({file, onDelete}: FileHeaderProps){
    return (
        <Grid container justifyContent="space-between">
            <Grid item>{file.name}</Grid>
            <Grid item><Button size="small" onClick={() => onDelete(file)}>Excluir</Button></Grid>
            
        </Grid>
    );
}
