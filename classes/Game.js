import { generateLog } from '../services/LogService.js';
import {
  createPlayer,
  createReloadButton,
  getEnemyAttack,
  getAttack,
  defineWinner,
  showResult,
} from '../services/FightService.js';

export default class Game {
  constructor(props) {
    this.player1 = props.player1;
    this.player2 = props.player2;
  }

  start = () => {
    const $arenas = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');
    generateLog('start', this.player1, this.player2);

    const $player1 = createPlayer(this.player1);
    const $player2 = createPlayer(this.player2);
    $arenas.append($player1);
    $arenas.append($player2);

    const $reloadBtn = createReloadButton();
    $reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });

    $formFight.addEventListener('submit', e => {
      e.preventDefault();
      const enemy = getEnemyAttack();
      const attack = getAttack($formFight);

      const player1Result = this.player2.attack(enemy, attack);
      const player2Result = this.player1.attack(attack, enemy);

      generateLog(player1Result, this.player1, this.player2);
      generateLog(player2Result, this.player2, this.player1);

      if (this.player1.hp === 0 || this.player2.hp === 0) {
        const winnerName = defineWinner(this.player1, this.player2);
        $arenas.appendChild(showResult(winnerName));
        $arenas.append($reloadBtn);

        const logType = winnerName ? 'end' : 'draw';
        generateLog(logType, this.player1, this.player2, winnerName);
      }
    });
  };
}
