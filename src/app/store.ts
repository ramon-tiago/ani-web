import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { categoriesApiSlice, categoriesReducer } from "../features/categories";
import { apiSlice } from "../features/api/apiSlie";
import { castMembersSlice } from "../features/cast";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     categories: categoriesReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     [categoriesApiSlice.reducerPath]: apiSlice.reducer,
//   },
// });

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
    // [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    [castMembersSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
