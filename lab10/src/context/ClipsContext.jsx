import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchClips } from '../api';

export const ClipsContext = createContext();

export const ClipsProvider = ({ children }) => {
    const [clips, setClips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadClips = useCallback(async (filters = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchClips(filters);
            setClips(response.data);
        } catch (err) {
            console.error("API Error:", err);
            setError("Не вдалося завантажити дані.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadClips();
    }, [loadClips]);

    return (
        <ClipsContext.Provider value={{ clips, isLoading, error, loadClips }}>
            {children}
        </ClipsContext.Provider>
    );
};