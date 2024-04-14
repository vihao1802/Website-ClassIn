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
    "UnregisteredUsers"
    "Todo",
    "MessageClass" */
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
        url: `tai-khoan/${uid}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUser: build.query({
      query: () => `tai-khoan`,
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
    getAllJoinClass: build.query({
      query: (uid) => `thamGiaLopHoc/tai-khoan/${uid}/search-for-todo`,
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
      query: (cid) => `tai-khoan/${cid}/unregistered`,
      providesTags: ["UnregisteredUsers"],
    }),
    getAllFriends: build.query({
      query: (uid) => `ban-be/tai-khoan/${uid}`,
      providesTags: ["ListFriends"],
    }),
    getAllUserWithStatus: build.query({
      query: (uid) => `tai-khoan/${uid}/get-all-user-with-status-friend`,
      providesTags: ["ListFriends"],
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
    deleteMessageClass: build.mutation({
      query: ({ messageId }) => ({
        url: `tin-nhan/${messageId}/delete-message`,
        method: "PUT",
      }),
      invalidatesTags: ["MessageClass"],
    }),
    getMessageFriend: build.query({
      query: ({ acc_id, friend_id }) =>
        `tin-nhan-ban-be/tai-khoan/${acc_id}/tai-khoan/${friend_id}`,
      providesTags: ["MessageFriend"],
    }),
    postMessageFriend: build.mutation({
      query: ({ noiDung, acc_id_1, acc_id_2 }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `tin-nhan-ban-be`,
        method: "POST",
        body: { noiDung, ma_nguoiGui: acc_id_1, ma_nguoiNhan: acc_id_2 },
      }),
      invalidatesTags: ["MessageFriend"],
    }),
    deleteMessageFriend: build.mutation({
      query: ({ messageId }) => ({
        url: `tin-nhan-ban-be/${messageId}/delete-message`,
        method: "PUT",
      }),
      invalidatesTags: ["MessageFriend"],
    }),
    updateStatusFriend: build.mutation({
      query: ({ acc_id, friend_id, status }) => ({
        url: `ban-be/tai-khoan/${acc_id}/tai-khoan/${friend_id}/change-status-friend?status=${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["ListFriends"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetUserQuery,
  useGetAllUserQuery,
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
  useGetTodoQuery,
  useGetMessageClassQuery,
  usePostMessageClassMutation,
  useDeleteMessageClassMutation,
  useGetAllFriendsQuery,
  useGetMessageFriendQuery,
  usePostMessageFriendMutation,
  useDeleteMessageFriendMutation,
  useGetAllJoinClassQuery,
  useUpdateStatusFriendMutation,
  useGetAllUserWithStatusQuery,
} = api;
