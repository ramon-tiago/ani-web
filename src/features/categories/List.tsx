import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";

export const CategoryList = () => {
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
  const { data, isFetching, error } = useGetCategoriesQuery(options, {});
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    await deleteCategory({ id });
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
    if (deleteCategoryStatus.isSuccess)
      enqueueSnackbar("Success delete category", { variant: "success" });
    if (deleteCategoryStatus.isError)
      enqueueSnackbar("Error delete category", { variant: "error" });
    if (error)
      enqueueSnackbar("Error fetching categories", { variant: "error" });
  }, [deleteCategoryStatus, enqueueSnackbar, error]);

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
          to="/category/new"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <CategoriesTable
        data={data}
        rowsPerPage={options.rowsPerPage}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange}
        paginationModel={paginationModel}
        setPaginationModel={handleOnPageChange}
      ></CategoriesTable>
    </Box>
  );
};
