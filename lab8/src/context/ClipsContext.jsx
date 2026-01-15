import React, { createContext, useState } from 'react';

export const ClipsContext = createContext();

const INITIAL_CLIPS = [
    { id: 1, artist: "Kalush Orchestra", song: "Stefania", views: 50000000, duration: 180, color: "bg-pink-500", genre: "folk", description: "Переможець Євробачення 2022. Потужний мікс репу та українського фольку." },
    { id: 2, artist: "Okean Elzy", song: "Bez boyu", views: 10000000, duration: 235, color: "bg-blue-500", genre: "rock", description: "Легендарний хіт найвідомішого рок-гурту України." },
    { id: 3, artist: "Go_A", song: "SHUM", views: 25000000, duration: 178, color: "bg-green-500", genre: "folk", description: "Електро-фольк, що підкорив Європу." },
    { id: 4, artist: "Jamala", song: "1944", views: 30000000, duration: 183, color: "bg-purple-600", genre: "pop", description: "Глибока та емоційна пісня про історію." },
    { id: 5, artist: "Antytila", song: "Bakhmut", views: 15000000, duration: 280, color: "bg-yellow-600", genre: "rock", description: "Присвята героям, що захищають місто-фортецю." },
    { id: 6, artist: "MONATIK", song: "Kruzhit", views: 120000000, duration: 210, color: "bg-red-500", genre: "pop", description: "Танцювальний хіт, що змушує рухатися кожного." },
    { id: 7, artist: "Jerry Heil", song: "Teresa & Maria", views: 18000000, duration: 175, color: "bg-indigo-500", genre: "pop", description: "Сучасний поп з релігійними та історичними відсилками." },
    { id: 8, artist: "The Hardkiss", song: "Make-Up", views: 22000000, duration: 190, color: "bg-gray-700", genre: "rock", description: "Хард-рок стиль з неймовірним вокалом." },
];

export const ClipsProvider = ({ children }) => {
    const [clips, setClips] = useState(INITIAL_CLIPS);

    return (
        <ClipsContext.Provider value={{ clips, setClips }}>
            {children}
        </ClipsContext.Provider>
    );
};