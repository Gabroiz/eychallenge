import * as React from 'react';
import Layout from 'Components/Layout'
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link';

import { styles } from 'Styles/dashboard/employees/indexStyle'
import Emp from 'Components/Emp';
export default function Employees() {
    
    return (
        <Emp/>
    )
}

Employees.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}