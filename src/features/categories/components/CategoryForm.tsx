import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { Category } from "../categorySlice";
import { Link } from "react-router-dom";

type Props = {
  categoory: Category;
  handleChange: (e: any) => void;
  handleToggle: (e: any) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export const CategoryForm = ({
  categoory,
  handleChange,
  handleToggle,
  onSubmit,
  isDisabled,
  isLoading,
}: Props) => {
  return (
    <Box p={2}>
      <form onSubmit={onSubmit} onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Name"
                name="name"
                required
                value={categoory.name}
                disabled={isDisabled}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                name="description"
                required
                value={categoory?.description ?? ""}
                disabled={isDisabled}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    checked={categoory?.is_active ?? false}
                    onChange={handleToggle}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
