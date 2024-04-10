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
  tagTypes: [
    "Questions",
    "User",
    "Class",
    "Units",
    /* "classDetails",
    "UnitAcitvities",
    "StudentsByClassId",
    "TestByTestId",
    "TestDetails",
    "QuestionDetails",
    "ClassByInstructorId",
    "UserSubmissionsDetails",
    "WorkDetailsByTestId",
    "WorkInfoByWorkId",
    "UnregisteredUsers" */
    ,
  ],
  endpoints: (build) => ({
    // GET METHODS
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
    getUnits: build.query({
      query: (unitId) => `chuong/${unitId}`,
      providesTags: ["Units"],
    }),
    getUnitActivities: build.query({
      query: (cid) => `chuong/${cid}/hoatdong`,
      providesTags: ["UnitActivities"],
    }),
    getStudentsByClassId: build.query({
      query: (cid) => `lopHoc/${cid}/taiKhoan`,
      providesTags: ["StudentsByClassId"],
    }),
    getTestByTestId: build.query({
      query: (tid) => `deKiemTra/${tid}`,
      providesTags: ["TestByTestId"],
    }),
    getTestDetails: build.query({
      query: (tid) => `deKiemTra/${tid}/chiTiet`,
      providesTags: ["TestDetails"],
    }),
    getQuestionsDetails: build.query({
      query: (uid) => `cauHoi/taiKhoan/${uid}/chiTiet`,
      providesTags: ["QuestionDetails"],
    }),
    getClassByInstructorId: build.query({
      query: (uid) => `lopHoc/taiKhoan/${uid}`,
      providesTags: ["ClassByInstructorId"],
    }),
    getUserSubmissionsDetails: build.query({
      query: (tid) => `deKiemTra/${tid}/getSubmissionDetails`,
      providesTags: ["UserSubmissionsDetails"],
    }),
    getWorkDetailsByTestId: build.query({
      query: (wid) => `chiTietBaiLamKiemTra/baiLamKiemTra/${wid}`,
      providesTags: ["WorkDetailsByTestId"],
    }),
    getWorkInfoByWorkId: build.query({
      query: (wid) => `baiLamKiemTra/${wid}`,
      providesTags: ["WorkInfoByWorkId"],
    }),
    getUnregisteredUsers: build.query({
      query: (cid) => `taiKhoan/${cid}/unregistered`,
      providesTags: ["UnregisteredUsers"],
    }),

    // POST METHODS
    postUserResigeter: build.mutation({
      query: (data) => ({
        url: "thamGiaLopHoc",
        method: "POST",
        body: data,
      }),
      providesTags: ["postUserResigeter"],
    }),

    // DELETE METHODS
    deleteUserFromClass: build.mutation({
      query: (data) => ({
        url: `thamGiaLopHoc/${data.ma_lopHoc}/${data.ma_taiKhoan}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudentsByClassId"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetUserQuery,
  useGetClassDetailsQuery,
  useGetClassQuery,
  useGetUnitActivitiesQuery,
  useGetStudentsByClassIdQuery,
  useGetTestByTestIdQuery,
  useGetUnitsQuery,
  useGetTestDetailsQuery,
  useGetQuestionsDetailsQuery,
  useGetClassByInstructorIdQuery,
  useGetUserSubmissionsDetailsQuery,
  useGetWorkDetailsByTestIdQuery,
  useGetWorkInfoByWorkIdQuery,
  useGetUnregisteredUsersQuery,
  usePostUserResigeterMutation,
  useDeleteUserFromClassMutation,
} = api;
