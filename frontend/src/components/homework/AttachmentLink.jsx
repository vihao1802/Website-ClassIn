import { Button, Typography, Avatar, Box, Link } from "@mui/material";
import { Close } from "@mui/icons-material";
export default function AttachmentLink({
  Title,
  Subtitle,
  Thumbnail,
  handleRemove,
}) {
  return (
    <Link
      sx={{
        width: "100%",
        height: "4rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: "2%",
        border: "1px solid gray",
        borderRadius: "5px",
        color: "black",
        textDecoration: "none",
      }}
    >
      <Avatar
        variant="square"
        src={Thumbnail}
        sx={{ width: "10%", height: "100%" }}
      ></Avatar>
      <Box
        sx={{
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
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
