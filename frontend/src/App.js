import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "pages/layout";
import Login from "pages/login";
import Home from "pages/home";
import Classin from "pages/classin";
import Todo from "pages/todo";
import Chats from "pages/chats";
import Questions from "pages/questions";
import Tests from "pages/tests";
import AddTestForm from "pages/tests/AddTestForm";
import DoTestForm from "pages/tests/DoTestForm";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tests/add" element={<AddTestForm />} />
          <Route path="/tests/do" element={<DoTestForm />} />
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
