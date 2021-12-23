import { getRandom } from './HelpersService.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createPlayer = playerObj => {
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
};

const showResult = name => {
  const $title = createElement('div', 'loseTitle');
  if (name) {
    $title.innerText = `${name} wins!`;
  } else {
    $title.innerText = `Draw!`;
  }

  return $title;
};

const defineWinner = (player1, player2) => {
  let winnerName;
  if (player1.hp == 0 && player2.hp > 0) {
    winnerName = player2.name;
  } else if (player2.hp == 0 && player1.hp > 0) {
    winnerName = player1.name;
  }

  return winnerName;
};

const createReloadButton = () => {
  const $reloadEl = createElement('div', 'reloadWrap');
  const $reloadBtn = createElement('button', 'button');
  $reloadBtn.innerText = 'Restart';
  $reloadEl.appendChild($reloadBtn);

  return $reloadEl;
};

const getEnemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const getAttack = $formFight => {
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
};

export {
  createPlayer,
  createReloadButton,
  getEnemyAttack,
  getAttack,
  defineWinner,
  showResult,
};
