import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/nav/Header.jsx";
import Home from "./components/pages/Home.jsx";
import ArticlePage from "./components/method2/ArticleMachine.jsx";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </>
  );
};

export default App;