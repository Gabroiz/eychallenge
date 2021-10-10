import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'GPN', width: 100 },
  { field: 'nome', headerName: 'Nome', width: 100 },
];

const rows = [
  { id: 1, nome: 'Snow' },
];

export default function DataTable() {

  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}