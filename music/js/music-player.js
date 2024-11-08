var songs = [];
var playing = false;
var current = 0;
var images = ["assets/touch-bg.jpg","assets/aching.jpg","assets/golden.jpg","assets/please.jpg"];
var titles = ["Touch", "Aching for you", "Golden", "Please"];
var bgs = ["linear-gradient(to right, #efb8b7, #bee5f2)", "linear-gradient(to right, #000040, #37a2d7)", "linear-gradient(to right, #a28161, #808080)", "linear-gradient(to right, #250d15, #a96522)" ];
var links = ["https://www.youtube.com/watch?v=ycF6_PviDXg", "https://www.youtube.com/watch?v=n0vPeBVeShI", "https://www.youtube.com/watch?v=FxagZjP3Vro", "https://www.youtube.com/watch?v=v0X4z4QD0-8" ];
var loaded = 0;
var slider;
var left, right;


function preload(){
    songs.push(loadSound('assets/touch.mp3'));
    songs.push(loadSound('assets/aching.mp3'));
    songs.push(loadSound('assets/golden.mp3'));
    songs.push(loadSound('assets/please.mp3'));
    /*ongs = loadSound('assets/touch.mp3','assets/aching.mp3','assets/golden.mp3','assets/please.mp3');*/
}
function setup(){
    slider = document.getElementById('slider');
    left = document.getElementById('left');
    right = document.getElementById('right');
    frameRate(10);
}
function draw(){
    if(playing){
        slider.value = ( songs[current].currentTime() / songs[current].duration() ) * 100;
        var secs = floor(songs[current].currentTime())%60;
        var mins = floor(songs[current].currentTime()/60);
        left.innerHTML = ((mins<10) ? "0"+mins : mins) + ":" + ((secs<10) ? "0" + secs : secs);
    }
}
function playstop(){
    if(songs[current].isLoaded()){
        var secs = floor(songs[current].duration())%60;
        var mins = floor(songs[current].duration()/60);
        right.innerHTML = ((mins<10) ? "0"+mins : mins) + ":" + ((secs<10) ? "0" + secs : secs);
        if(playing){
            document.getElementById('stop-butt').style.visibility = "hidden";
            document.getElementById('play-butt').style.visibility = "visible";
            songs[current].pause();
        }
        else{
            document.getElementById('stop-butt').style.visibility = "visible";
            document.getElementById('play-butt').style.visibility = "hidden";
            songs[current].play();
        }
        playing = !playing;
    }

}
function nextSong(){
    if(playing){
        playstop();
    }
    slider.value = 0;
    current = (current +1) % images.length;
    document.getElementById('cover-img').src = images[current];
    document.getElementById('song').innerHTML = titles[current];
    document.body.style.background = bgs[current];
}
function prevSong(){
    if(playing){
        playstop();
    }
    current = (current - 1) % images.length;
    if(current<0) current = images.length -1;
    document.getElementById('cover-img').src = images[current];
    document.getElementById('song').innerHTML = titles[current];
    document.body.style.background = bgs[current];
}
function openLink(){
    if(playing){
        playstop();
    }
    var url = links[current];
    var win = window.open(url, '_blank');
    win.focus();
}
