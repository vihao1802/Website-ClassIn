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
    "classDetails",
    "UnitAcitvities",
    "StudentsByClassId",
    "Tests",
    "ClassByInstructorId",
    "WorkDetailsByTestId",
    "WorkInfoByWorkId",
    "UnregisteredUsers",
    "UserResigeter",
    "Todo",
    "MessageClass",
    "Exercises",
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
      providesTags: ["Class"],
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
      query: ({ cid, search, act }) => ({
        url: `chuong/${cid}/hoatdong`,
        method: "GET",
        params: { search, act },
      }),
      providesTags: ["Units"],
    }),
    getStudentsByClassId: build.query({
      query: (cid) => `lopHoc/${cid}/taiKhoan`,
      providesTags: ["StudentsByClassId", "Class"],
    }),
    getTestByTestId: build.query({
      query: (tid) => `deKiemTra/${tid}`,
      providesTags: ["Tests"],
    }),
    getTestDetails: build.query({
      query: (tid) => `deKiemTra/${tid}/chiTiet`,
      providesTags: ["Tests"],
    }),
    getQuestionsDetails: build.query({
      query: (uid) => `cauHoi/taiKhoan/${uid}/chiTiet`,
      providesTags: ["Questions"],
    }),
    getQuestionsAnswers: build.query({
      query: (qid) => `cauHoi/${qid}/chiTiet`,
      providesTags: ["Questions"],
    }),
    getClassByInstructorId: build.query({
      query: (uid) => `lopHoc/taiKhoan/${uid}`,
      providesTags: ["Class"],
    }),
    getUserSubmissionsDetails: build.query({
      query: (tid) => `deKiemTra/${tid}/getSubmissionDetails`,
      providesTags: ["Tests"],
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

    getHomeWorkByHomeworkId: build.query({
      query: (homeworkId) => `bai-tap/${homeworkId}`,
      providesTags: ["HomeWorkByHomeworkId"],
    }),
    getWorkByUserIdAndHomeworkId: build.query({
      query: ({ userId, homeworkId }) =>
        `bai-lam-bai-tap/tai-khoan/${userId}/bai-tap/${homeworkId}`,
      providesTags: ["WorkByUserIdAndHomeworkId"],
    }),
    getFileHomeworkByHomeworkId: build.query({
      query: (homeworkId) => `fileBaiTap/${homeworkId}`,
      providesTags: ["FileHomeWorkByHomeworkId"],
    }),
    getFileHomeworkWorkByWorkId: build.query({
      query: (workId) => {
        // Check if workId is undefined or null
        if (!workId) {
          // Return an empty object or any other structure that signifies no data
          return new Promise((resolve) => resolve({ data: [] }));
        }
        // Proceed with the normal API call if workId is valid
        return `fileBaiLamBaiTap/${workId}`;
      },
      providesTags: ["FileHomeWorkWorkByWorkId"],
    }),
    getUnitsCommonByClassId: build.query({
      query: (cid) => `chuong/lopHoc/${cid}`,
      providesTags: ["Units"],
    }),
    getUnitByClassId: build.query({
      query: (cid) => ({
        url: `/chuong/lopHoc/${cid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Units"],
    }),
    getTestsByUnitId: build.query({
      query: (uid) => `deKiemTra/chuong/${uid}`,
      providesTags: ["Units"],
    }),
    getTestOrderByTestId: build.query({
      query: (tid) => `chiTietBaiKiemTra/deKiemTra/${tid}`,
      providesTags: ["Tests"],
    }),
    getExercisesByExerciseId: build.query({
      query: (eid) => `bai-tap/${eid}/info`,
      providesTags: ["Exercises"],
    }),
    getUserSubmissionsExerciseDetails: build.query({
      query: (eid) => `bai-tap/${eid}/getSubmissionDetails`,
      providesTags: ["Exercises"],
    }),
    getUnitsByClassId: build.query({
      query: (cid) => `chuong/lopHoc/${cid}`,
      providesTags: ["Units"],
    }),
    getTestWorksByUserId: build.query({
      query: (uid) => `baiLamKiemTra/taiKhoan/${uid}`,
      providesTags: ["Tests"],
    }),
    getExercisesByUnitId: build.query({
      query: (uid) => `bai-tap/chuong/${uid}`,
      providesTags: ["Exercises"],
    }),
    // POST METHODS
    postForgotPassword: build.mutation({
      query: (recoverEmail) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: {
          email: recoverEmail,
        },
      }),
    }),

    postAccessToken: build.mutation({
      query: () => ({
        url: `/googleapi/access-token`,
        method: "POST",
      }),
      providesTags: ["accessToken"],
    }),
    postHomework: build.mutation({
      query: ({
        machuong,
        tieuDe,
        noiDungBaiTap,
        noiDungDapAn,
        thoiGianBatDau,
        thoiGianKetThuc,
        congKhaiDapAn,
        nopBu,
      }) => ({
        url: `bai-tap/${machuong}`,
        method: "POST",
        body: {
          tieuDe: tieuDe,
          noiDungBaiTap: noiDungBaiTap,
          noiDungDapAn: noiDungDapAn,
          thoiGianBatDau: thoiGianBatDau,
          thoiGianKetThuc: thoiGianKetThuc,
          congKhaiDapAn: congKhaiDapAn,
          nopBu: nopBu,
        },
      }),
      invalidatesTags: ["postHomework"],
    }),
    postHomeworkFile: build.mutation({
      query: ({ tenFile, laFileDapAn, isYoutubeLink, ma_file, ma_baiTap }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `/fileBaiTap/${ma_baiTap}`,
        method: "POST",
        body: {
          ma_file: ma_file,
          tenFile: tenFile,
          laFileDapAn: laFileDapAn,
          isYoutubeLink: isYoutubeLink,
        },
      }),
      invalidatesTags: ["HomeworkFile"],
    }),
    postHomeworkWork: build.mutation({
      query: ({ ma_baiTap, ma_taiKhoan, nopTre }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `/bai-lam-bai-tap/`,
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
    postHomeworkWorkFile: build.mutation({
      query: ({ ma_baiLamBaiTap, maFile, tenFile }) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `/fileBaiLamBaiTap/${ma_baiLamBaiTap}`,
        method: "POST",
        body: {
          ma_file: maFile,
          tenFile: tenFile,
        },
      }),
    }),
    postUserResigeter: build.mutation({
      query: (data) => ({
        url: "thamGiaLopHoc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudentsByClassId", "Class", "UnregisteredUsers"],
    }),

    postCreateClass: build.mutation({
      query: (data) => ({
        url: `lopHoc/${data.ma_taiKhoan}`,
        method: "POST",
        body: { ten: data.ten, moTa: data.moTa, anhDaiDien: data.anhDaiDien },
      }),
      invalidatesTags: ["Class"],
    }),
    postAddUnit: build.mutation({
      query: (data) => ({
        url: `chuong/${data.ma_lopHoc}`,
        method: "POST",
        body: { ten: data.ten },
      }),
      invalidatesTags: ["Units"],
    }),
    postAddQuestion: build.mutation({
      query: (data) => ({
        url: `cauHoi/${data.ma_taiKhoan}`,
        method: "POST",
        body: { noiDung: data.noiDung },
      }),
      invalidatesTags: ["Questions"],
    }),
    postAddAnswers: build.mutation({
      query: (data) => ({
        url: `cauTraLoi/${data.ma_cauHoi}`,
        method: "POST",
        body: { noiDung: data.noiDung, laCauTraLoiDung: data.laCauTraLoiDung },
      }),
      invalidatesTags: ["Questions"],
    }),
    postCreateTest: build.mutation({
      query: (data) => ({
        url: `deKiemTra/${data.uid}`,
        method: "POST",
        body: {
          tieuDe: data.testTitle,
          thoiGianBatDau: data.startTime,
          thoiGianKetThuc: data.endTime,
          thoiGianLamBai: data.duration,
          xemDapAn: data.showAnswer,
          tronCauHoi: data.shuffleQuestion,
          hinhPhat: 0,
        },
      }),
      invalidatesTags: ["Tests"],
    }),
    postCreatTestDetail: build.mutation({
      query: (data) => ({
        url: `chiTietBaiKiemTra`,
        method: "POST",
        body: {
          ma_cauHoi: data.qid,
          ma_deKiemTra: data.tid,
          thuTu: data.order,
        },
      }),
      invalidatesTags: ["Tests"],
    }),
    postCreateStudentWork: build.mutation({
      query: (data) => ({
        url: `baiLamKiemTra`,
        method: "POST",
        body: {
          ma_taiKhoan: data.uid,
          ma_deKiemTra: data.tid,
          thoiGianNopBai: data.submitTime,
          thoiGianBatDauLam: data.startTime,
          diem: data.score,
          nopTre: data.isLate,
          soCauDung: data.correctAnswers,
        },
      }),
      invalidatesTags: ["Tests"],
    }),
    postCreateStudentWorkDetail: build.mutation({
      query: (data) => ({
        url: `chiTietBaiLamKiemTra`,
        method: "POST",
        body: {
          ma_cauHoi: data.qid,
          ma_baiLamKiemTra: data.wid,
          ma_dapAnChon: data.aid,
          thuTu: data.order,
        },
      }),
      invalidatesTags: ["Tests"],
    }),

    // DELETE METHODS
    deleteUserFromClass: build.mutation({
      query: (data) => ({
        url: `thamGiaLopHoc/${data.ma_lopHoc}/${data.ma_taiKhoan}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudentsByClassId", "Class", "UnregisteredUsers"],
    }),
    deleteHomework: build.mutation({
      query: ({ ma_baitap }) => ({
        url: `bai-tap/${ma_baitap}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteHomework"],
    }),
    deleteHomeworkFile: build.mutation({
      query: ({ ma_baitap }) => ({
        url: `fileBaiTap/${ma_baitap}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteHomeworkFile"],
    }),
    deleteHomeworkWorkFile: build.mutation({
      query: ({ ma_baiLamBaiTap }) => ({
        url: `fileBaiLamBaiTap/${ma_baiLamBaiTap}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteHomeworkWorkFile"],
    }),
    deleteHomeworkWork: build.mutation({
      query: ({ ma_baiLamBaiTap }) => ({
        url: `bai-lam-bai-tap/${ma_baiLamBaiTap}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteHomeworkWork"],
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
    updateUserInfo: build.mutation({
      query: ({ acc_id, data }) => ({
        url: `tai-khoan/${acc_id}/update-info`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["User", "UnregisteredUsers"],
    }),
    updatePassword: build.mutation({
      query: ({ acc_id, data }) => ({
        url: `tai-khoan/${acc_id}/update-password`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["User"],
    }),
    putEditUnit: build.mutation({
      query: (data) => ({
        url: `chuong/${data.ma_chuong}`,
        method: "PUT",
        body: { ten: data.ten },
      }),
      invalidatesTags: ["Units"],
    }),

    putEditQuestion: build.mutation({
      query: (data) => ({
        url: `cauHoi/${data.ma_cauHoi}`,
        method: "PUT",
        body: { noiDung: data.noiDung },
      }),
      invalidatesTags: ["Questions"],
    }),

    putEditAnswers: build.mutation({
      query: (data) => ({
        url: `cauTraLoi/${data.ma_cauTraLoi}`,
        method: "PUT",
        body: { noiDung: data.noiDung, laCauTraLoiDung: data.laCauTraLoiDung },
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: build.mutation({
      query: (qid) => ({
        url: `cauHoi/${qid}/delete`,
        method: "PUT",
      }),
      invalidatesTags: ["Questions"],
    }),
    putDeleteUnit: build.mutation({
      query: (uid) => ({
        url: `chuong/${uid}/delete`,
        method: "PUT",
      }),
      invalidatesTags: ["Units"],
    }),
    putEditTest: build.mutation({
      query: (data) => ({
        url: `deKiemTra/${data.tid}`,
        method: "PUT",
        body: {
          tieuDe: data.testTitle,
        },
      }),
      invalidatesTags: ["Tests"],
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
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
  useGetUnitByClassIdQuery,
  usePostHomeworkMutation,
  usePostHomeworkWorkMutation,
  usePostHomeworkWorkFileMutation,
  useGetFileHomeworkWorkByWorkIdQuery,
  useGetWorkByUserIdAndHomeworkIdQuery,
  useDeleteHomeworkWorkFileMutation,
  useDeleteHomeworkWorkMutation,
  usePostAccessTokenMutation,
  usePostHomeworkFileMutation,
  useDeleteHomeworkFileMutation,
  useDeleteHomeworkMutation,
  useUpdateUserInfoMutation,
  useUpdatePasswordMutation,
  usePostCreateClassMutation,
  usePostAddUnitMutation,
  usePutEditUnitMutation,
  usePostAddQuestionMutation,
  usePostAddAnswersMutation,
  useGetQuestionsAnswersQuery,
  usePutEditQuestionMutation,
  usePutEditAnswersMutation,
  useDeleteQuestionMutation,
  useGetUnitsByClassIdQuery,
  useGetTestsByUnitIdQuery,
  usePostCreateTestMutation,
  usePostCreatTestDetailMutation,
  useGetTestOrderByTestIdQuery,
  usePostCreateStudentWorkMutation,
  usePostCreateStudentWorkDetailMutation,
  useGetExercisesByExerciseIdQuery,
  useGetUserSubmissionsExerciseDetailsQuery,
  usePutDeleteUnitMutation,
  usePutEditTestMutation,
  usePostForgotPasswordMutation,
  useGetTestWorksByUserIdQuery,
  useGetExercisesByUnitIdQuery,
} = api;
