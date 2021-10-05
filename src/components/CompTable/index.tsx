import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 100 },
  { field: 'name', headerName: 'Nome da Empresa', width: 150 },
  { field: 'business', headerName: 'Ramo de atuação', width: 150 },
  { field: 'country', headerName: 'País', width: 150 }
];

const rows = [
  { id: 1, name: 'Empresa 1', business: 'ramo de mercado', country: "Brasil" },
  { id: 2, name: 'Compania distribuidora', business: 'ramo de mercado', country: "Estados Unidos" },
  { id: 3, name: 'Sem tempo irmão S.A', business: 'ramo de mercado', country: "Inglaterra" }
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