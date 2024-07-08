import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({}),
  // endpoints: (builder) => ({
  //   fetchCount: builder.query<number, void>({
  //     query: () => ({
  //       url: "/count",
  //       method: "GET",
  //     }),
  //   }),
  // }),
});

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({}), // Inicialize sem endpoints
});
