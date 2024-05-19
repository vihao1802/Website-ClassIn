import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { FilePresent } from "@mui/icons-material";
export default function FileItem({ FileName, FileType, HandleClick }) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={HandleClick}>
          <ListItemIcon>
            <FilePresent />
          </ListItemIcon>
          <ListItemText
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            primary={FileName}
            secondary={FileType}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
