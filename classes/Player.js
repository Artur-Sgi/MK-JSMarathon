export default class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.img = props.img;
    this.weapon = props.weapon;
    this.hp = 100;
  }

  attack = (
    { value: attackValue, defence: attackDefence },
    { hit: enemyHit, value: enemyValue, defence: enemyDefence }
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
}
