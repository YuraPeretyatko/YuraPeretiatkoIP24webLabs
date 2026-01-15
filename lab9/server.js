const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let clips = [
    { id: 1, artist: "Kalush Orchestra", song: "Stefania", views: 50000000, duration: 180, color: "bg-pink-500", genre: "folk", description: "Winner of Eurovision 2022." },
    { id: 2, artist: "Okean Elzy", song: "Bez boyu", views: 10000000, duration: 235, color: "bg-blue-500", genre: "rock", description: "Legendary hit." },
    { id: 3, artist: "Go_A", song: "SHUM", views: 25000000, duration: 178, color: "bg-green-500", genre: "folk", description: "Electro-folk banger." },
    { id: 4, artist: "Jamala", song: "1944", views: 30000000, duration: 183, color: "bg-purple-600", genre: "pop", description: "Deep and emotional." },
    { id: 5, artist: "Antytila", song: "Bakhmut", views: 15000000, duration: 280, color: "bg-yellow-600", genre: "rock", description: "Dedicated to heroes." },
    { id: 6, artist: "MONATIK", song: "Kruzhit", views: 120000000, duration: 210, color: "bg-red-500", genre: "pop", description: "Dance hit." },
    { id: 7, artist: "Jerry Heil", song: "Teresa & Maria", views: 18000000, duration: 175, color: "bg-indigo-500", genre: "pop", description: "Modern pop." },
    { id: 8, artist: "The Hardkiss", song: "Make-Up", views: 22000000, duration: 190, color: "bg-gray-700", genre: "rock", description: "Hard rock style." }
];

app.get('/api/clips', (req, res) => {
    const { search, sort, genre } = req.query;
    let result = [...clips];

    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(c => 
            c.artist.toLowerCase().includes(lowerSearch) || 
            c.song.toLowerCase().includes(lowerSearch)
        );
    }

    if (genre && genre !== 'all') {
        result = result.filter(c => c.genre === genre);
    }

    if (sort) {
        if (sort === 'views-desc') result.sort((a, b) => b.views - a.views);
        if (sort === 'views-asc') result.sort((a, b) => a.views - b.views);
        if (sort === 'artist-asc') result.sort((a, b) => a.artist.localeCompare(b.artist));
    }

    setTimeout(() => res.json(result), 500);
});

app.get('/api/clips/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clip = clips.find(c => c.id === id);
    if (clip) res.json(clip);
    else res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});