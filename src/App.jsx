import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/nav/Header.jsx";
import Home from "./components/pages/Home.jsx";
import Article from "./components/pages/Article.jsx";
import NutritionEssentials from "./components/pages/health/AddictionRecovery.jsx";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/nutrition-essentials" element={<NutritionEssentials />} />
      </Routes>
    </>
  );
};

export default App;
/*
Hold this for me:

https://flowbite-react.com/docs/components/navbar?utm_source=chatgpt.com

https://tailwindcss.com/docs/installation/using-vite



const IDEAL NAME HERE = () => {

  return (

    <>
    
      <NavigationBar />


    </>

  );
};

export default IDEAL NAME HERE ;



*/
