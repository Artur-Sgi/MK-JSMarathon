import Game from './classes/Game.js';
import Player from './classes/Player.js';

const player1 = new Player({
  player: 1,
  name: 'Scorpion',
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['fist', 'leg', 'chain', 'knife'],
});

const player2 = new Player({
  player: 2,
  name: 'Sub-Zero',
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['fist', 'leg', 'ice'],
});

const game = new Game({ player1, player2 });
game.start();
