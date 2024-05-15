import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ForgotPasswordForm from "pages/login/forgotpassword";
import TestExcerciseDetail from "pages/tests/TestExcerciseDetail";
import Profile from "pages/profile";
import ClassDetail from "pages/classDetail";
import CreateHomeWork from "pages/homework";
import DoHomework from "pages/do_homework";
import ScoreHomework from "pages/score_homework";
import VerifyPassword from "pages/login/verifypassword";
import { getUserId_Cookie } from "utils/handleCookies";
function App() {
  const isAuth = Boolean(getUserId_Cookie());
  console.log("isAuth: ", isAuth);
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={!isAuth ? <Home /> : <Navigate to="/classin" />}
          />
          <Route
            path="/home"
            element={!isAuth ? <Home /> : <Navigate to="/classin" />}
          />
          <Route
            path="/signin"
            element={!isAuth ? <Signin /> : <Navigate to="/classin" />}
          />
          <Route
            path="/signup"
            element={!isAuth ? <Signup /> : <Navigate to="/classin" />}
          />
          <Route
            path="/forgotpassword"
            element={
              !isAuth ? <ForgotPasswordForm /> : <Navigate to="/classin" />
            }
          />
          <Route
            path="/changepassword"
            element={!isAuth ? <VerifyPassword /> : <Navigate to="/classin" />}
          />
          <Route
            path="/tests/add"
            element={isAuth ? <AddTestForm /> : <Navigate to="/signin" />}
          />
          <Route
            path="/tests/:testId/do"
            element={
              isAuth ? <DoTestForm mode="do" /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/tests/:testId/detail"
            element={
              isAuth ? <DoTestForm mode="detail" /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/tests/:testId/work/:workId"
            element={
              isAuth ? <DoTestForm mode="work" /> : <Navigate to="/signin" />
            }
          />
          {/* <Route path="/signin" element={isAuth ? <Signin /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={isAuth ? <Signup /> : <Navigate to="/signin" />} /> */}
          <Route
            path="/createhomework"
            element={isAuth ? <CreateHomeWork /> : <Navigate to="/signin" />}
          />
          <Route
            path="/scorehomework/hw/:homeworkId/s/:studentId"
            element={isAuth ? <ScoreHomework /> : <Navigate to="/signin" />}
          />
          <Route
            path="/dohomework/:homeworkId"
            element={isAuth ? <DoHomework /> : <Navigate to="/signin" />}
          />
          <Route
            path="/exercises/:exerciseId/common"
            element={
              isAuth ? (
                <TestExcerciseDetail mode="exercise" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/tests/:testId/common"
            element={
              isAuth ? (
                <TestExcerciseDetail mode="test" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <Profile /> : <Navigate to="/signin" />}
          />
          <Route
            path="/classDetail/:classId"
            element={isAuth ? <ClassDetail /> : <Navigate to="/signin" />}
          />
          <Route element={isAuth ? <Layout /> : <Navigate to="/signin" />}>
            <Route
              path="/classin"
              element={isAuth ? <Classin /> : <Navigate to="/signin" />}
            />
            <Route
              path="/todo"
              element={isAuth ? <Todo /> : <Navigate to="/signin" />}
            />
            <Route
              path="chats"
              element={isAuth ? <Chats /> : <Navigate to="/signin" />}
            />
            <Route
              path="/questions"
              element={isAuth ? <Questions /> : <Navigate to="/signin" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
