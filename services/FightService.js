import { createElement } from './HelpersService.js';

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

const getAttack = $formFight => {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  return attack;
};

export { createReloadButton, getAttack, defineWinner, showResult };
