import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice, categoriesApi } from "../api/apiSlie";
import { CategoryParams, Result, Results } from "../../types";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

const endpoint: string = "/category";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.search) query.append("search", params.search.toString());
  if (params.perPage) query.append("per_page", params.perPage.toString());
  if (params.isActive) query.append("is_active", params.isActive.toString());
  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };
  return `${endpoint}?${parseQueryParams(params)}`;
}

const deleteCategoryMutation = (category: Category) => ({
  url: `${endpoint}/${category.id}`,
  method: "DELETE",
});

const createCategoryMutation = (category: Category) => ({
  url: endpoint,
  method: "POST",
  body: category,
});

export const categoriesApiSlice = categoriesApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: "fdsafefdsa",
  name: "Olive",
  description: "",
  is_active: true,
  deleted_at: null,
  created_at: new Date(),
  updated_at: new Date(),
};

export const initialState = [
  category,
  { ...category, id: "fdsafefdsa-789", name: "Peach" },
  { ...category, id: "fdsafefdsa-123", name: "Apple" },
  { ...category, id: "fdsafefdsa-456", name: "Orange" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex((c) => c.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((c) => c.id === id);
  return (
    category ?? {
      id: "",
      name: "",
      description: "",
      is_active: false,
      deleted_at: null,
      created_at: null,
      updated_at: null,
    }
  );
};

export const categoriesReducer = categoriesSlice.reducer;
export const { createCategory, deleteCategory, updateCategory } =
  categoriesSlice.actions;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoriesApiSlice;
