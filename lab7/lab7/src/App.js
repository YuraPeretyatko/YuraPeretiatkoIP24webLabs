import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';

const CartPage = () => (
    <div className="p-20 text-center text-2xl font-bold text-gray-600">
        Cart Page (Coming Soon in Lab 10)
    </div>
);

const NotFound = () => (
    <div className="p-20 text-center text-2xl font-bold text-red-500">
        404 Page Not Found
    </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;