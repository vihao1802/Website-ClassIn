import React from "react";
import { Avatar } from "@mui/material";

function stringToColor(string) {
  if (!string) return "#e7e7e7";
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) return {};
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const AvatarName = ({ name }) => {
  return <Avatar {...stringAvatar(name)} />;
};

export default AvatarName;
