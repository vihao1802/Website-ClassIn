import { useState } from "react";
import { Button, Typography } from "@mui/material";
import "@mui/icons-material";
export default function AddAnswerButton({
  Id,
  Icon,
  iconSize,
  Title,
  handleAddAnswer,
}) {
  return (
    <Button
      id={Id}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        color: "gray",
        border: "1px solid gray",
        borderRadius: "5px",
        gap: "2%",
        transition: "0.5s",
        "&:hover": {
          border: "1px solid #009265",
          color: "#009265",
        },
      }}
      onClick={handleAddAnswer}
    >
      <Typography
        variant="subtitle2"
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        {Title}
      </Typography>
      <Icon
        sx={{
          fontSize: { iconSize },
          color: "rgba(128, 128, 128)",
        }}
      />
    </Button>
  );
}
