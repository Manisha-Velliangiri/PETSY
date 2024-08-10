import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopContextProvider from './Context/ShopContext';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import dog_banner from './Components/Assets/banner_dogs.jpg';
import cat_banner from './Components/Assets/banner_cats.jpg';
import TestImage from './Components/TestImage'; // Import the TestImage component

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/dogs' element={<ShopCategory banner={dog_banner} category="dog" />} />
          <Route path='/cats' element={<ShopCategory banner={cat_banner} category="cats" />} />
          <Route path='/product/:productId' element={<Product />} /> {/* Update to include :productId */}
          <Route path='/test' element={<TestImage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;

