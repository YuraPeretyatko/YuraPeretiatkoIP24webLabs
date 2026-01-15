import React from 'react';
import { Library, Monitor, Heart } from 'lucide-react';

const Features = () => {
    const featuresList = [
        { title: "Huge Library", icon: <Library className="w-10 h-10" />, desc: "Thousands of clips available." },
        { title: "HD Quality", icon: <Monitor className="w-10 h-10" />, desc: "Crystal clear 4K resolution." },
        { title: "Artist Support", icon: <Heart className="w-10 h-10" />, desc: "We support local creators." }
    ];

    return (
        <section className="py-20 container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">Why MusicStore?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {featuresList.map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm border text-center hover:shadow-md transition">
                        <div className="flex justify-center text-blue-600 mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;