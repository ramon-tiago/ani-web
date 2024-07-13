import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

export const CategoryCreate = () => {
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);

  const [category, setCategory] = useState<Category>({
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
    await createCategory(category);
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, checked } = e.target;
    setCategory({ ...category, [name]: checked });
  };

  useEffect(() => {
    if (status.isSuccess) {
      setIsDisabled(true);
      enqueueSnackbar("Success create category", { variant: "success" });
    }
    if (status.error)
      enqueueSnackbar("Category not created", { variant: "error" });
  }, [enqueueSnackbar, status.isSuccess, status.error]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
            <CategoryForm
              categoory={category}
              handleChange={handleChange}
              isDisabled={isDisabled}
              handleToggle={handleToggle}
              onSubmit={handleoSubmit}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
