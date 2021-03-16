// @ts-nocheck
import { Scene } from 'phaser';
import { getData } from '../api/data';

export default class LeaderboardScene extends Scene {
  constructor() {
    super('leaderboard');
    this.base = undefined;
  }

  init() {
    this.base = undefined;
  }

  async create() {
    const scores = await getData().then((res) => res);

    const results = scores;

    const createScores = (scores) => {
      const { width, height } = this.scale;
      const lastPosition = { x: width / 2, y: height * 0.15 };

      if (scores.length) {
        scores.forEach((result, index) => {
          this.add
            .text(
              lastPosition.x,
              lastPosition.y + index * 30,
              `${index + 1}. ${result.user} : ${result.score}`,
              {
                fill: '#ffffff',
                fontSize: '32px',
              },
            )
            .setOrigin(0.5)
            .setAlign()
            .setDepth(4);
          lastPosition.y += 40;
        });
      } else {
        this.add
          .text(width / 2, height / 2, 'Sorry, Unable to fetch Data for Now', {
            fill: '#ffffff',
            fontSize: '32px',
          })
          .setOrigin(0.5)
          .setDepth(4);
      }
    };
    createScores(results);
    this.add.text(10, 10, '<--- Press SPACE to return to the menu');
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('title');
    });
  }
}
