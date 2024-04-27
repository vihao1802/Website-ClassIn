import { jwtDecode } from "jwt-decode";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function getUserId_Cookie() {
  const cookie = getCookie("user_token");
  if (cookie) {
    return jwtDecode(cookie).usr_id;
  } else {
    // redirect to login page
    // window.location.href = "/signin";
    return null;
  }
}

export { getUserId_Cookie };
