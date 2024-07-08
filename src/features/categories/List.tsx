import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  // deleteCategory,
  selectCategories,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";

import { GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export const CategoryList = () => {
  const { data, isFetching, error } = useGetCategoriesQuery("", {});
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  // const handleDelete = async (id: string) => {
  //   // dispatch(deleteCategory(id));
  // enqueueSnackbar("Success delete category", { variant: "success" });
  // };
  const handleDelete = async (id: string) => {
    await deleteCategory({ id });
  };

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Success delete category", { variant: "success" });
    }
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Error delete category", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

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
    </Box>
  );
};
