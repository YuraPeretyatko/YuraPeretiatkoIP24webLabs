import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PreviewSection from '../components/PreviewSection';

const HomePage = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <main className="flex-grow">
                <Hero />
                <section className="py-10 bg-gray-50 text-center">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Platform News</h3>
                        <p className="text-gray-600 mb-4">
                            We are constantly updating our library with the best content.
                        </p>
                        
                        {showMore && (
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100 mb-4 text-left animate-pulse-once">
                                <h4 className="font-bold text-blue-600 mb-2">Upcoming Update v2.0:</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>User playlists coming soon</li>
                                    <li>Dark mode support</li>
                                    <li>Mobile application beta test</li>
                                </ul>
                            </div>
                        )}

                        <button 
                            onClick={() => setShowMore(!showMore)}
                            className="text-blue-600 font-semibold hover:underline flex items-center justify-center mx-auto gap-1"
                        >
                            {showMore ? 'Show Less' : 'View More News'}
                            {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                </section>

                <Features />
                <PreviewSection />
            </main>
        </div>
    );
};

export default HomePage;