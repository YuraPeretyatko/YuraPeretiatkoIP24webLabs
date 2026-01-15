import React, { useState, useContext } from 'react';
import { Search, Music } from 'lucide-react';
import { ClipsContext } from '../context/ClipsContext';
import ClipCard from '../components/ClipCard';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import PrimaryButton from '../components/UI/PrimaryButton';

const CatalogPage = () => {
    const { clips } = useContext(ClipsContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [sortType, setSortType] = useState("");

    const filteredClips = clips.filter(clip => {
        const matchesSearch = clip.song.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              clip.artist.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = filterGenre ? clip.genre === filterGenre : true;
        
        return matchesSearch && matchesGenre;
    }).sort((a, b) => {
        if (sortType === "views") return b.views - a.views;
        if (sortType === "newest") return b.id - a.id;
        return 0;
    });

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Catalog</h1>
                <p className="text-gray-500">Found {filteredClips.length} clips</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-grow w-full md:w-auto relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input 
                        placeholder="Search by song or artist..." 
                        className="w-full pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-4 w-full md:w-auto flex-wrap sm:flex-nowrap">
                    <Select 
                        placeholder="All Genres"
                        value={filterGenre}
                        onChange={(e) => setFilterGenre(e.target.value)}
                        options={[
                            { value: 'rock', label: 'Rock' },
                            { value: 'pop', label: 'Pop' },
                            { value: 'folk', label: 'Folk' }
                        ]} 
                        className="w-full sm:w-auto"
                    />
                    <Select 
                        placeholder="Default Sorting"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        options={[
                            { value: 'views', label: 'Most Views' },
                            { value: 'newest', label: 'Newest First' }
                        ]} 
                        className="w-full sm:w-auto"
                    />
                </div>
            </div>

            {filteredClips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredClips.map((clip) => (
                        <ClipCard key={clip.id} clip={clip} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                    <Music className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600">No clips found</h3>
                    <p className="text-gray-500">Try adjusting your filters</p>
                    <button 
                        onClick={() => {setSearchTerm(""); setFilterGenre("");}}
                        className="mt-4 text-blue-600 font-semibold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default CatalogPage;