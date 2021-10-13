import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { api } from "services/api";

var formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    
    minimumFractionDigits: 2, 
    maximumFractionDigits: 3, 
});

export default function Indicators() {
    
    const height = 160
    const elevation = 0

    const [indicators, setIndicators] = React.useState({});
    
    useEffect(() => {
        getIndicators();
    }, [])

    async function getIndicators() {
        await api.get('https://performance-tracker-fiap.herokuapp.com/kpi').then((response) => {
            setIndicators(response.data)
        })
    }

    
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Budget Total </Typography>
                    <Box sx={{ p:1, display: 'flex', justifyContent:'center'}}>
                        <Typography variant="h3">{formatter.format(indicators.totalBudget)}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Total Utilizado Dissídio </Typography>
                    <Box sx={{ p:1 }}>
                        <Typography variant="h3">{formatter.format(indicators.totalDissent)}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Budget Restante </Typography>
                    <Box sx={{ p:1 }}>
                        <Typography variant="h3">{formatter.format(indicators.budget)}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Promoções realizadas </Typography>
                    <Box sx={{ p:1, display: 'flex', justifyContent:'center' }}>
                        <Typography variant="h3">{indicators.amountPromoted}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Funcionários status Promotion </Typography>
                    <Box sx={{ p:1 }}>
                        <Typography variant="h3">{indicators.amountPromotion}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{p:2, height: height, display:'flex', flexDirection:'column', alignItems:'center'}} elevation={elevation}>
                    <Typography variant="h6" > Funcionários status Progress </Typography>
                    <Box sx={{ p:1 }}>
                        <Typography variant="h3">{indicators.amountProgression}</Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}