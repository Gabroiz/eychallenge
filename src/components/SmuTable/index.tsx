import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';



type Props = {
  rows: [];
  columns: GridColDef[];
};

const DataTable: React.FC<Props> = (props) => {

  const { rows, columns } = props

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