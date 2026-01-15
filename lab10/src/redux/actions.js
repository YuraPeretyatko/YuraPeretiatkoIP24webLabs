export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
});

export const removeFromCart = (id, variantType) => ({
    type: REMOVE_FROM_CART,
    payload: { id, variantType }
});

export const incrementQuantity = (id, variantType) => ({
    type: INCREMENT_QUANTITY,
    payload: { id, variantType }
});

export const decrementQuantity = (id, variantType) => ({
    type: DECREMENT_QUANTITY,
    payload: { id, variantType }
});