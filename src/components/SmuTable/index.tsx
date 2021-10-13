import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 100} ,
  { field: 'country', headerName: 'country', flex: 0.1} ,
  { field: 'city', headerName: 'city', flex: 0.1} ,
  { field: 'sl', headerName: 'sl', flex: 0.1} ,
  { field: 'subSL', headerName: 'subSL', flex: 0.1} ,
  { field: 'smuName', headerName: 'smuName', flex: 0.1} ,
  { field: 'budget', headerName: 'budget', flex: 0.1} ,
  { field: 'totalBudget', headerName: 'totalBudget', flex: 0.1} ,
  { field: 'percentage', headerName: 'percentage', flex: 0.1} 
];

type Props = {
  rows: [];
};

const DataTable: React.FC<Props> = (props) => {

  const { rows } = props

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </Box>
  );
}

export default DataTable