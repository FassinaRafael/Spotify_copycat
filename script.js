// Seletores de Elementos
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
// Correção: Selecionar o primeiro elemento img, pois getElementsByTagName retorna um HTMLCollection
const cover = document.getElementsByTagName('img')[0]; 
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const shuffleButton = document.querySelector('.button-container button:nth-of-type(1)'); // Botão de Shuffle
const repeatButton = document.querySelector('.button-container button:nth-of-type(5)'); // Botão de Repeat
const progressBarContainer = document.querySelector('.progresso');
const progressBar = document.querySelector('.progresso p');
// Ex: <p id="current-time">0:00</p> <p id="song-duration">0:00</p>
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('song-duration');


// Estrutura da Playlist
const pagandoMalComMal = {
    songName: 'Pagando Mal com Mal',
    artist: 'Menos é Mais',
    file: 'pagandoMalComMal'
};
const breathe = {
    songName: 'Breathe (In the Air)',
    artist: 'Pink Floyd',
    file: 'breathe'
};
const ruMine = {
    songName: 'R U Mine?',
    artist: 'Artic Monkeys',
    file: 'ruMine'
};

let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
const playlist = [pagandoMalComMal, breathe, ruMine];
let index = 0; // Índice da música atual na playlist

// Funções de Controle de Reprodução
const playSong = () => {
    // 1. Atualiza o ícone do botão
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    // 2. Toca a música
    song.play();
    isPlaying = true;
};

const pauseSong = () => {
    // 1. Atualiza o ícone do botão
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    // 2. Pausa a música
    song.pause();
    isPlaying = false;
};

const playPauseDecider = () => {
    // Alterna entre tocar e pausar
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
};

const intializeSong = () => {
    // 1. Carrega a capa, áudio, nome e artista
    cover.src = `imagens/${playlist[index].file}.jpg`;
    song.src = `Músicas/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;

    // 2. Define o atributo loop
    song.loop = isRepeating;

    // O elemento de áudio (song) deve carregar os metadados para ter a duração
    song.addEventListener('loadedmetadata', () => {
        // Formata e exibe a duração da música (se houver o elemento durationEl)
        if (durationEl) {
            durationEl.innerText = formatTime(song.duration);
        }
    });
};

const previousSong = () => {
    // Se a playlist estiver embaralhada, simplesmente toca a música anterior
    if (isShuffled) {
        // Alternativa simples: Embaralhar para obter um novo índice aleatório
        index = Math.floor(Math.random() * playlist.length);
    } else {
        // Navegação sequencial
        if (index === 0) {
            index = playlist.length - 1; // Volta para o final
        } else {
            index -= 1;
        }
    }
    intializeSong();
    playSong();
};

const nextSong = () => {
    // Se a playlist estiver embaralhada
    if (isShuffled) {
        // Obtém um novo índice aleatório, garantindo que não seja o mesmo (se possível)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * playlist.length);
        } while (newIndex === index && playlist.length > 1);
        index = newIndex;
    } else {
        // Navegação sequencial
        if (index === playlist.length - 1) {
            index = 0; // Volta para o início
        } else {
            index += 1;
        }
    }
    intializeSong();
    playSong();
};

// Funções de Formatação e Progresso
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const updateProgress = () => {
    const progressPercent = (song.currentTime / song.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Atualiza o tempo atual da música (se houver o elemento currentTimeEl)
    if (currentTimeEl) {
        currentTimeEl.innerText = formatTime(song.currentTime);
    }
};

const setProgress = (event) => {
    // Calcula a posição do clique dentro da barra
    const width = progressBarContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = song.duration;

    // Define o novo tempo de reprodução
    song.currentTime = (clickX / width) * duration;
};

// Funções para Botões Extras
const toggleShuffle = () => {
    isShuffled = !isShuffled;
    // Realça o botão se o modo estiver ativo
    shuffleButton.classList.toggle('active', isShuffled);
    // Adiciona feedback visual, se a classe 'active' for definida no CSS
};

const toggleRepeat = () => {
    isRepeating = !isRepeating;
    // Define o atributo loop no elemento de áudio
    song.loop = isRepeating;
    // Realça o botão se o modo estiver ativo
    repeatButton.classList.toggle('active', isRepeating);
    // Adiciona feedback visual, se a classe 'active' for definida no CSS
};


// 1. Inicialização e Carregamento da Primeira Música
intializeSong();

// 2. Ouvintes de Eventos Obrigatórios
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);

// 3. Ouvintes de Eventos para Funcionalidade Extras (Progresso e Playback)
song.addEventListener('timeupdate', updateProgress);
progressBarContainer.addEventListener('click', setProgress);

// Ouvinte para próxima música automática ao fim da reprodução
song.addEventListener('ended', () => {
    // Se não estiver no modo de repetição (isRepeating já é tratado pelo song.loop = true/false), toca a próxima
    if (!isRepeating) { 
        nextSong();
    }
});

// Ouvintes para Shuffle e Repeat
shuffleButton.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);
