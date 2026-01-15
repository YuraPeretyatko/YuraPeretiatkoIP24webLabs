import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PreviewSection from '../components/PreviewSection';


const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans">            
            <main className="flex-grow">
                <Hero />
                <Features />
                <PreviewSection />
            </main>
            
        </div>
    );
};

export default HomePage;