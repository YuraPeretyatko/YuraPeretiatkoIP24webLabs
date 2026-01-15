import React, { useState, useContext, useEffect } from 'react';
import { Search, Music } from 'lucide-react';
import { ClipsContext } from '../context/ClipsContext';
import ClipCard from '../components/ClipCard';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Loader from '../components/Loader';

const CatalogPage = () => {
    const { clips, isLoading, error, loadClips } = useContext(ClipsContext);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const filters = {};
            
            if (searchTerm) filters.search = searchTerm;
            if (filterGenre) filters.genre = filterGenre;
            if (sortType) filters.sort = sortType;

            console.log("Fetching from API with params:", filters);
            loadClips(filters);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
        
    }, [searchTerm, filterGenre, sortType, loadClips]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Catalog</h1>
                <p className="text-gray-500">Live Search (with Backend)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-grow w-full md:w-auto relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <Input 
                        placeholder="Search song/artist..." 
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
                    />
                    <Select 
                        placeholder="Default Sorting"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        options={[
                            { value: 'views-desc', label: 'Most Views' },
                            { value: 'views-asc', label: 'Least Views' },
                            { value: 'artist-asc', label: 'Artist (A-Z)' }
                        ]} 
                    />
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : clips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {clips.map((clip) => <ClipCard key={clip.id} clip={clip} />)}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed">
                    <Music className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-600">No clips found</h3>
                    <button 
                        onClick={() => { setSearchTerm(""); setFilterGenre(""); setSortType(""); }}
                        className="mt-4 text-blue-600 font-semibold hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default CatalogPage;