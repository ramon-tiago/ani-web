import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";

import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";
import { CategoryParams } from "../../types";
import { useGetCastMembersQuery } from "../cast";

export const CategoryList = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 1,
  });
  const [rowsPerPage] = useState([10, 25, 30]);
  const [search, setSearch] = useState("");

  const [options, setOptions] = useState({
    page: paginationModel.page,
    perPage: paginationModel.pageSize,
    search: "",
  });

  const { data, isFetching, error } = useGetCategoriesQuery(options, {});
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id: string) => {
    await deleteCategory({ id });
  };
  const handleFilterChange = async (filterModel: GridFilterModel) => {
    // if (filterModel.quickFilterValues?.length) {
    //   const search = filterModel.quickFilterValues.join('');
    //   options.search = search;
    //   setOptions({...options, search });
    // }
    // return setOptions({...options, search: '' });

    return setSearch(filterModel?.quickFilterValues?.join("") ?? "");
  };

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Success delete category", { variant: "success" });
    }
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Error delete category", { variant: "error" });
    }
    if (error) {
      console.error("Error fetching categories:", error);
      enqueueSnackbar("Error fetching categories", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar, error]);

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
        rowsPerPage={rowsPerPage}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleFilterChange={handleFilterChange}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      ></CategoriesTable>
    </Box>
  );
};
