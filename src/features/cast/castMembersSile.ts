import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice, categoriesApi } from "../api/apiSlie";
import {
  CastMembers,
  CastMembersParams,
  ResultCast,
  ResultsCast,
} from "../../types";

const endpoint = "/cast-member";

export const initialState: CastMembers = {
  id: "",
  name: "",
  type: 0,
  deleted_at: null,
  created_at: null,
  updated_at: null,
};

function parseQueryParams(params: Partial<CastMembersParams>) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.perPage) query.append("perPage", params.perPage.toString());
  if (params.search) query.append("search", params.search.toString());
  if (params.type) query.append("type", params.type.toString());
  return query.toString();
}

function getCast({
  page = 1,
  perPage = 10,
  search = "",
  type,
}: Partial<CastMembersParams>) {
  const params = { page, perPage, search, isActive: true, type };
  return `${endpoint}?${parseQueryParams(params)}`;
}

const getCastMember = (cast: CastMembers) => ({
  url: `${endpoint}/${cast.id}`,
  method: "GET",
});

const deleteCastMember = (cast: CastMembers) => ({
  url: `${endpoint}/${cast.id}`,
  method: "DELETE",
});

const createCastMutation = (cast: CastMembers) => ({
  url: endpoint,
  method: "POST",
  body: cast,
});

const updateCastMutation = (cast: CastMembers) => ({
  url: `${endpoint}/${cast.id}`,
  method: "PUT",
  body: cast,
});

export const castMembersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCastMembers: builder.query<ResultsCast, CastMembersParams>({
      query: getCast,
      providesTags: ["CastMembers"],
    }),
    getCastMember: builder.query<ResultCast, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    getCastMemberById: builder.query<ResultCast, string>({
      query: (id) => ({
        url: `${endpoint}/${id}`,
      }),
    }),
    deleteCastMember: builder.mutation<ResultCast, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    createCastMember: builder.mutation<ResultCast, CastMembers>({
      query: createCastMutation,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: builder.mutation<ResultCast, CastMembers>({
      query: updateCastMutation,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMemberQuery,
  useGetCastMembersQuery,
  useDeleteCastMemberMutation,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
} = castMembersSlice;
