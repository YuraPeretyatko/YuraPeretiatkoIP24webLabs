import { createStore } from 'redux';
import cartReducer from './reducer';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('music_store_cart');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('music_store_cart', serializedState);
    } catch (err) {
    }
};

const persistedState = loadState();

const store = createStore(
    cartReducer,
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;