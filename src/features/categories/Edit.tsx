import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Category,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id ?? "";
  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: null,
    updated_at: null,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategory(categoryState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success updating category", { variant: "success" });
    }
    if (status.error)
      enqueueSnackbar("Category not updated", { variant: "error" });
  }, [enqueueSnackbar, status.isSuccess, status.error]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category Page</Typography>
          </Box>
        </Box>

        <CategoryForm
          isLoading={false}
          categoory={categoryState}
          isDisabled={status.isLoading}
          onSubmit={handleoSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
