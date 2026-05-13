import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/nav/Header.jsx";
import Home from "./pages/Home.jsx";
import Article from "./pages/Article.jsx";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route
          path="/about"
          element={
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8">About</h1>
              <p className="text-lg text-center">About Roy's Rant.</p>
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8">Services</h1>
              <p className="text-lg text-center">Our services.</p>
            </div>
          }
        />
        <Route
          path="/pricing"
          element={
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8">Pricing</h1>
              <p className="text-lg text-center">Pricing information.</p>
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold text-center mb-8">Contact</h1>
              <p className="text-lg text-center">Contact us.</p>
            </div>
          }
        />
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
