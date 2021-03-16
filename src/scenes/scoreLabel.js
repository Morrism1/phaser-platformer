import Phaser from 'phaser';
import { events } from './eventEmitter';
import { postData } from '../api/data';

export default class ScoreLabel extends Phaser.Scene {
  constructor() {
    super({ key: 'score' });
    this.cherriesCollected = 0;
    this.lastHealth = 100;
    this.score = 0;
  }

  init() {
    this.cherriesCollected = 0;
  }

  create() {
    this.graphics = this.add.graphics();
    this.setHealthBar(this.lastHealth);
    this.cherryLabel = this.add.text(10, 40, 'Cherries: 0', {
      fontSize: '32px',
    });

    events.on('cherry-collected', this.handleCherryCollected, this);
    events.on('health-changed', this.handleHealthChanged, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, async () => {
      events.off('cherry-collected', this.handleCherryCollected, this);
      const name = JSON.parse(localStorage.getItem('userName'));
      await postData(name, this.score);
    });
  }

  setHealthBar(value) {
    const width = 200;
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100;
    this.graphics.clear();
    this.graphics.fillStyle(0x808080);
    this.graphics.fillRoundedRect(10, 10, width, 20, 5);
    if (percent > 0) {
      this.graphics.fillStyle(0x00ff00);
      this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5);
    }
  }

  handleHealthChanged(value) {
    this.tweens.addCounter({
      from: this.lastHealth,
      to: value,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.setHealthBar(value);
      },
    });
    this.lastHealth = value;
  }

  handleCherryCollected() {
    this.cherriesCollected += 10;
    this.cherryLabel.text = `Cherries: ${this.cherriesCollected}`;
    this.score = this.cherriesCollected;
  }
}
