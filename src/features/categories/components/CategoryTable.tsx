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
import { useEffect, useState } from "react";

interface PaginationModel {
  page: number;
  pageSize: number;
}

type Props = {
  data: Results | undefined;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleDelete: (id: string) => void;
  paginationModel: PaginationModel;
  setPaginationModel: (model: PaginationModel) => void;
};
export function CategoriesTable({
  data,
  isFetching,
  rowsPerPage,
  handleFilterChange,
  handleDelete,
  paginationModel,
  setPaginationModel,
}: Props) {
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

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
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

  function renderNameCell(params: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${params.id}`}
      >
        <Typography color="primary">{params.value}</Typography>
      </Link>
    );
  }

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  useEffect(() => {
    console.log("paginationModel", paginationModel);
  }, [paginationModel]);

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

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        initialState={{
          pagination: { paginationModel },
        }}
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
}
