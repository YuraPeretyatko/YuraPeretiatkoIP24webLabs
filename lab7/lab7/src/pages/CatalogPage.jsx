import React from 'react';
import { Search } from 'lucide-react';
import ClipCard from '../components/ClipCard';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import PrimaryButton from '../components/UI/PrimaryButton';

const CatalogPage = () => {
    const clipsData = [
        { id: 1, artist: "Kalush Orchestra", song: "Stefania", views: "50M", duration: 180, color: "bg-pink-500" },
        { id: 2, artist: "Okean Elzy", song: "Bez boyu", views: "10M", duration: 235, color: "bg-blue-500" },
        { id: 3, artist: "Go_A", song: "SHUM", views: "25M", duration: 178, color: "bg-green-500" },
        { id: 4, artist: "Jamala", song: "1944", views: "30M", duration: 183, color: "bg-purple-600" },
        { id: 5, artist: "Antytila", song: "Bakhmut", views: "15M", duration: 280, color: "bg-yellow-600" },
        { id: 6, artist: "MONATIK", song: "Kruzhit", views: "120M", duration: 210, color: "bg-red-500" },
        { id: 7, artist: "Jerry Heil", song: "Teresa", views: "18M", duration: 175, color: "bg-indigo-500" },
        { id: 8, artist: "The Hardkiss", song: "Make-Up", views: "22M", duration: 190, color: "bg-gray-700" },
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Catalog</h1>
                <p className="text-gray-500">Explore the latest hits</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-grow w-full md:w-auto relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input placeholder="Search..." className="w-full pl-10" />
                </div>
                <Select placeholder="Sort By" options={[{ value: 'views', label: 'Views' }, { value: 'new', label: 'Newest' }]} />
                <PrimaryButton>Filter</PrimaryButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {clipsData.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} />
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;