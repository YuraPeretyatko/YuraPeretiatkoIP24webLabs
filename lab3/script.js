const DATA = [
    { id: 1, artist: "Kalush Orchestra", song: "Stefania", duration: 180, views: 50456123 },
    { id: 2, artist: "Okean Elzy", song: "Bez boyu", duration: 235, views: 10567890 },
    { id: 3, artist: "Go_A", song: "SHUM", duration: 178, views: 25987654 },
    { id: 4, artist: "Jamala", song: "1944", duration: 183, views: 30123456 },
    { id: 5, artist: "Antytila", song: "Fortetsya Bakhmut", duration: 280, views: 15789012 }
];

const container = document.getElementById('clips-container');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const countBtn = document.getElementById('count-btn');
const totalResult = document.getElementById('total-result');

function formatTime(sec) {
    return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
}

function render(items) {
    container.innerHTML = items.length ? items.map(item => `
        <div class="card">
            <div class="card-header"></div>
            <div class="card-body">
                <h3>${item.song}</h3>
                <h4>${item.artist}</h4>
                <div class="card-stats">
                    <span>⏱ ${formatTime(item.duration)}</span>
                    <span>👁 ${item.views.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('') : '<p style="grid-column:1/-1;text-align:center">Нічого не знайдено</p>';
}

function update() {
    let res = DATA.filter(i => 
        i.artist.toLowerCase().includes(searchInput.value.toLowerCase()) || 
        i.song.toLowerCase().includes(searchInput.value.toLowerCase())
    );

    const sort = sortSelect.value;
    if(sort === 'views-desc') res.sort((a,b) => b.views - a.views);
    if(sort === 'views-asc') res.sort((a,b) => a.views - b.views);
    if(sort === 'artist-asc') res.sort((a,b) => a.artist.localeCompare(b.artist));

    render(res);
}

countBtn.onclick = () => {
    let res = DATA.filter(i => 
        i.artist.toLowerCase().includes(searchInput.value.toLowerCase()) || 
        i.song.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    const total = res.reduce((sum, i) => sum + i.views, 0);
    totalResult.textContent = `Всього переглядів: ${total.toLocaleString()}`;
    totalResult.classList.add('visible');
};

searchInput.addEventListener('input', update);
sortSelect.addEventListener('change', update);

render(DATA);