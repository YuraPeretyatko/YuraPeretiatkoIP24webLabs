import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Mic2, Eye, Clock, ShoppingCart, Disc } from 'lucide-react';
import { fetchClipById } from '../api';
import Loader from '../components/Loader';

// ВИПРАВЛЕНІ ІМПОРТИ (Default Imports)
import PrimaryButton from '../components/UI/PrimaryButton';
import Select from '../components/UI/Select';

// Redux
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [clip, setClip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const loadItem = async () => {
            setLoading(true);
            try {
                const response = await fetchClipById(id);
                const data = response.data;
                setClip(data);
                
                if (data.variants && data.variants.length > 0) {
                    setSelectedVariant(data.variants[0]);
                }
            } catch (err) {
                setError("Кліп не знайдено.");
            } finally {
                setLoading(false);
            }
        };
        loadItem();
    }, [id]);

    const handleAddToCart = () => {
        if (clip && selectedVariant) {
            const itemToAdd = {
                ...clip,
                price: selectedVariant.price,
                selectedVariant: selectedVariant
            };
            dispatch(addToCart(itemToAdd));
            alert("Товар додано в кошик!");
        }
    };

    const handleVariantChange = (e) => {
        const type = e.target.value;
        const variant = clip.variants.find(v => v.type === type);
        setSelectedVariant(variant);
    };

    if (loading) return <Loader />;
    if (error || !clip) return <div className="p-20 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div className={`${clip.color || 'bg-gray-500'} p-10 flex items-center justify-center text-white relative min-h-[300px]`}>
                    <Music className="w-32 h-32 opacity-80" />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{clip.song}</h1>
                    <h2 className="text-2xl text-blue-600 font-medium mb-6 flex items-center gap-2">
                        <Mic2 className="w-6 h-6" /> {clip.artist}
                    </h2>
                    <p className="text-gray-600 mb-8">{clip.description}</p>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                        <label className="block text-blue-800 font-bold mb-3 flex items-center gap-2">
                            <Disc className="w-5 h-5" /> Choose Format
                        </label>
                        
                        {clip.variants && clip.variants.length > 0 ? (
                            <div className="flex flex-col sm:flex-row gap-4 items-end">
                                <div className="flex-grow w-full">
                                    <Select 
                                        className="w-full"
                                        value={selectedVariant?.type}
                                        onChange={handleVariantChange}
                                        options={clip.variants.map(v => ({ value: v.type, label: v.label }))}
                                    />
                                </div>
                                <div className="text-3xl font-bold text-green-600 whitespace-nowrap min-w-[80px] text-right">
                                    ${selectedVariant?.price}
                                </div>
                            </div>
                        ) : (
                            <p className="text-red-500">Not available</p>
                        )}
                    </div>

                    <PrimaryButton 
                        onClick={handleAddToCart} 
                        disabled={!selectedVariant}
                        className="w-full py-4 text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;