import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./castMembersSile";
import { CastMemberTable } from "./components/CastMemberTable";

export function ListCastMembers() {
  const [paginationModel] = useState({
    pageSize: 25,
    page: 1,
  });
  const [options, setOptions] = useState({
    page: paginationModel.page,
    perPage: paginationModel.pageSize,
    search: "",
    rowsPerPage: [10, 25, 50, 100],
  });
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching, error } = useGetCastMembersQuery(options, {});
  const [deleteCast, deleteCastStatus] = useDeleteCastMemberMutation();

  const handleDelete = async (id: string) => {
    await deleteCast({ id });
  };

  const handleFilterChange = async (filterModel: GridFilterModel) => {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      setOptions((prev) => ({ ...prev, search }));
    } else {
      setOptions((prev) => ({ ...prev, search: "" }));
    }
  };

  const handleOnPageChange = ({
    pageSize,
    page,
  }: {
    pageSize: number;
    page: number;
  }) => {
    setOptions((prev) => ({
      ...prev,
      page,
      perPage: pageSize,
    }));
  };

  useEffect(() => {
    if (deleteCastStatus.isSuccess)
      enqueueSnackbar("Success delete category", { variant: "success" });
    if (deleteCastStatus.isError)
      enqueueSnackbar("Error delete category", { variant: "error" });
    if (error)
      enqueueSnackbar("Error fetching cast members", { variant: "error" });
  }, [deleteCastStatus, enqueueSnackbar, error]);

  if (error) {
    return <Typography variant="h2">Error fetching cast members</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="fles" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-member/new"
          style={{ marginBottom: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMemberTable
        data={data}
        rowsPerPage={options.rowsPerPage}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange}
        paginationModel={paginationModel}
        setPaginationModel={handleOnPageChange}
      ></CastMemberTable>
    </Box>
  );
}
