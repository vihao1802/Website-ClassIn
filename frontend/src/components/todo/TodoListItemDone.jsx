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
const TodoListItemDone = ({ item }) => {
  const navigate = useNavigate();

  const handleDetailExercise = (exerciseId) => {
    // navigate(`/exercises/${exerciseId}/common`);
  };
  const handleDetailTest = (testId, workId) => {
    navigate(`/tests/${testId}/work/${workId}`);
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
            ? () => handleDetailExercise(item.ma_baiTap)
            : () => handleDetailTest(item.ma_deKiemTra, item.ma_baiLamKiemTra)
        }
        sx={{
          textTransform: "none",
          borderRadius: "20px",
          marginLeft: "auto",
          padding: "5px 25px",
          backgroundColor:
            !item.ma_baiTap && item.xemDapAn === 0 ? "grey" : theme.main_theme,
          "&:hover": {
            backgroundColor: "#007850",
          },
        }}
        disabled={!item.ma_baiTap && item.xemDapAn === 0}
      >
        <Box>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {!item.ma_baiTap && item.xemDapAn === 0 ? "Locked" : "Detail"}
          </Typography>
        </Box>
      </Button>
    </ListItemButton>
  );
};

export default TodoListItemDone;
