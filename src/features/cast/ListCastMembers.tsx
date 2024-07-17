import { useEffect, useState } from "react";
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from "./castMembersSile";
import { CastMembersParams } from "../../types";
import { useSnackbar } from "notistack";
import { GridFilterModel } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ListCastMembers() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 1,
  });
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const [search, setSearch] = useState("");

  const [options, setOptions] = useState({
    page: paginationModel.page,
    perPage: paginationModel.pageSize,
    search: "",
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
      options.search = search;
      setSearch(search);
    }
    return setSearch("");
  };

  useEffect(() => {
    setOptions((op) => ({
      ...op,
      page: paginationModel.page,
      perPage: paginationModel.pageSize,
    }));
  }, [paginationModel]);

  useEffect(() => {
    if (deleteCastStatus.isSuccess)
      enqueueSnackbar("Success delete category", { variant: "success" });
    if (deleteCastStatus.isError)
      enqueueSnackbar("Error delete category", { variant: "error" });
    if (error) {
      console.error("Error fetching cast members:", error);
      enqueueSnackbar("Error fetching cast members", { variant: "error" });
    }
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
      {/* <CategoriesTable
        data={data}
        rowsPerPage={rowsPerPage}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      ></CategoriesTable> */}
    </Box>
  );
}
