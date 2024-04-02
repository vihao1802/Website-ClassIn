import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "classinApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admin",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      provideTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api; */

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Questions", "User", "classDetails", "Class", "Todo"],
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (uid) => `cauHoi/taiKhoan/${uid}`,
      providesTags: ["Questions"],
    }),
    getUser: build.query({
      query: (uid) => ({
        url: `taiKhoan/${uid}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getClassDetails: build.query({
      query: (cid) => `lopHoc/lopHoc/${cid}`,
      providesTags: ["ClassDetails"],
    }),
    getClass: build.query({
      query: (uid) => `lopHoc/${uid}`,
      providesTags: ["Class"],
    }),
    getTodo: build.query({
      query: ({ acc_id, selectedClass, selectedCategory }) =>
        `tai-khoan/${acc_id}/bai-tap/de-kiem-tra/filter?selectedClass=${selectedClass}&selectedCategory=${selectedCategory}`,
      providesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetUserQuery,
  useGetClassDetailsQuery,
  useGetClassQuery,
  useGetTodoQuery,
} = api;
