export default class Player {
  constructor(player, name, img, weapon) {
    this.player = player;
    this.name = name;
    this.img = img;
    this.weapon = weapon;
    this.hp = 100;
  }

  attack() {
    console.log(`${this.name} Fight...`);
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
