import { Button, Typography, Avatar, Box, Link } from "@mui/material";
import { Close } from "@mui/icons-material";
export default function AttachmentLink({
  width,
  Title,
  Subtitle,
  Thumbnail,
  handleRemove,
  linkAttachment,
  isRemoveAble = true,
}) {
  return (
    <Link
      target="_blank"
      sx={{
        position: "relative",
        width: { width },
        height: "4rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "5%",
        border: "1px solid black",
        borderRadius: "5px",
        color: "black",
        textDecoration: "none",
      }}
      href={linkAttachment}
    >
      <Avatar
        variant="square"
        src={Thumbnail}
        sx={{ width: "20%", height: "100%" }}
      ></Avatar>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "100%",
            height: "50%",
          }}
        >
          {Title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            width: "100%",
            height: "50%",
            color: "gray",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {Subtitle}
        </Typography>
      </Box>
      <Button
        variant="text"
        sx={{
          width: "5%",
          height: "100%",
          display: isRemoveAble ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          position: "absolute",
          right: "0",
        }}
        onClick={handleRemove}
      >
        <Close
          sx={{
            fontSize: "1rem",
          }}
        />
      </Button>
    </Link>
  );
}
