import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PreviewSection from '../components/PreviewSection';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Features />
                <PreviewSection />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;