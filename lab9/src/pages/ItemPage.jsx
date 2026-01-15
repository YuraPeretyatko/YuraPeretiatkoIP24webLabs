import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Mic2, Eye, Clock } from 'lucide-react';
import { fetchClipById } from '../api';
import PrimaryButton from '../components/UI/PrimaryButton';
import Loader from '../components/Loader';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [clip, setClip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItem = async () => {
            setLoading(true);
            try {
                const response = await fetchClipById(id);
                setClip(response.data);
            } catch (err) {
                console.error("Error loading item:", err);
                setError("Кліп не знайдено.");
            } finally {
                setLoading(false);
            }
        };
        loadItem();
    }, [id]);

    if (loading) return <Loader />;
    if (error || !clip) return <div className="p-20 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className={`${clip.color || 'bg-gray-500'} p-10 flex items-center justify-center text-white relative min-h-[300px]`}>
                    <Music className="w-32 h-32 opacity-80" />
                    <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        {clip.genre}
                    </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{clip.song}</h1>
                    <h2 className="text-2xl text-blue-600 font-medium mb-6 flex items-center gap-2">
                        <Mic2 className="w-6 h-6" /> {clip.artist}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{clip.description}</p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <span className="block text-gray-400 text-xs uppercase font-bold mb-1">Total Views</span>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <Eye className="text-blue-500 w-5 h-5" /> {clip.views.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            <span className="block text-gray-400 text-xs uppercase font-bold mb-1">Duration</span>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <Clock className="text-blue-500 w-5 h-5" /> {clip.duration}s
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <PrimaryButton className="flex-grow justify-center py-3 text-lg">
                            Watch Now
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;