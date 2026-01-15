import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClipsProvider } from './context/ClipsContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';

const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </div>
);

const NotFound = () => <div className="p-20 text-center text-red-500">404 Not Found</div>;

function App() {
  return (
    <ClipsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </ClipsProvider>
  );
}

export default App;