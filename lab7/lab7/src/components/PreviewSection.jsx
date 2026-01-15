import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreviewSection = () => {
    const previewClips = [
        { id: 1, artist: "Kalush Orchestra", song: "Stefania", color: "bg-pink-500" },
        { id: 2, artist: "Okean Elzy", song: "Obiymy", color: "bg-blue-500" },
        { id: 3, artist: "Go_A", song: "SHUM", color: "bg-green-500" },
        { id: 4, artist: "Jamala", song: "1944", color: "bg-purple-600" }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Trending Now</h2>
                    
                    <Link to="/catalog" className="text-blue-600 font-semibold hover:underline">
                        View All
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {previewClips.map((clip) => (
                        <div key={clip.id} className="group cursor-pointer border rounded-lg p-4 hover:shadow-xl transition">
                            <div className={`h-40 ${clip.color} rounded mb-4 flex items-center justify-center text-white`}>
                                <PlayCircle className="w-12 h-12 opacity-75 group-hover:scale-110 transition" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">{clip.song}</h3>
                            <p className="text-gray-500">{clip.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PreviewSection;