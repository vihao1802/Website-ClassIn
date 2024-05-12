import React from "react";
import { Container, Box, Grid, Typography, IconButton } from "@mui/material";
import HomeNavbar from "components/HomeNavbar";
import HomeFooter from "components/HomeFooter";
import img_home_1 from "../../assets/logo_home.jpg";
import img_hoctructuyen from "../../assets/home/cn1_hoctructuyen.png";
import img_nhantin from "../../assets/home/cn2_nhantin.png";
import img_lambai from "../../assets/home/cn3_lambaitructuyen.png";
import img_tranvihao from "../../assets/home/canhan1.jpg";
import img_machhaotuan from "../../assets/home/canhan2.jpg";
import img_nguyenhuyhoang from "../../assets/home/canhan3.jpg";
import img_lamtuankiet from "../../assets/home/canhan4.jpg";
const Home = () => {
  const handleAboutUsClick = () => {
    // Cuộn tới phần có id "aboutus" bằng cách thay đổi scrollTop của window
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleHomeClick = () => {
    // Scroll to the top of the page when Home button is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProductsClick = () => {
    // Find the element with id "products"
    const productsElement = document.getElementById("products");

    // Scroll to the "products" element
    if (productsElement) {
      productsElement.scrollIntoView({
        behavior: "smooth",
      });
      window.scrollBy({
        top: -100, // Adjust this value to your needs
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HomeNavbar
        IsNotHomePage={false}
        handleAboutUsClick={handleAboutUsClick}
        handleHomeClick={handleHomeClick}
        handleProductsClick={handleProductsClick}
      />

      <Container sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="left"
          style={{ marginTop: "100px", marginLeft: "100px", width: "auto" }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#009265",
                fontWeight: "bold",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              NƠI HỌC TẬP TỐT NHẤT THUỘC VỀ BẠN
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent={"left"}
            style={{ marginTop: "10px", marginLeft: "30px", width: "900px" }}
          >
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent={"left"}>
                <Grid
                  item
                  xs={7}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      marginTop: "10px",
                      marginLeft: "80px",
                      color: "gray",
                      width: "700px",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    Nơi bạn có thể tạo ra những lớp học để trao đổi và giao bài
                    tập, giao tiếp cải thiện học tập.
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <IconButton
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={img_home_1}
                      alt="return"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          id="products"
          container
          spacing={2}
          justifyContent="left"
          style={{ marginTop: "200px", marginLeft: "50px", width: "auto" }}
        >
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#009265",
                fontWeight: "bold",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              TỔNG QUAN VỀ CLASSIN
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="left"
            style={{ marginTop: "100px", width: "1200px" }}
          >
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent={"left"}>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      margin: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                      }}
                    >
                      Lớp học trực tuyến
                    </span>
                    <br />
                    <span>
                      Lớp học trực tuyến là nền tảng giáo dục linh hoạt và tiện
                      lợi, giúp học sinh tiếp cận kiến thức mọi lúc mọi nơi.
                      Thông qua tài nguyên trực tuyến, họ phát triển kỹ năng tự
                      học và làm việc độc lập. Đồng thời, lớp học trực tuyến
                      cũng tạo cơ hội giao lưu, chia sẻ ý kiến và kết nối xã
                      hội.
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={img_hoctructuyen}
                      alt="return"
                      style={{
                        width: "500px",
                        height: "300px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="left"
            style={{ marginTop: "250px", width: "1200px" }}
          >
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent={"left"}
                flexDirection={"row-reverse"}
              >
                <Grid
                  item
                  xs={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      margin: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                      }}
                    >
                      Nhắn tin trực tuyến
                    </span>
                    <br />
                    <span>
                      Nhắn tin trực tuyến trong ứng dụng học trực tuyến giúp học
                      viên và giảng viên giao tiếp một cách thuận tiện. Họ có
                      thể trao đổi kiến thức, yêu cầu giúp đỡ, cập nhật thông
                      tin và hỗ trợ kỹ thuật. Điều này tạo ra một môi trường học
                      tập tương tác và linh hoạt, nâng cao hiệu quả của quá
                      trình học.
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={img_nhantin}
                      alt="return"
                      style={{
                        width: "500px",
                        height: "300px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="left"
            style={{ marginTop: "250px", width: "1200px" }}
          >
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent={"left"}>
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    sx={{
                      margin: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "black",
                      }}
                    >
                      Giao và làm bài tập trực tuyến
                    </span>
                    <br />
                    <span>
                      Làm bài trắc nghiệm trực tuyến giúp học sinh kiểm tra và
                      đánh giá kiến thức, tiến độ học tập một cách linh hoạt và
                      thuận tiện. Đồng thời, giúp giáo viên và tổ chức giáo dục
                      quản lý và đánh giá kết quả học tập hiệu quả.
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={img_lambai}
                      alt="return"
                      style={{
                        width: "500px",
                        height: "300px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="aboutus"
            container
            spacing={2}
            justifyContent="left"
            style={{ marginTop: "250px", width: "1200px" }}
          >
            <Grid item xs={12} sx={{ marginLeft: "-50px" }}>
              <Typography
                sx={{
                  color: "#009265",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textAlign: "center",
                }}
              >
                ĐỘI NGŨ THIẾT KẾ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent={"left"}
                style={{ display: "flex", margin: "100px 0 116px -16px " }}
              >
                <Grid
                  item
                  xs={3}
                  style={{ alignItems: "center" }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-16px",
                  }}
                >
                  <a href="https://github.com/vihao1802">
                    <IconButton
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={img_tranvihao}
                        alt="return"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </a>
                  <Typography
                    sx={{
                      marginTop: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Trần Vĩ Hào
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ alignItems: "center" }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-16px",
                  }}
                >
                  <a href="https://github.com/Huchuynh">
                    <IconButton
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={img_machhaotuan}
                        alt="return"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </a>
                  <Typography
                    sx={{
                      marginTop: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Mạch Hạo Tuấn
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ alignItems: "center" }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-16px",
                  }}
                >
                  <a href="https://github.com/hnoga-n">
                    <IconButton
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={img_nguyenhuyhoang}
                        alt="return"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </a>
                  <Typography
                    sx={{
                      marginTop: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Nguyễn Huy Hoàng
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ alignItems: "center" }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-16px",
                  }}
                >
                  <a href="https://github.com/lamtuankiet20122003">
                    <IconButton
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={img_lamtuankiet}
                        alt="return"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginLeft: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </a>
                  <Typography
                    sx={{
                      marginTop: "auto",
                      marginLeft: "10px",
                      color: "gray",
                      width: "auto",
                      textAlign: "left",
                      fontSize: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Lâm Tuấn Kiệt
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <HomeFooter />
    </Box>
  );
};

export default Home;
