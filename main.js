const player1 = {
  name: 'Scorpion',
  hp: 75,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'leg', 'chain', 'knife'],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

const player2 = {
  name: 'Sub-Zero',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['fist', 'leg', 'ice'],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
};

function createPlayer(playerClass, player) {
  const $img = document.createElement('img');
  $img.src = player.img;

  const $character = document.createElement('div');
  $character.classList.add('character');
  $character.append($img);

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = `${player.hp}%`;

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = player.name;

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');
  $progressbar.append($life);
  $progressbar.append($name);

  const $player = document.createElement('div');
  $player.classList.add(playerClass);
  $player.append($progressbar);
  $player.append($character);

  return $player;
}

const $player1 = createPlayer('player1', player1);
const $player2 = createPlayer('player2', player2);

const $arenas = document.getElementById('arenas');
$arenas.append($player1);
$arenas.append($player2);
