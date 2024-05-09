const GOOGLE_DOMAIN = "https://www.googleapis.com/drive/v3/files";
async function deleteFileFromDrive(fileIdList) {
  const access_token = await (
    await fetch("http://localhost:8000/auth/access-token", {
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

async function uploadFile(listFile) {}
export { deleteFileFromDrive };
