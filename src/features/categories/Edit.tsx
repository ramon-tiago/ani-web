import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Category,
  selectCategoryById,
  updateCategory,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id;
  const { data: category, isFetching } = useGetCategoriesQuery({ id });
  const [isDisabled] = useState(false);
  const categoory = useAppSelector((state) =>
    selectCategoryById(state, id ?? "")
  );
  const [categoryState, setCategoryState] = useState<Category>(categoory);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Success updating category", { variant: "success" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category Page</Typography>
          </Box>
        </Box>

        <CategoryForm
          categoory={categoryState}
          handleChange={handleChange}
          isDisabled={isDisabled}
          handleToggle={handleToggle}
          onSubmit={handleoSubmit}
        />
      </Paper>
    </Box>
  );
};
