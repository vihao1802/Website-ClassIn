import { Box, Typography, Divider } from "@mui/material";
import React from "react";
import AvatarName from "./AvatarName";
import Loading from "./Loading";
import { useGetUserQuery, useGetStudentsByClassIdQuery } from "state/api";

const PeopleTab = ({ classItem, userId }) => {
  const { data: instructor, isLoading: isInstructorLoading } = useGetUserQuery(
    classItem?.ma_giangVien,
  );

  const { data: students, isLoading: isStudentsLoading } =
    useGetStudentsByClassIdQuery(classItem?.ma_lopHoc);

  if (isInstructorLoading || isStudentsLoading) return;
  <Loading />;

  return (
    <Box>
      <Typography
        variant="h5"
        color="#009265"
        p="10px 20px"
        borderBottom="1px solid #009265"
      >
        Class Description
      </Typography>
      <Typography p="20px">
        {classItem?.moTa || "No description available."}
      </Typography>
      <Typography
        variant="h5"
        color="#009265"
        p="10px 20px"
        borderBottom="1px solid #009265"
      >
        Teacher
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", padding: "10px 30px" }}>
        {/* <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          /> */}
        <AvatarName name={instructor.hoTen} />
        <Typography
          sx={{
            fontSize: "16px",
            color: "black",
            marginLeft: "10px",
            padding: "10px 0",
          }}
        >
          {instructor.hoTen}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        color="#009265"
        p="10px 20px"
        borderBottom="1px solid #009265"
      >
        Classmates
      </Typography>
      {students.map((student) => (
        <Box key={student.ma_taiKhoan}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 30px",
            }}
          >
            {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                /> */}
            <AvatarName name={student.hoTen} />
            <Typography
              sx={{
                fontSize: "16px",
                color: "black",
                marginLeft: "10px",
                padding: "10px 0",
              }}
            >
              {student.ma_taiKhoan === userId ? "You" : student.hoTen}
            </Typography>
          </Box>
          <Divider variant="middle" color="#666666" />
        </Box>
      ))}
    </Box>
  );
};

export default PeopleTab;
