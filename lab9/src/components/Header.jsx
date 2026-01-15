import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import PrimaryButton from './UI/PrimaryButton';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-full text-white">
                        <Music />
                    </div>
                    <span className="text-xl font-bold text-gray-800">MusicStore</span>
                </Link>

                <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/catalog" className="hover:text-blue-600 transition">Catalog</Link>
                    <Link to="/cart" className="hover:text-blue-600 transition">Cart</Link>
                </nav>

                <PrimaryButton className="hidden md:block">Sign In</PrimaryButton>
            </div>
        </header>
    );
};

export default Header;