import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'gpn', headerName: 'GPN', width: 100 },
  { field: 'nome', headerName: 'Nome', width: 100 },
];

const rows = [
  { gpn: "d-00001", nome: 'Snow' },
];

export default function DataTable() {

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}