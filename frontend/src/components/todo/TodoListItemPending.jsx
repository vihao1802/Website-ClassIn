import { ArticleOutlined, HistoryEduRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "theme";

const TodoListItemPending = ({ item }) => {
  const navigate = useNavigate();

  const handleClickDoExercise = (id) => {
    // navigate(`/exercise/${id}/do`);
  };
  const handleClickDoTest = (id) => {
    navigate(`/tests/${id}/do`);
  };
  return (
    <ListItemButton sx={{ height: "80px", padding: "10px 25px" }}>
      <ListItemIcon>
        {item.ma_baiTap ? <ArticleOutlined /> : <HistoryEduRounded />}
      </ListItemIcon>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="span">
            {item.tieuDe}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={item.ma_baiTap ? "Exercise" : "Test"}
              color={"success"}
              size="small"
              variant="outlined"
            />
          </Stack>
        </Box>
        <Typography color="#666666">
          Deadline: {new Date(item.thoiGianKetThuc).toLocaleString()} | Class:{" "}
          {item.ten_lopHoc}
        </Typography>
      </Box>
      <Button
        onClick={
          item.ma_baiTap
            ? () => handleClickDoExercise()
            : () => handleClickDoTest(item.ma_deKiemTra)
        }
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          marginLeft: "auto",
          padding: "5px 25px",
          backgroundColor: theme.main_theme,
          "&:hover": {
            backgroundColor: "#007850",
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {item.ma_baiTap ? "Submit" : "Start"}
          </Typography>
        </Box>
      </Button>
    </ListItemButton>
  );
};

export default TodoListItemPending;
