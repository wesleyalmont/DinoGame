"strict";

const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreEl = document.querySelector(".score");
const cactus = document.createElement("div");

let score = 0;
let isJumping = false;
let position = 0;

function hadleKeyup(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // descer
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //subir
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  let cactusPosition = 1300;
  let randomTime = Math.random() * 7000;

  cactus.classList.add("cactus");
  cactus.style.left = 2000 + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactusPosition);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `<h1 class='game-over'>Fim de jogo</h1>`;
    } else {
      cactusPosition -= 10; // velocidade do cactus
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function pointingScore() {
  setInterval(() => {
    score += 1;
    scoreEl.innerText = score;
    if(score == 100){
      tunOfflights()
    }else if (score > 250){
      tunOnlights()
    }
  }, 100);
  clearInterval(pointingScore);
}

pointingScore();
createCactus();

function tunOfflights() {
  background.style.filter = "invert()";
  dino.style.filter = "invert()";
  cactus.style.filter = "invert()";
  document.body.style.background = '#000';
}
  
function tunOnlights() {
  background.style.filter = "none";
  dino.style.filter = "none";
  cactus.style.filter = "none";
  document.body.style.background = '#fff';
}
document.addEventListener("keypress", hadleKeyup);
