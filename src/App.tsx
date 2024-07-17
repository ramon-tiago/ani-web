import { Box, ThemeProvider, Typography } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";

import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
} from "./features/categories";
import { ListCastMembers } from "./features/cast";

const PageNotFound = () => (
  <Box sx={{ color: "white" }}>
    <Typography variant="h1" component="h1">
      404
    </Typography>
    <Typography variant="h2" component="h2">
      Page not found
    </Typography>
  </Box>
);
function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              {/* Category */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/category/new" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              {/* Cast Members */}

              <Route path="/cast-members" element={<ListCastMembers />} />
              <Route path="/cast-member/new" element={<CategoryCreate />} />
              <Route path="/cast-members/edit/:id" element={<CategoryEdit />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
