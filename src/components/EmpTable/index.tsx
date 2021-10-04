import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'GPN', width: 100 },
  { field: 'lead', headerName: 'Situação (Lead)', width: 150 },
  {
    field: 'fullName',
    headerName: 'Nome',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: "d-00001", lastName: 'Snow', firstName: 'Jon', lead: "Promotion" },
  { id: "d-00002", lastName: 'Lannister', firstName: 'Cersei', lead: "Promotion" },
  { id: "d-00003", lastName: 'Lannister', firstName: 'Jaime', lead: "Promotion" },
  { id: "d-00004", lastName: 'Stark', firstName: 'Arya', lead: "Promotion" },
  { id: "d-00005", lastName: 'Targaryen', firstName: 'Daenerys', lead: "Promotion" },
  { id: "d-00006", lastName: 'Melisandre', firstName: null, lead: "Promotion" },
  { id: "d-00007", lastName: 'Clifford', firstName: 'Ferrara', lead: "Promotion" },
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