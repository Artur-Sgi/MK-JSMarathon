import Player from './Player.js';

const player1 = new Player(
  1,
  'Scorpion',
  'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  ['fist', 'leg', 'chain', 'knife']
);

const player2 = new Player(
  2,
  'Sub-Zero',
  'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  ['fist', 'leg', 'ice']
);

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(playerObj) {
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $progressbar = createElement('div', 'progressbar');
  const $player = createElement('div', `player${playerObj.player}`);
  const $img = createElement('img');

  $life.style.width = `${playerObj.hp}%`;
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $progressbar.append($life);
  $progressbar.append($name);
  $character.append($img);
  $player.append($progressbar);
  $player.append($character);

  return $player;
}

function showResult(name) {
  const $title = createElement('div', 'winTitle');
  if (name) {
    $title.innerText = `${name} win!`;
  } else {
    $title.innerText = `Draw!`;
  }

  return $title;
}

function getRandom(limit) {
  return Math.ceil(Math.random() * limit);
}

function defineWinner() {
  let winnerName;
  if (player1.hp == 0 && player2.hp > 0) {
    winnerName = player2.name;
  } else if (player2.hp == 0 && player1.hp > 0) {
    winnerName = player1.name;
  }
  $arenas.appendChild(showResult(winnerName));
}

function blockRandomBtn() {
  $randomBtn.disabled = true;
}

function createReloadButton() {
  const $reloadEl = createElement('div', 'reloadWrap');
  const $reloadBtn = createElement('button', 'button');
  $reloadBtn.innerText = 'Restart';
  $reloadEl.appendChild($reloadBtn);

  return $reloadEl;
}

const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);

const $arenas = document.querySelector('.arenas');
$arenas.append($player1);
$arenas.append($player2);

const $randomBtn = document.getElementById('random-button');
const $reloadBtn = createReloadButton();

$randomBtn.addEventListener('click', () => {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    blockRandomBtn();
    defineWinner();
    $arenas.querySelector('.control').append($reloadBtn);
  }
});

$reloadBtn.addEventListener('click', () => {
  window.location.reload();
});
