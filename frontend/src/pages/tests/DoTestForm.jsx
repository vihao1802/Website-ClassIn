import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
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
  useGetTestOrderByTestIdQuery,
  usePostCreateStudentWorkMutation,
  usePostCreateStudentWorkDetailMutation,
} from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import HomeNavbar from "components/HomeNavbar";

const DoTestForm = ({ mode }) => {
  // do
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questionsSorted, setQuestionsSorted] = useState([]);
  const [isChoose, setIsChoose] = useState([]);
  const startTime = useMemo(() => dayjs().format("YYYY-MM-DD HH:mm:ss"), []);
  const [shuffle, setShuffle] = useState(false);
  const [testOrderArray, setTestOrderArray] = useState([]);

  const { data: testItem, isLoading: isTestLoading } =
    useGetTestByTestIdQuery(testId);

  const { data: testDetails, isLoading: isTestDetailsLoading } =
    useGetTestDetailsQuery(testId);

  const { data: testOrder, isLoading: isTestOrderLoading } =
    useGetTestOrderByTestIdQuery(testId);

  useEffect(() => {
    if (!isTestLoading && testItem && mode !== "work") {
      if (testItem.tronCauHoi === 1) setShuffle(true);
      else setShuffle(false);
    }
  }, [testItem, isTestLoading]);

  useEffect(() => {
    if (!isTestOrderLoading && testOrder && mode !== "work") {
      setTestOrderArray(testOrder);
    }
  }, [testOrder, isTestOrderLoading]);

  useEffect(() => {
    if (!isTestDetailsLoading && testDetails && mode !== "work") {
      const tempArray = [...testDetails];
      let newQuestionsSorted;
      if (shuffle) {
        newQuestionsSorted = tempArray.sort(() => Math.random() - 0.5);
      } else {
        newQuestionsSorted = tempArray.sort((a, b) => {
          const orderA = testOrderArray.find(
            (item) => item.ma_cauHoi === a.cauHoi.ma_cauHoi,
          )?.thuTu;
          const orderB = testOrderArray.find(
            (item) => item.ma_cauHoi === b.cauHoi.ma_cauHoi,
          )?.thuTu;
          return orderA - orderB;
        });
      }
      const newIsChoose = newQuestionsSorted.map((item) => {
        return { qid: item.cauHoi.ma_cauHoi, aid: null, state: false };
      });
      setQuestionsSorted(newQuestionsSorted);
      setIsChoose(newIsChoose);
    }
  }, [
    testDetails,
    isTestDetailsLoading,
    testOrder,
    isTestOrderLoading,
    testItem,
    isTestLoading,
  ]);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [createStudentWork] = usePostCreateStudentWorkMutation();
  const [createStudentWorkDetail] = usePostCreateStudentWorkDetailMutation();

  const handleSubmit = async () => {
    const correctAnswers = questionsSorted.filter((item, index) => {
      return item.cauTraLoi.find(
        (answer) =>
          answer.laCauTraLoiDung === 1 &&
          answer.ma_cauTraLoi === isChoose[index].aid,
      );
    }).length;
    const score = ((correctAnswers / questionsSorted.length) * 10).toFixed(2);
    const data = {
      uid: getUserId_Cookie(),
      tid: testId,
      submitTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      startTime: startTime,
      score: score,
      isLate: 0,
      correctAnswers: correctAnswers,
    };
    const response = await createStudentWork(data).unwrap();
    console.log(response);
    for (let i = 0; i < questionsSorted.length; i++) {
      const detailData = {
        wid: response.ma_baiLamKiemTra,
        qid: questionsSorted[i].cauHoi.ma_cauHoi,
        aid: isChoose[i].aid,
        order: i + 1,
      };
      await createStudentWorkDetail(detailData).unwrap();
    }
    navigate(-1);
  };

  //work
  const { workId } = useParams();
  const { data: workItem, isLoading: isWorkItemLoading } =
    useGetWorkDetailsByTestIdQuery(workId, { skip: mode === "do" });

  const [numberofQuestions, setNumberofQuestions] = useState(0);
  useEffect(() => {
    if (
      !isWorkItemLoading &&
      workItem &&
      mode === "work" &&
      testDetails &&
      !isTestDetailsLoading
    ) {
      console.log(testDetails);
      const tempArray = [...testDetails];
      const newQuestionsSorted = tempArray.sort((a, b) => {
        const orderA = workItem.find(
          (item) => item.ma_cauHoi === a.cauHoi.ma_cauHoi,
        ).thuTu;
        const orderB = workItem.find(
          (item) => item.ma_cauHoi === b.cauHoi.ma_cauHoi,
        ).thuTu;
        return orderA - orderB;
      });
      setQuestionsSorted(newQuestionsSorted);
      setNumberofQuestions(newQuestionsSorted.length);
    }
  }, [workItem, isWorkItemLoading, testDetails, isTestDetailsLoading]);

  const { data: workInfo, isLoading: isWorkInfoLoading } =
    useGetWorkInfoByWorkIdQuery(workId, { skip: mode === "do" });
  return (
    <Box>
      {mode === "work" && <HomeNavbar IsNotHomePage={true} />}
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
                  {questionsSorted.map((item, index) => {
                    return (
                      <Paper
                        id={index}
                        key={item?.cauHoi.ma_cauHoi + index}
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
                            {index + 1}. {item?.cauHoi.noiDung}
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
                            {item.cauTraLoi.map((answer, index) => {
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
                              {item.cauTraLoi.map((anwser, anwserIndex) => {
                                const char = ["A", "B", "C", "D"];
                                return (
                                  <Sheet
                                    key={char[anwserIndex]}
                                    onChange={() => {
                                      if (mode === "do") {
                                        const newIsChoose = [...isChoose];
                                        newIsChoose[index].state = true;
                                        newIsChoose[index].aid =
                                          anwser.ma_cauTraLoi;
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
                                          workItem.find(
                                            (witem) =>
                                              witem.ma_cauHoi ===
                                              item.cauHoi.ma_cauHoi,
                                          ).ma_dapAnChon
                                      }
                                      {...(mode === "do" && {
                                        checked: undefined,
                                      })}
                                    />
                                  </Sheet>
                                );
                              })}
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
                        {questionsSorted.length > 0 && (
                          <Countdown
                            timeInMinute={testItem?.thoiGianLamBai}
                            // timeInMinute={1}
                            onComplete={handleSubmit}
                          />
                        )}
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: theme.main_theme,
                            "&:hover": { backgroundColor: "#007850" },
                            width: "100%",
                            marginTop: "10px",
                          }}
                          onClick={() => setOpenConfirmDialog(true)}
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
                          {questionsSorted.map((item, index) => {
                            return (
                              <Link
                                href={"#" + index}
                                underline="none"
                                key={index}
                              >
                                <Button
                                  sx={
                                    isChoose[index].state
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
                                          border:
                                            "1px solid " + theme.main_theme,
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
                          <Dialog
                            open={openConfirmDialog}
                            onClose={() => setOpenConfirmDialog(false)}
                          >
                            <DialogTitle>{"Confirm Submmit"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                {isChoose.filter((item) => item.state === false)
                                  .length > 0 && (
                                  <>
                                    You still have unanswered questions! <br />
                                  </>
                                )}
                                Please check your test carefully before
                                submitting!
                                <br />
                                Are you sure you want to submit?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => setOpenConfirmDialog(false)}
                                color="success"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSubmit}
                                autoFocus
                                color="success"
                              >
                                Submmit
                              </Button>
                            </DialogActions>
                          </Dialog>
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
    </Box>
  );
};

export default DoTestForm;
