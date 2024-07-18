import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { ResultsCast } from "../../../types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface PaginationModel {
  page: number;
  pageSize: number;
}

type Props = {
  data: ResultsCast | undefined;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleDelete: (id: string) => void;
  paginationModel: PaginationModel;
  setPaginationModel: (model: PaginationModel) => void;
};
export function CastMemberTable({
  data,
  isFetching,
  rowsPerPage,
  handleFilterChange,
  handleDelete,
  paginationModel,
  setPaginationModel,
}: Props) {
  function mapDataToGridRows(data: ResultsCast) {
    const { data: castMembers } = data;
    return castMembers.map((cast) => ({
      ...cast,
    }));
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total ?? 0;

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: renderTypeCell,
    },
    {
      field: "id",
      headerName: "Actions",
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
  function renderTypeCell(params: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {params.value === 1 ? "Diretor" : "Actor"}
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

        {/* <Link to={`/categories/edit/${params.row.id}`}>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </Link> */}
      </IconButton>
    );
  }

  useEffect(() => {
    console.log("paginationModel", paginationModel);
  }, [paginationModel]);

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
