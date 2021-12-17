import Player from './classes/Player.js';
import { generateLog } from './services/LogService.js';
import {
  createPlayer,
  createReloadButton,
  getEnemyAttack,
  getAttack,
  defineWinner,
  showResult,
} from './services/FightService.js';

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

generateLog('start', player1, player2);

const $player1 = createPlayer(player1);
const $player2 = createPlayer(player2);
$arenas.append($player1);
$arenas.append($player2);

const $reloadBtn = createReloadButton();
$reloadBtn.addEventListener('click', () => {
  window.location.reload();
});

$formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const enemy = getEnemyAttack();
  const attack = getAttack($formFight);

  const player1Result = player2.attack(enemy, attack);
  const player2Result = player1.attack(attack, enemy);

  generateLog(player1Result, player1, player2);
  generateLog(player2Result, player2, player1);

  if (player1.hp === 0 || player2.hp === 0) {
    const winnerName = defineWinner(player1, player2);
    $arenas.appendChild(showResult(winnerName));
    $arenas.append($reloadBtn);

    const logType = winnerName ? 'end' : 'draw';
    generateLog(logType, player1, player2, winnerName);
  }
});
