import React from 'react';
// import ReactDOM from "react-dom/client";
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { wishListLength, cartLength } from "./contextApi/navbarValues";
import ScrollToTop from "./pages/scrollToTopPage";

export default function App() {
  const wishList = localStorage.getItem('wishListData') ? JSON.parse(localStorage.getItem('wishListData')) : [];
  const cart = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
  const [wishListLengthValue, setWishListLengthValue] = React.useState(wishList?.length);
  const [cartLengthValue, setCartLengthValue] = React.useState(cart?.length);
  return (
    <wishListLength.Provider value={[wishListLengthValue, setWishListLengthValue]} >
      <cartLength.Provider value={[cartLengthValue, setCartLengthValue]} >
        <div className="App">
          <ScrollToTop />
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </cartLength.Provider>
    </wishListLength.Provider>
  );
}

