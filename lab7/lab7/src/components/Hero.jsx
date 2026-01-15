import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <section className="bg-gray-900 text-white py-24 text-center">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl font-extrabold mb-6">Discover Ukrainian Music</h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    The biggest collection of clips from top artists. 
                    Stream, watch, and enjoy high-quality content.
                </p>
                
                <Link to="/catalog">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
                        Start Watching
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;