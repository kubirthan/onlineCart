import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { HelmetProvider } from "react-helmet-async";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductDetail from "./components/product/ProductDetail";
import ProductSeach from "./components/product/ProductSeach";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";



function App() {

  useEffect(() => {
    store.dispatch(loadUser)
})



  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
          <ToastContainer theme="dark"/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<ProductSeach/>}/>
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/myprofile" element={<Profile/>} />
          </Routes>
          <Footer />
          </div>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
