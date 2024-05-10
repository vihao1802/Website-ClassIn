import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (build) => ({
    postForgotPassword: build.mutation({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { usePostForgotPasswordMutation } = api;
