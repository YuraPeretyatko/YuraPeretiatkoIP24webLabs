import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from './actions';

const initialState = {
    cartItems: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.cartItems.find(item => 
                item.id === action.payload.id && 
                item.selectedVariant.type === action.payload.selectedVariant.type
            );

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        (item.id === action.payload.id && item.selectedVariant.type === action.payload.selectedVariant.type)
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => 
                    !(item.id === action.payload.id && item.selectedVariant.type === action.payload.variantType)
                )
            };

        case INCREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    (item.id === action.payload.id && item.selectedVariant.type === action.payload.variantType)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };

        case DECREMENT_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    (item.id === action.payload.id && item.selectedVariant.type === action.payload.variantType)
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                        : item
                )
            };

        default:
            return state;
    }
};

export default cartReducer;