export default class Player {
  constructor(player, name, img, weapon) {
    this.player = player;
    this.name = name;
    this.img = img;
    this.weapon = weapon;
    this.hp = 100;
  }

  attack(attack, enemy) {
    if (enemy.hit !== attack.defence) {
      this.changeHP(enemy.value);
    } else {
      const valueDiff = enemy.value - attack.value;
      const breakProtection = valueDiff > 0 ? valueDiff : 0;
      this.changeHP(breakProtection);
    }
    this.renderHP();
  }

  changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }

  renderHP() {
    this.elHP().style.width = this.hp < 0 ? '0%' : `${this.hp}%`;
  }
}
