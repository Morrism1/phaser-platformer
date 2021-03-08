import Phaser from 'phaser';
import { events } from './eventEmitter';

export default class ScoreLabel extends Phaser.Scene {
  constructor() {
    super({ key: 'score' });
    this.cherriesCollected = 0;
  }

  init() {
    this.cherriesCollected = 0;
  }

  create() {
    this.cherryLabel = this.add.text(10, 10, 'Cherries: 0', {
      fontSize: '32px',
    });

    events.on('cherry-collected', this.handleCherryCollected, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off('cherry-collected', this.handleCherryCollected, this);
    });
  }

  handleCherryCollected() {
    this.cherriesCollected += 1;
    this.cherryLabel.text = `Cherries: ${this.cherriesCollected}`;
  }
}
