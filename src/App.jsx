import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/nav/Header.jsx";
import Home from "./components/pages/Home.jsx";
import ArticlePage from "./components/method2/ArticleMachine.jsx";

const AdminRedirect = () => {
  window.location.href = "/admin/index.html";
  return null;
};

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  );
};

export default App;