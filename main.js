import Player from './Player.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

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

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

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
  const $title = createElement('div', 'loseTitle');
  if (name) {
    $title.innerText = `${name} wins!`;
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

  return showResult(winnerName);
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
$arenas.append($player1);
$arenas.append($player2);

const $reloadBtn = createReloadButton();
$reloadBtn.addEventListener('click', () => {
  window.location.reload();
});

function getEnemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function getAttack() {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  return attack;
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const enemy = getEnemyAttack();
  const attack = getAttack();

  player1.attack(attack, enemy);
  player2.attack(enemy, attack);

  if (player1.hp === 0 || player2.hp === 0) {
    $arenas.appendChild(defineWinner());
    $arenas.append($reloadBtn);
  }
});
