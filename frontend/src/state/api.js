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
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  reducerPath: "api",
  tagTypes: [
    "Questions",
    "User",
    "classDetails",
    "Class",
    "Todo",
    "MessageClass",
    "ClassByInstructorId",
    "UnitByClass",
  ],
  endpoints: (build) => ({
    getFileFromDrive: build.query({
      query: (fileId) => `file/${fileId}`,
    }),
    getHomeWorkByHomeworkId: build.query({
      query: (homeworkId) => `bai-tap/${homeworkId}`,
      providesTags: ["HomeWorkByHomeworkId"],
    }),
    getFileHomeworkByHomeworkId: build.query({
      query: (homeworkId) => `fileBaiTap/${homeworkId}`,
      providesTags: ["FileHomeWorkByHomeworkId"],
    }),
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
    getMessageClass: build.query({
      query: ({ class_id, acc_id }) =>
        `/tin-nhan/lop-hoc/${class_id}/tai-khoan/${acc_id}`,
      providesTags: ["MessageClass"],
    }),
    postMessageClass: build.mutation({
      query: ({ noiDung, acc_id, chatGroup_id }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `tin-nhan`,
        method: "POST",
        body: { noiDung, ma_taiKhoan: acc_id, ma_nhomChat: chatGroup_id },
      }),
      invalidatesTags: ["MessageClass"],
    }),
    postHomework: build.mutation({
      query: ({
        machuong,
        tieuDe,
        noidungbaitap,
        noidungdapan,
        thoigianbatdau,
        thoigianketthuc,
        congkhaidapan,
        nopbu,
      }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `bai-tap/${machuong}`,
        method: "POST",
        body: {
          tieuDe: tieuDe,
          noiDungBaiTap: noidungbaitap,
          noiDungDapAn: noidungdapan,
          thoiGianBatDau: thoigianbatdau,
          thoiGianKetThuc: thoigianketthuc,
          congKhaiDapAn: congkhaidapan,
          nopBu: nopbu,
        },
      }),
      // invalidatesTags: ["Todo"],
    }),
    postHomeworkWork: build.mutation({
      query: ({ ma_baiTap, ma_taiKhoan, nopTre }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `bai-tap/${ma_baiTap}/tai-khoan/${ma_taiKhoan}`,
        method: "POST",
        body: {
          noiDung: "",
          ma_taiKhoan: ma_taiKhoan,
          ma_baiTap: ma_baiTap,
          nhanXet: "",
          diem: -1,
          nopTre: nopTre,
        },
      }),
      // invalidatesTags: ["Todo"],
    }),
    postHomeworkFileWork: build.mutation({
      query: ({ ma_baiTap, ma_taiKhoan, file }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `fileBaiTap/${ma_baiTap}/taiKhoan/${ma_taiKhoan}`,
        method: "POST",
        body: {
          ma_file: file,
        },
      }),
      // invalidatesTags: ["Todo"],
    }),
    getClassByInstructorId: build.query({
      query: (uid) => ({
        url: `lopHoc/taiKhoan/${uid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["ClassByInstructorId"],
    }),

    getUnitByClassId: build.query({
      query: (cid) => ({
        url: `/chuong/lopHoc/${cid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["UnitByClass"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetUserQuery,
  useGetClassDetailsQuery,
  useGetClassQuery,
  useGetTodoQuery,
  useGetMessageClassQuery,
  usePostMessageClassMutation,
  useGetClassByInstructorIdQuery,
  useGetUnitByClassIdQuery,
  usePostHomeworkMutation,
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
} = api;
