const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementsByTagName('img');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

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
const playlist = [pagandoMalComMal, breathe, ruMine];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}   
function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}   

function playPauseDecider(){
    if (isPlaying === true)
    {
        pauseSong();
    }
    else
    {
        playSong();
    }
}   

function intializeSong(){
    cover[0].src = `imagens/${playlist[index].file}.jpg`;
    song.src = `Músicas/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong(){
    if (index === 0)
    {
        index = playlist.length - 1;
    }
    else
    {
        index -= 1; 
    }
    intializeSong();
    playSong();
}

function nextSong(){
    if (index === playlist.length - 1)
    {
        index = 0;
    }
    else
    {
        index += 1; 
    }
    intializeSong();
    playSong();
}

intializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);