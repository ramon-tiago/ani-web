import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Results } from "../../../types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: number) => void;
};
export function CategoriesTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  // const handleDelete = async (id: string) => {
  //   await deleteCategory({ id });

  // };

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      ...category,
      created_at: category.created_at
        ? new Date(category.created_at).toLocaleDateString("pt-BR")
        : "",
    }));
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total ?? 0;

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActiionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
      >
        <DeleteIcon />

        <Link to={`/categories/edit/${params.row.id}`}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Link>
      </IconButton>
    );
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      flex: 1,
      renderCell: renderActiionsCell,
    },
  ];

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        columns={columns}
        pagination={true}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        filterMode={"server"}
        loading={isFetching}
        paginationMode={"server"}
        rowCount={rowCount}
        rows={rows}
        slotProps={componentProps}
        slots={{ toolbar: GridToolbar }}
        checkboxSelection={false}
        pageSizeOptions={rowsPerPage}
      ></DataGrid>
    </Box>
  );
}

// handleOnPageChange,
//   handleFilterChange,
//   handleOnPageSizeChange,
