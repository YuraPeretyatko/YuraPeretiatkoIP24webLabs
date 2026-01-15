import React from 'react';
import { Music, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-md py-4 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-full text-white">
                        <Music />
                    </div>
                    <span className="text-xl font-bold text-gray-800">MusicStore</span>
                </div>
                <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
                    <a href="#" className="text-blue-600 font-semibold">Home</a>
                    <a href="#" className="hover:text-blue-600">Catalog</a>
                    <a href="#" className="hover:text-blue-600">Cart</a>
                </nav>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium">
                    Sign In
                </button>
            </div>
        </header>
    );
};

export default Header;