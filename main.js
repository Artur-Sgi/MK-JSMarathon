const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'leg', 'chain', 'knife'],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const player2 = {
  player: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['fist', 'leg', 'ice'],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

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

function changeHP(playerObj) {
  const $playerLife = document.querySelector(
    `.player${playerObj.player} .life`
  );
  const damagedHp = playerObj.hp - getRandomizedDamage();
  playerObj.hp = damagedHp < 0 ? 0 : damagedHp;
  $playerLife.style.width = playerObj.hp < 0 ? '0%' : `${playerObj.hp}%`;
}

function playerWin(name) {
  const $winTitle = createElement('div', 'winTitle');
  $winTitle.innerText = `${name} win!`;

  return $winTitle;
}

function draw() {
  const $title = createElement('div', 'winTitle');
  $title.innerText = `Draw!`;

  return $title;
}

function getRandomizedDamage() {
  return Math.ceil(Math.random() * 20);
}

function defineWinner() {
  let winnerName;
  if (player1.hp == 0 && player2.hp > 0) {
    winnerName = player2.name;
  } else if (player2.hp == 0 && player1.hp > 0) {
    winnerName = player1.name;
  }
  $arenas.appendChild(winnerName ? playerWin(winnerName) : draw());
}

function blockRandomBtn() {
  $randomBtn.disabled = true;
}

const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);

const $arenas = document.querySelector('.arenas');
$arenas.append($player1);
$arenas.append($player2);

const $randomBtn = document.querySelector('.button');

$randomBtn.addEventListener('click', () => {
  changeHP(player2);
  changeHP(player1);
  if (player1.hp === 0 || player2.hp === 0) {
    blockRandomBtn();
    defineWinner();
  }
});
