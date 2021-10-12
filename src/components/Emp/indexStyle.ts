export const styles = {
    paperDefault: { p: 2 },
    boxDefault: { display: 'flex', height: '100%', mt: 3 },
    boxTable: { width: '100%' },
    dataGrid: { 
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none',
    }},
} as const;