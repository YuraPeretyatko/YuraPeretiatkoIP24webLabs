import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Eye, Clock } from 'lucide-react';
import PrimaryButton from './UI/PrimaryButton';

const ClipCard = ({ clip }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full group">
            <div className={`h-48 ${clip.color} flex items-center justify-center relative`}>
                <Music className="w-12 h-12 text-white opacity-50 group-hover:scale-110 transition duration-500" />
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{clip.song}</h3>
                <p className="text-blue-600 font-medium mb-4">{clip.artist}</p>
                
                <div className="mt-auto flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {(clip.views / 1000000).toFixed(1)}M
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {clip.duration}s
                    </span>
                </div>
                
                <div className="mt-4 pt-2">
                    <PrimaryButton 
                        className="w-full text-sm"
                        onClick={() => navigate(`/catalog/${clip.id}`)}
                    >
                        View Details
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ClipCard;