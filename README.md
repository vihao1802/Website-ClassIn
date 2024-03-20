# Website-ClassIn

Website class management

## Installation

Set up Virtual Environment(venv):
#### Install venv on Linux
```
sudo apt install python3.10-venv
```
#### Init venv folder
```
python3 -m venv venv
```
#### Activate venv
```
source ./venv/bin/activate
```
#### Install all packages in requirements.txt
```
pip install -r ./requirements.txt
```

## How to run

Client:

```
cd frontend
```
#### Install required packages
```
npm install
```
#### Run app
```
npm start
```
### Import Dependencies
```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/joy @mui/lab @mui/x-charts @mui/data-grid @mui/x-date-pickers @reduxjs/toolkit dayjs dotenv formik yup react-beautiful-dnd react-chat-elements react-countdown react-dropzone react-redux react-router-dom redux-persist
```

Server:

```
cd backend
```
#### Run app
```
uvicorn main:app --reload
```
