import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

interface PaginationModel {
  page: number;
  pageSize: number;
}

type PropsTableDataGrid = {
  columns: GridColDef[];
  rows: GridRowsProp;
  rowsPerPage: number[];
  paginationModel: PaginationModel;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  setPaginationModel: (model: PaginationModel) => void;
  isFetching: boolean;
  rowCount: number;
};
export const TableDataGrid = (props: PropsTableDataGrid) => {
  const {
    paginationModel,
    columns = [],
    rows,
    rowsPerPage = [15, 30, 50, 100],
    isFetching,
    rowCount,
    handleFilterChange,
    setPaginationModel,
  } = props;

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };
  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        initialState={{ pagination: { paginationModel } }}
        columns={columns}
        pagination={true}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableRowSelectionOnClick={true}
        filterMode="server"
        paginationMode={"server"}
        loading={isFetching}
        rowCount={rowCount}
        rows={rows}
        slotProps={componentProps}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection={false}
        pageSizeOptions={rowsPerPage}
        onFilterModelChange={handleFilterChange}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};
