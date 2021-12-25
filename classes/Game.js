import { generateLog } from '../services/LogService.js';
import {
  createReloadButton,
  getAttack,
  defineWinner,
  showResult,
} from '../services/FightService.js';
import Player from './Player.js';

let player1;
let player2;
const GET_PLAYERS_URL =
  'https://reactmarathon-api.herokuapp.com/api/mk/players';
const GET_RANDOM_PLAYER_URL =
  'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
const POST_ATTACK_URL =
  'http://reactmarathon-api.herokuapp.com/api/mk/player/fight';

export default class Game {
  getPlayers = async () => {
    const body = fetch(GET_PLAYERS_URL).then(res => res.json());
    return body;
  };

  getRandomPlayer = async () => {
    const body = fetch(GET_RANDOM_PLAYER_URL).then(res => res.json());
    return body;
  };

  getAttackData = async ({ hit, defence }) => {
    const body = fetch(POST_ATTACK_URL, {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence,
      }),
    }).then(res => res.json());
    return body;
  };

  start = async () => {
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = await this.getRandomPlayer();
    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });

    const $arenas = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');
    generateLog('start', player1, player2);

    const $player1 = player1.createPlayer();
    const $player2 = player2.createPlayer();
    $arenas.append($player1);
    $arenas.append($player2);

    const $reloadBtn = createReloadButton();
    $reloadBtn.addEventListener('click', () => {
      window.location.pathname = 'index.html';
    });

    $formFight.addEventListener('submit', async e => {
      e.preventDefault();
      const manualAttackChoice = getAttack($formFight);
      const attackData = await this.getAttackData(manualAttackChoice);
      const enemy = attackData.player2;
      const attack = attackData.player1;
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
  };
}
