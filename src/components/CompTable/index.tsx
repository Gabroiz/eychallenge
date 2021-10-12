import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

const rows = [
  { id: 1, country: "Brasil", city: " teste ", sl: " teste ", subSL: " teste ", smuName: " teste ", budget: 50, totalBudget: 100, percentage: 0.2 },
  { id: 2, country: "Estados Unidos", city: " teste ", sl: " teste ", subSL: " teste ", smuName: " teste ", budget: 50, totalBudget: 100, percentage: 0.2 },
  { id: 3, country: "Inglaterra", city: " teste ", sl: " teste ", subSL: " teste ", smuName: " teste ", budget: 50, totalBudget: 100, percentage: 0.2 }
];

export default function DataTable() {
  
  return (
    <div style={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}