import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-10 mt-auto text-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-6 mb-6">
                    <Facebook className="hover:text-white cursor-pointer transition" />
                    <Twitter className="hover:text-white cursor-pointer transition" />
                    <Instagram className="hover:text-white cursor-pointer transition" />
                </div>
                <p>&copy; 2025 Lab 7 React. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;