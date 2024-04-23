import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "pages/layout";
import Home from "pages/home";
import Classin from "pages/classin";
import Todo from "pages/todo";
import Chats from "pages/chats";
import Questions from "pages/questions";
import Tests from "pages/tests";
import AddTestForm from "pages/tests/AddTestForm";
import DoTestForm from "pages/tests/DoTestForm";
import Signin from "pages/login/signin/index";
import Signup from "pages/login/signup/index";
import TestExcerciseDetail from "pages/tests/TestExcerciseDetail";
import Profile from "pages/profile";
import ClassDetail from "pages/classDetail";
import CreateHomeWork from "pages/homework";
import DoHomework from "pages/do_homework";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tests/add" element={<AddTestForm />} />
          <Route path="/tests/do" element={<DoTestForm />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createhomework" element={<CreateHomeWork />} />
          <Route path="/dohomework" element={<DoHomework />} />
          <Route path="/tests/detail" element={<TestExcerciseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/classDetail" element={<ClassDetail />} />
          <Route element={<Layout />}>
            <Route path="/classin" element={<Classin />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="chats" element={<Chats />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/tests" element={<Tests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
