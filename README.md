# Website-ClassIn

Website class management

## Installation

Set up Virtual Environment(venv):

```
sudo apt install python3.10-venv     # Install venv on Linux
```
```
python3 -m venv venv                 # Init venv folder
```
```
source ./venv/bin/activate           # Activate venv
```
```
pip install -r ./requirements.txt    # Install all packages in requirements.txt
```

## How to run

Client:

```
cd frontend
```
```
npm install    # Install packages
```
```
npm start      # Run app
```

Server:

```
cd backend
```
```
uvicorn main:app --reload
```
