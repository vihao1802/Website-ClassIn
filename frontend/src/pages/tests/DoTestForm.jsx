import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";
import { RadioGroup, Radio, radioClasses, Sheet, Link } from "@mui/joy";
import Countdown from "components/CountDown";
import dayjs from "dayjs";
import theme from "theme";
import Loading from "components/Loading";
import AvatarName from "components/AvatarName";
import {
  useGetTestByTestIdQuery,
  useGetTestDetailsQuery,
  useGetWorkDetailsByTestIdQuery,
  useGetWorkInfoByWorkIdQuery,
} from "state/api";

const DoTestForm = ({ mode }) => {
  const [isChoose, setIsChoose] = useState([]);

  // do
  const { testId } = useParams();

  const [questionsIndex, setQuestionsIndex] = useState([]);

  const { data: testItem, isLoading: isTestLoading } =
    useGetTestByTestIdQuery(testId);

  const { data: testDetails, isLoading: isTestDetailsLoading } =
    useGetTestDetailsQuery(testId);

  useEffect(() => {
    if (!isTestDetailsLoading && testDetails && mode !== "work") {
      const newQuestionsIndex = Array.from(
        { length: testDetails.length },
        (_, index) => index,
      );
      const newIsChoose = Array(testDetails.length).fill(false);
      setQuestionsIndex(newQuestionsIndex);
      setIsChoose(newIsChoose);
    }
  }, [testDetails, isTestDetailsLoading]);

  //work
  const { workId } = useParams();
  const { data: workItem, isLoading: isWorkItemLoading } =
    useGetWorkDetailsByTestIdQuery(workId);

  const [numberofQuestions, setNumberofQuestions] = useState(0);
  useEffect(() => {
    if (!isWorkItemLoading && workItem && mode === "work") {
      const newQuestionsIndex = workItem.map((item) => item.thuTu - 1);
      setQuestionsIndex(newQuestionsIndex);
      setNumberofQuestions(newQuestionsIndex.length);
    }
  }, [workItem, isWorkItemLoading]);

  const { data: workInfo, isLoading: isWorkInfoLoading } =
    useGetWorkInfoByWorkIdQuery(workId);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: "20px" }}>
      {testItem || !isTestLoading ? (
        <>
          {/* LEFT SIDE */}
          <Box sx={mode === "detail" ? { width: "100%" } : { width: "70%" }}>
            {/* TITLE */}
            <Box
              sx={{
                border: "1px solid #e7e7e7",
                borderRadius: "5px",
                backgroundColor: "white",
                width: "80%",
                margin: "auto",
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.main_theme,
                  color: "white",
                  width: "100%",
                  height: "15px",
                  borderRadius: "5px 5px 0 0",
                }}
              ></Box>
              <Box p="5px 20px">
                <Typography variant="h4" padding={"5px 0"}>
                  {testItem.tieuDe}
                </Typography>
                <Box color="#666666">
                  <Typography>
                    Duration: <strong>{testItem.thoiGianLamBai} min</strong>
                  </Typography>
                  <Typography>
                    Start:{" "}
                    <strong>
                      {dayjs(testItem.thoiGianBatDau).format(
                        "HH:mm - DD/MM/YYYY",
                      )}
                    </strong>
                  </Typography>
                  <Typography>
                    End:{" "}
                    <strong>
                      {dayjs(testItem.hanChotNopBai).format(
                        "HH:mm - DD/MM/YYYY",
                      )}
                    </strong>
                  </Typography>
                  <Typography>
                    Class: <strong>{testItem.tenLop}</strong>
                  </Typography>
                  <Typography>
                    Unit: <strong>{testItem.tenChuong}</strong>
                  </Typography>
                  <Typography>
                    Instructor: <strong>{testItem.tenGV}</strong>
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* QUESTION */}
            {(testDetails || !isTestDetailsLoading) &&
            (workItem || !isWorkItemLoading) ? (
              <Box m="auto" width="80%">
                {questionsIndex.map((item, index) => {
                  return (
                    <Paper
                      id={index}
                      key={testDetails[item]?.cauHoi.ma_cauHoi + index}
                      sx={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                        paddingBottom: "5px",
                      }}
                      elevation={2}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {index + 1}. {testDetails[item]?.cauHoi.noiDung}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginTop: "10px",
                          }}
                        >
                          {testDetails[item].cauTraLoi.map((answer, index) => {
                            const arr = ["A", "B", "C", "D"];

                            return (
                              <Box
                                width="50%"
                                p="5px"
                                key={answer.ma_cauTraLoi + index}
                              >
                                <Typography
                                  variant="h7"
                                  color={
                                    mode !== "do" &&
                                    answer.laCauTraLoiDung === 1
                                      ? "#009265"
                                      : "black"
                                  }
                                  fontWeight={
                                    mode !== "do" &&
                                    answer.laCauTraLoiDung === 1
                                      ? "bold"
                                      : "normal"
                                  }
                                >
                                  {arr[index]}. {answer.noiDung}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                      {mode !== "detail" && (
                        <Box
                          sx={{
                            borderTop: "1px solid #e7e7e7",
                            marginTop: "10px",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            variant="h7"
                            color={theme.main_theme}
                            fontWeight="bold"
                            p="10px 0"
                          >
                            {mode === "do"
                              ? "Choose an answer: "
                              : "Student answer: "}
                          </Typography>
                          <RadioGroup
                            sx={{
                              gap: 2,
                              mb: 2,
                              flexWrap: "wrap",
                              flexDirection: "row",
                              alignItems: "center",
                              marginLeft: "20px",
                              marginBottom: "unset",
                            }}
                          >
                            {testDetails[item].cauTraLoi.map(
                              (anwser, anwserIndex) => {
                                const char = ["A", "B", "C", "D"];
                                return (
                                  <Sheet
                                    key={char[anwserIndex]}
                                    onChange={() => {
                                      if (mode === "do") {
                                        const newIsChoose = [...isChoose];
                                        newIsChoose[item] = true;
                                        setIsChoose(newIsChoose);
                                      }
                                    }}
                                    sx={{
                                      position: "relative",
                                      width: 40,
                                      height: 40,
                                      flexShrink: 0,
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      "--joy-focus-outlineOffset": "4px",
                                      "--joy-palette-focusVisible": (theme) =>
                                        theme.vars.palette.neutral
                                          .outlinedBorder,
                                      [`& .${radioClasses.checked}`]: {
                                        [`& .${radioClasses.label}`]: {
                                          fontWeight: "lg",
                                          color: "white",
                                        },
                                        [`& .${radioClasses.action}`]: {
                                          backgroundColor:
                                            mode !== "do"
                                              ? anwser.laCauTraLoiDung === 1
                                                ? theme.main_theme
                                                : "red"
                                              : theme.main_theme,
                                        },
                                      },
                                      [`& .${radioClasses.action}.${radioClasses.focusVisible}`]:
                                        {
                                          outlineWidth: "2px",
                                        },
                                    }}
                                  >
                                    <Radio
                                      color="success"
                                      size="small"
                                      overlay
                                      disableIcon
                                      value={char[anwserIndex]}
                                      label={char[anwserIndex]}
                                      checked={
                                        mode === "work" &&
                                        anwser.ma_cauTraLoi ===
                                          workItem[item].ma_dapAnChon
                                      }
                                      {...(mode === "do" && {
                                        checked: undefined,
                                      })}
                                    />
                                  </Sheet>
                                );
                              },
                            )}
                          </RadioGroup>
                        </Box>
                      )}
                    </Paper>
                  );
                })}
              </Box>
            ) : (
              <Loading />
            )}
          </Box>

          {/* RIGHT SIDE */}
          {mode !== "detail" && (
            <Box sx={{ width: "25%" }}>
              <Paper sx={{ padding: "10px", top: 10, position: "sticky" }}>
                {mode === "do" ? (
                  <>
                    <Box p="10px">
                      <Countdown timeInMinute={testItem?.thoiGianLamBai} />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.main_theme,
                          "&:hover": { backgroundColor: "#007850" },
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                    <Divider color="#666666" />
                    {testDetails || !isTestDetailsLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: "20px",
                          gap: 1,
                        }}
                      >
                        {testDetails.map((item, index) => {
                          return (
                            <Link
                              href={"#" + index}
                              underline="none"
                              key={index}
                            >
                              <Button
                                sx={
                                  isChoose[index]
                                    ? {
                                        height: "35px",
                                        minWidth: "35px",
                                        gap: 2,
                                        backgroundColor: theme.main_theme,
                                        color: "white",
                                        "&:hover": {
                                          backgroundColor: "#007850",
                                        },
                                      }
                                    : {
                                        height: "35px",
                                        minWidth: "35px",
                                        gap: 2,
                                        backgroundColor: "white",
                                        color: theme.main_theme,
                                        border: "1px solid " + theme.main_theme,
                                        "&:hover": {
                                          backgroundColor: theme.main_theme,
                                          color: "white",
                                        },
                                      }
                                }
                              >
                                {index + 1}
                              </Button>
                            </Link>
                          );
                        })}
                      </Box>
                    ) : (
                      <Loading />
                    )}
                  </>
                ) : workInfo || !isWorkInfoLoading ? (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "10px",
                      }}
                    >
                      <AvatarName name={workInfo.hoTen} />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          color: "black",
                          marginLeft: "10px",
                          padding: "10px 0",
                        }}
                      >
                        {workInfo.hoTen}
                      </Typography>
                    </Box>
                    <Divider color="#666666" />
                    <Box sx={{ padding: "10px" }}>
                      <Typography>
                        <strong>Score: </strong> {workInfo.diem}
                      </Typography>
                      <Typography>
                        <strong> Correctly answered: </strong>{" "}
                        {workInfo.soCauDung} / {numberofQuestions}
                      </Typography>
                      <Typography>
                        <strong>Time: </strong> {workInfo.thoiGianLamBai} min
                      </Typography>
                      <Typography>
                        <strong>Start: </strong>{" "}
                        {dayjs(workInfo.thoiGianBatDauLam).format("HH:mm")}
                      </Typography>
                      <Typography>
                        <strong>End: </strong>{" "}
                        {dayjs(workInfo.thoiGianNop).format("HH:mm")}
                      </Typography>
                      <Typography>
                        <strong>Test Date: </strong>{" "}
                        {dayjs(workInfo.thoiGianNop).format("DD/MM/YYYY")}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Loading />
                )}
              </Paper>
            </Box>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default DoTestForm;
