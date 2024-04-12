import { jwtDecode } from "jwt-decode";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function getUserId_Cookie() {
  return jwtDecode(getCookie("user_token")).usr_id;
}

export { getUserId_Cookie };
