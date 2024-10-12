import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { HelmetProvider } from "react-helmet-async";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductDetail from "./components/product/ProductDetail";


function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
          <ToastContainer theme="dark"/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail/>} />
          </Routes>
          <Footer />
          </div>
          
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
