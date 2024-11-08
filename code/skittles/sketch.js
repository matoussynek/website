var wid;
var hei;
// images
var gI, oI, pI, rI, yI;
var images;
var noSkittles = 8;
var butt;
var ft;

function setup() {
  wid = windowWidth;
  hei = windowHeight;
  createCanvas(wid,hei);
}
function preload(){
  gI = loadImage('assets/g.png');
  oI = loadImage('assets/o.png');
  pI = loadImage('assets/p.png');
  rI = loadImage('assets/r.png');
  yI = loadImage('assets/y.png');
  images = [gI, oI, pI, rI, yI];
  butt = document.getElementById("bu");
  ft = document.getElementById("in");
  gn = document.getElementById("gn");
  butt.onclick = function(){
    var i = parseInt(ft.value);
    if (i > 0 && i < 20)
      noSkittles = i;
      displayImages();
  };
  gn.onclick = function(){
    displayImages();
  }
}

function draw() {
  displayImages();
  noLoop();
}
function displayImages(){
  background(88);
  for (let i = 0; i < noSkittles; i++){
    let s = wid/noSkittles;
    image(images[Math.floor(Math.random() * 5)], i*s, hei/2-s/2, s, s);
  }
}
function refresh(){
  window.location.reload();
}
