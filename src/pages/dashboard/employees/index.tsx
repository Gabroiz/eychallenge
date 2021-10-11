import * as React from 'react';
import Layout from 'Components/Layout'
import Button from '@mui/material/Button';
import { Paper, Grid, Typography,  Box } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link';

import { styles } from 'Styles/dashboard/employees/indexStyle'
import Emp from 'Components/Emp';

import { InferGetServerSidePropsType } from 'next'
type EmpType = {
    id: number
    gpn: string
    name: string
    jobTitle: string
    promotion: string
    actualLead: string
    futureRank: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let url=`https://performance-tracker-fiap.herokuapp.com/employee-evaluation`
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${context.req.cookies['auth.token']}`)
    const config = {
        method: 'GET',
        headers: headers
    }

    const res = await fetch(url,config)
    const emps: EmpType[] = await res.json()
  
    return {
        props: {
            emps,
        },
    }
}
export default function Employees({ emps }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Emp rows={emps} pageRows={20} headerHeight={37} rowHeight={31} heightPaper={850} />
    )
}

Employees.getLayout = function getLayout(page: React.ReactElement) {
    return (
      <Layout>{page}</Layout>
    )
}