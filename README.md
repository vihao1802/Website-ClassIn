<h1 align="center">Welcome to Website Classin 👋</h1>
<p align="center">
  <a href="https://github.com/vihao1802/Website-ClassIn/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
</p>

<!--
[![GitHub Watches](https://img.shields.io/github/watchers/vihao1802/Website-ClassIn.svg?style=social&label=Watch&maxAge=2592000)](https://github.com/vihao1802/Website-ClassIn/watchers)
[![Contributors](https://img.shields.io/github/contributors/vihao1802/Website-ClassIn.svg)](https://github.com/vihao1802/Website-ClassIn/graphs/contributors)
 <a href="https://github.com/vihao1802/pharmacy-management">
    <img src="https://img.shields.io/github/contributors/vihao1802/pharmacy-management.svg" alt="Contributors">
  </a>
-->

> `Website CLassin` that provides an optimzed UI with various features in classroom management.

### 📄 PDF: [BaoCaoDoAn_Nhom7_PTPMMaNguonMo]()

### 📄 Google Slides: [SlideTrinhBay_Nhom7_PTPMMaNguonMo](https://docs.google.com/presentation/d/1O3w8enWdViNA_mb9UN14ebD8CZW3sGc9qqyelSkavUs/edit?usp=sharing)

<!-- GETTING STARTED -->

## 🎯 Getting Started

### 💎 Prerequisites

- Install venv on Linux or WSL(Windows Subsystem for Linux)

```
sudo apt install python3.10-venv
```

### ⚙️ Installation

1. Clone the repo

```sh
git clone https://github.com/vihao1802/Website-ClassIn.git
```

2. Init and Set up venv(Virtual Environment) folder

```
python3 -m venv venv
```

3. Activate `venv`

```
source ./venv/bin/activate
```

4. Install all packages in `requirements.txt`

```
pip install -r ./requirements.txt
```

5. Move to `frontend` directory

```
cd frontend
```

6. Install all required packages in `packages.json`

```
npm i
```

7. Create file `.env.local` in folder `frontend` and fill out with format:

```env
REACT_APP_BASE_URL=http://localhost:8000/api
REACT_APP_WEBSOCKET_URL=ws://localhost:8000/api/ws
```

8. Create file `.env` in folder `backend` and fill out with format:

```env
URL_DATABASE="sqlite:///./classin_database.db"
PORT=8000
DOMAIN_URL=http://localhost:8000
DOMAIN_CLIENT=http:localhost:3000
JWT_ALGORITHM=HS256
JWT_SECRET=#use_generate_UUID_tool_for_this
EMAIL=#email_for_upload_file_feature
PASSWORD_EMAIL=#password_email_for_upload_file_feature
SERVICE_ACCOUNT_FILE=#use_absolute_path_to_backend/config/xenon-timer.json_file
```

## 🚀 Usage

⚠️ Use two terminals for running this web application

### Frontend(First termnial):

- In `root` directory

```
cd frontend
```

- Run frontend app

```
npm start
```

### Backend(Second termnial):

- In `root` directory

```
cd backend
```

- Run backend app

```
uvicorn main:app --reload
```

## ✨ Code Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/vihao1802">
  <img src="https://avatars.githubusercontent.com/u/108573121?v=4" alt="Logo" width="80" height="80">
</a>

<a href="https://github.com/Huchuynh">
  <img src="https://avatars.githubusercontent.com/u/117436192?v=4" alt="Logo" width="80" height="80">
</a>

<a href="https://github.com/hnoga-n">
  <img src="https://avatars.githubusercontent.com/u/108043073?v=4" alt="Logo" width="80" height="80">
</a>

<a href="https://github.com/lamtuankiet20122003">
  <img src="https://avatars.githubusercontent.com/u/117509967?v=4" alt="Logo" width="80" height="80">
</a>

## 📝 License

Copyright © 2024 [Tran Vi Hao](https://github.com/vihao1802).<br />
This project is [MIT](https://github.com/vihao1802/Website-ClassIn/blob/main/LICENSE) licensed.
