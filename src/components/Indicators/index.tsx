import { Grid, Paper, Typography } from "@mui/material";
import React from "react";




export default function Indicators() {
    
    const height = 160
    const elevation = 0
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Budget </Typography>
                </Paper>
            </Grid>
            <Grid item  xs={4}>
            <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Promotions </Typography>
                </Paper>
            </Grid>
            <Grid item  xs={4}>
                <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Progress </Typography>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Budget </Typography>
                </Paper>
            </Grid>
            <Grid item  xs={4}>
            <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Promotions </Typography>
                </Paper>
            </Grid>
            <Grid item  xs={4}>
                <Paper sx={{p:1, height: height}} elevation={elevation}>
                <Typography> Progress </Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}