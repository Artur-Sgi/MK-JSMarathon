import { createElement } from '../services/HelpersService.js';

export default class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.img = props.img;
    this.hp = 100;
  }

  attack = (
    { value: attackValue, defence: attackDefence },
    { hit: enemyHit, value: enemyValue }
  ) => {
    const attackResult = { type: 'hit', value: 0 };
    if (enemyHit !== attackDefence) {
      this.changeHP(enemyValue);
      attackResult.value = enemyValue;
    } else {
      const valueDiff = enemyValue - attackValue;
      const breakProtection = valueDiff > 0 ? valueDiff : 0;
      this.changeHP(breakProtection);
      attackResult.type = 'defence';
      attackResult.value = breakProtection;
    }
    this.renderHP();

    return attackResult;
  };

  changeHP = damage => {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = this.hp < 0 ? '0%' : `${this.hp}%`;
  };

  createPlayer = () => {
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $progressbar = createElement('div', 'progressbar');
    const $player = createElement('div', `player${this.player}`);
    const $img = createElement('img');

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;
    $img.src = this.img;

    $progressbar.append($life);
    $progressbar.append($name);
    $character.append($img);
    $player.append($progressbar);
    $player.append($character);

    return $player;
  };
}
