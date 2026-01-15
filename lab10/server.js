const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let clips = [
    { 
        id: 1, 
        artist: "Kalush Orchestra", 
        song: "Stefania", 
        views: 50000000, 
        duration: 180, 
        color: "bg-pink-500", 
        genre: "folk", 
        description: "Winner of Eurovision 2022.",
        variants: [
            { type: 'digital', label: 'Digital Download (4K)', price: 10 },
            { type: 'cd', label: 'CD Album', price: 20 },
            { type: 'vinyl', label: 'Limited Vinyl', price: 45 }
        ]
    },
    { 
        id: 2, 
        artist: "Okean Elzy", 
        song: "Bez boyu", 
        views: 10000000, 
        duration: 235, 
        color: "bg-blue-500", 
        genre: "rock", 
        description: "Legendary hit.",
        variants: [
            { type: 'digital', label: 'Digital Download (HD)', price: 8 },
            { type: 'cd', label: 'CD Single', price: 15 },
            { type: 'vinyl', label: 'Vinyl Record', price: 40 }
        ]
    },
    { id: 3, artist: "Go_A", song: "SHUM", views: 25000000, duration: 178, color: "bg-green-500", genre: "folk", description: "Electro-folk banger.", variants: [{ type: 'digital', label: 'Digital', price: 10 }, { type: 'cd', label: 'CD', price: 20 }] },
    { id: 4, artist: "Jamala", song: "1944", views: 30000000, duration: 183, color: "bg-purple-600", genre: "pop", description: "Deep and emotional.", variants: [{ type: 'digital', label: 'Digital', price: 10 }, { type: 'cd', label: 'CD', price: 20 }] },
    { id: 5, artist: "Antytila", song: "Bakhmut", views: 15000000, duration: 280, color: "bg-yellow-600", genre: "rock", description: "Dedicated to heroes.", variants: [{ type: 'digital', label: 'Digital', price: 10 }] },
    { id: 6, artist: "MONATIK", song: "Kruzhit", views: 120000000, duration: 210, color: "bg-red-500", genre: "pop", description: "Dance hit.", variants: [{ type: 'digital', label: 'Digital', price: 12 }, { type: 'vinyl', label: 'Vinyl', price: 50 }] },
    { id: 7, artist: "Jerry Heil", song: "Teresa & Maria", views: 18000000, duration: 175, color: "bg-indigo-500", genre: "pop", description: "Modern pop.", variants: [{ type: 'digital', label: 'Digital', price: 9 }] },
    { id: 8, artist: "The Hardkiss", song: "Make-Up", views: 22000000, duration: 190, color: "bg-gray-700", genre: "rock", description: "Hard rock style.", variants: [{ type: 'digital', label: 'Digital', price: 10 }, { type: 'cd', label: 'CD', price: 25 }] }
];


app.get('/api/clips', (req, res) => {
    const { search, sort, genre } = req.query;
    let result = [...clips];
    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(c => c.artist.toLowerCase().includes(lowerSearch) || c.song.toLowerCase().includes(lowerSearch));
    }
    if (genre && genre !== 'all') {
        result = result.filter(c => c.genre === genre);
    }
    if (sort) {
        const lastHyphenIndex = sort.lastIndexOf('-');
        if (lastHyphenIndex !== -1) {
            const field = sort.substring(0, lastHyphenIndex);
            const direction = sort.substring(lastHyphenIndex + 1);
            result.sort((a, b) => {
                let valA = a[field]; let valB = b[field];
                if (typeof valA === 'string') return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                else return direction === 'asc' ? valA - valB : valB - valA;
            });
        }
    }
    res.json(result);
});

app.get('/api/clips/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clip = clips.find(c => c.id === id);
    if (clip) res.json(clip);
    else res.status(404).json({ message: 'Clip not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});