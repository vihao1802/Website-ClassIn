const GOOGLE_DOMAIN = "https://www.googleapis.com/drive/v3/files";
async function deleteFileFromDrive(fileIdList) {
  const access_token = await (
    await fetch(`${process.env.REACT_APP_BASE_URL}/auth/access-token`, {
      method: "GET",
    })
  ).json();
  return fileIdList.map(async (fileId) => {
    try {
      const response = await fetch(`${GOOGLE_DOMAIN}/${fileId.ma_file}`, {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + access_token.token,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
}
async function deleteFileFromDrive2(fileIdList) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/googleapi/access-token`,
      {
        method: "POST",
      },
    );

    if (response.ok) {
      const data = await response.json();
      const access_token = data.token;
      console.log("Access token:", access_token);
    } else {
      console.error("Lỗi khi lấy access token. Mã lỗi:", response.status);
      // Xử lý lỗi ở đây
    }
  } catch (error) {
    console.error("Lỗi khi thực hiện yêu cầu lấy access token:", error);
    // Xử lý lỗi ở đây
  }
  console.log("Id cua file xoa:", "-", fileIdList);
}
// async function uploadFile(listFile) {}
export { deleteFileFromDrive };
export { deleteFileFromDrive2 };
