let clips = [
    { id: 1, artist: "Kalush Orchestra", song: "Stefania", genre: "Folk", duration: 180, views: 50456123 },
    { id: 2, artist: "Okean Elzy", song: "Bez boyu", genre: "Rock", duration: 235, views: 10567890 },
    { id: 3, artist: "Go_A", song: "SHUM", genre: "Folk", duration: 178, views: 25987654 },
    { id: 4, artist: "Jamala", song: "1944", genre: "Pop", duration: 183, views: 30123456 },
    { id: 5, artist: "Antytila", song: "Fortetsya Bakhmut", genre: "Rock", duration: 280, views: 15789012 },
    { id: 6, artist: "MONATIK", song: "Kruzhit", genre: "Pop", duration: 210, views: 120500800 }
];

const grid = document.getElementById('grid');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');
const countBtn = document.getElementById('count-btn');
const totalResult = document.getElementById('total-result');
const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const modalTitle = document.getElementById('modal-title');
const createBtn = document.getElementById('create-btn');
const closeX = document.getElementById('close-x');
const cancelBtn = document.getElementById('cancel-btn');
const errorBanner = document.getElementById('error-message');
const inputs = {
    id: document.getElementById('id'),
    artist: document.getElementById('artist'),
    song: document.getElementById('song'),
    genre: document.getElementById('genre'),
    duration: document.getElementById('duration'),
    views: document.getElementById('views')
};

function formatTime(sec) {
    return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
}

function render(data) {
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Нічого не знайдено</p>';
        return;
    }

    grid.innerHTML = data.map(clip => `
        <div class="card">
            <span class="genre-tag">${clip.genre}</span>
            <h3>${clip.song}</h3>
            <h4>${clip.artist}</h4>
            <div class="stats">
                <span> ${formatTime(clip.duration)}</span>
                <span> ${clip.views.toLocaleString()}</span>
            </div>
            <button class="btn btn-edit" onclick="openEditModal(${clip.id})"> Редагувати</button>
        </div>
    `).join('');
}

function updateView() {
    let result = [...clips];
    
    const term = searchInput.value.toLowerCase();
    if (term) {
        result = result.filter(item => 
            item.artist.toLowerCase().includes(term) || 
            item.song.toLowerCase().includes(term)
        );
    }

    const genre = filterSelect.value;
    if (genre !== 'all') {
        result = result.filter(item => item.genre === genre);
    }

    const sort = sortSelect.value;
    if(sort === 'views-desc') result.sort((a,b) => b.views - a.views);
    if(sort === 'views-asc') result.sort((a,b) => a.views - b.views);
    if(sort === 'artist-asc') result.sort((a,b) => a.artist.localeCompare(b.artist));

    render(result);
}

countBtn.onclick = () => {
    let currentData = [...clips];
    const term = searchInput.value.toLowerCase();
    if (term) currentData = currentData.filter(i => i.artist.toLowerCase().includes(term) || i.song.toLowerCase().includes(term));
    const genre = filterSelect.value;
    if (genre !== 'all') currentData = currentData.filter(i => i.genre === genre);

    const total = currentData.reduce((sum, item) => sum + item.views, 0);
    totalResult.textContent = `Всього переглядів: ${total.toLocaleString()}`;
    totalResult.classList.add('visible');
};

function openModal() {
    overlay.classList.add('open');
    errorBanner.classList.remove('visible');
    errorBanner.innerHTML = '';
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

function closeModal() {
    overlay.classList.remove('open');
}

createBtn.onclick = () => {
    modalTitle.textContent = "Створити Новий Кліп";
    form.reset();
    inputs.id.value = '';
    inputs.genre.value = "Pop";
    openModal();
};

window.openEditModal = (id) => {
    const item = clips.find(c => c.id === id);
    if(item) {
        modalTitle.textContent = "Редагувати Кліп";
        inputs.id.value = item.id;
        inputs.artist.value = item.artist;
        inputs.song.value = item.song;
        inputs.genre.value = item.genre;
        inputs.duration.value = item.duration;
        inputs.views.value = item.views;
        openModal();
    }
};

closeX.onclick = closeModal;
cancelBtn.onclick = closeModal;
overlay.onclick = (e) => { if(e.target === overlay) closeModal(); };

form.onsubmit = (e) => {
    e.preventDefault();
    
    let errors = [];

    const artistVal = inputs.artist.value.trim();
    if (artistVal.length < 2) {
        errors.push("Ім'я виконавця має бути не менше 2 символів.");
        inputs.artist.classList.add('input-error');
    } else {
        inputs.artist.classList.remove('input-error');
    }

    const songVal = inputs.song.value.trim();
    if (songVal.length < 2) {
        errors.push("Назва пісні має бути не менше 2 символів.");
        inputs.song.classList.add('input-error');
    } else {
        inputs.song.classList.remove('input-error');
    }
    
    const durationVal = parseInt(inputs.duration.value);
    if (!durationVal || durationVal <= 0) {
        errors.push("Тривалість має бути числом більшим за 0.");
        inputs.duration.classList.add('input-error');
    } else {
        inputs.duration.classList.remove('input-error');
    }

    const viewsVal = parseInt(inputs.views.value);
    if (isNaN(viewsVal) || viewsVal < 0) {
        errors.push("Перегляди не можуть бути від'ємними.");
        inputs.views.classList.add('input-error');
    } else {
        inputs.views.classList.remove('input-error');
    }

    if (errors.length > 0) {
        errorBanner.innerHTML = `<strong>Виникли помилки:</strong><ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        errorBanner.classList.add('visible');
        return;
    }

    const formData = {
        id: inputs.id.value ? parseInt(inputs.id.value) : Date.now(),
        artist: artistVal,
        song: songVal,
        genre: inputs.genre.value,
        duration: durationVal,
        views: viewsVal
    };

    if (inputs.id.value) {
        const index = clips.findIndex(c => c.id === formData.id);
        if (index !== -1) clips[index] = formData;
    } else {
        clips.push(formData);
    }

    closeModal();
    updateView();
};

searchInput.addEventListener('input', updateView);
filterSelect.addEventListener('change', updateView);
sortSelect.addEventListener('change', updateView);

render(clips);