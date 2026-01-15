const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let clips = [
    { id: '1', artist: 'Kalush Orchestra', song: 'Stefania', duration: 180, views: 50456123 },
    { id: '2', artist: 'Okean Elzy', song: 'Bez boyu', duration: 235, views: 10567890 },
    { id: '3', artist: 'Go_A', song: 'SHUM', duration: 178, views: 25987654 },
    { id: '4', artist: 'Jamala', song: '1944', duration: 183, views: 30123456 },
    { id: '5', artist: 'Antytila', song: 'Fortetsya Bakhmut', duration: 280, views: 15789012 },
    { id: '6', artist: 'Okean Elzy', song: 'Obiymy', duration: 220, views: 45001234 },
    { id: '7', artist: 'MONATIK', song: 'Kruzhit', duration: 210, views: 120500800 },
    { id: '8', artist: 'alyona alyona & Jerry Heil', song: 'Teresa & Maria', duration: 175, views: 18400000 }
];


app.get('/api/clips', (req, res) => {
    const { search, sort } = req.query;

    let result = [...clips];

    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter(c => 
            c.artist.toLowerCase().includes(lowerSearch) || 
            c.song.toLowerCase().includes(lowerSearch)
        );
    }

    if (sort) {
        const lastHyphenIndex = sort.lastIndexOf('-');
        const field = sort.substring(0, lastHyphenIndex);
        const direction = sort.substring(lastHyphenIndex + 1);

        result.sort((a, b) => {
            let valA = a[field];
            let valB = b[field];

            if (typeof valA === 'string') {
                return direction === 'asc' 
                    ? valA.localeCompare(valB) 
                    : valB.localeCompare(valA);
            }
            else {
                return direction === 'asc' 
                    ? valA - valB 
                    : valB - valA;
            }
        });
    }

    res.json(result);
});

app.get('/api/clips/:id', (req, res) => {
    const clip = clips.find(c => c.id === req.params.id);
    clip ? res.json(clip) : res.status(404).json({ message: 'Кліп не знайдено' });
});

app.post('/api/clips', (req, res) => {
    const newClip = {
        id: Date.now().toString(),
        artist: req.body.artist,
        song: req.body.song,
        duration: parseInt(req.body.duration),
        views: parseInt(req.body.views)
    };
    if (!newClip.artist || !newClip.song) return res.status(400).json({ message: 'Error' });
    clips.push(newClip);
    res.status(201).json(newClip);
});

app.put('/api/clips/:id', (req, res) => {
    const index = clips.findIndex(c => c.id === req.params.id);
    if (index !== -1) {
        clips[index] = { ...req.body, id: req.params.id };
        res.json(clips[index]);
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
});

app.delete('/api/clips/:id', (req, res) => {
    clips = clips.filter(c => c.id !== req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});