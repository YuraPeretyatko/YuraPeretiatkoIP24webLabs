import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/actions';
import { Trash2, Plus, Minus, ShoppingBag, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ВИПРАВЛЕНИЙ ІМПОРТ (Default Import, без фігурних дужок)
import PrimaryButton from '../components/UI/PrimaryButton';

const CartPage = () => {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleRemove = (id, variantType) => dispatch(removeFromCart(id, variantType));
    const handleInc = (id, variantType) => dispatch(incrementQuantity(id, variantType));
    const handleDec = (id, variantType) => dispatch(decrementQuantity(id, variantType));

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <PrimaryButton onClick={() => navigate('/catalog')}>Go to Catalog</PrimaryButton>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart ({cartItems.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${item.selectedVariant.type}-${index}`} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row items-center gap-4">
                            
                            <div className={`w-20 h-20 ${item.color || 'bg-gray-300'} rounded-lg flex-shrink-0 flex items-center justify-center text-white`}>
                                <Disc className="w-8 h-8 opacity-70" />
                            </div>
                            
                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="font-bold text-lg text-gray-800">{item.song}</h3>
                                <p className="text-gray-600 text-sm">{item.artist}</p>
                                <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1 font-bold">
                                    {item.selectedVariant.label}
                                </div>
                                <p className="text-green-600 font-bold mt-1">${item.price}</p>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border">
                                <button onClick={() => handleDec(item.id, item.selectedVariant.type)} className="p-1 hover:text-blue-600">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => handleInc(item.id, item.selectedVariant.type)} className="p-1 hover:text-blue-600">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button onClick={() => handleRemove(item.id, item.selectedVariant.type)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Summary</h3>
                    <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900 mb-6">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <PrimaryButton className="w-full justify-center">Checkout</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default CartPage;