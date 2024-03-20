import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Radio, RadioGroup, Sheet, FormLabel, radioClasses } from "@mui/joy";
import {
  Modal,
  Typography,
  Tab,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { CloseRounded, CheckCircleRounded } from "@mui/icons-material";

const AddQuestionForm = ({ open, handleClose }) => {
  const [value, setValue] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "650px",
          bgcolor: "background.paper",
          border: "1px solid #e7e7e7",
          boxShadow: 24,
          borderRadius: "10px",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              sx={{
                color: "#009265",
                "& .MuiTab-root.Mui-selected": {
                  color: "#009265",
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#009265",
                },
              }}
            >
              <Tab label="Add a question" value="1" />
              <Tab label="Add from file" value="2" />
            </TabList>
            <IconButton
              sx={{
                color: "#009265",
                width: "40px",
                marginRight: "30px",
              }}
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "10px 20px",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="#009265">
              Title of question:
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              color="success"
            />
            <Typography variant="h6" color="#009265" mt="10px">
              List of answers:
            </Typography>
            <RadioGroup
              aria-label="platform"
              defaultValue="Website"
              overlay
              name="platform"
              sx={{
                flexDirection: "column",
                gap: 1,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: "3px solid",
                    borderColor: "#009265",
                  },
                },
                [`& .${radioClasses.radio}`]: {
                  display: "contents",
                  "& > svg": {
                    zIndex: 2,
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    bgcolor: "background.surface",
                    borderRadius: "50%",
                  },
                },
              }}
            >
              {["A", "B", "C", "D"].map((value) => (
                <Sheet
                  key={value}
                  variant="outlined"
                  sx={{
                    borderRadius: "md",
                    boxShadow: "sm",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    minWidth: 120,
                  }}
                >
                  <Radio
                    id={value}
                    value={value}
                    color="success"
                    checkedIcon={<CheckCircleRounded />}
                  />
                  <FormLabel htmlFor={value}>{value}</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    sx={{ zIndex: "1" }}
                    size="small"
                    color="success"
                  />
                </Sheet>
              ))}
            </RadioGroup>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#009265",
                  "&:hover": { backgroundColor: "#007850" },
                }}
              >
                Add Question
              </Button>
            </Box>
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0 20px",
              height: "100%",
            }}
          ></TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default AddQuestionForm;
