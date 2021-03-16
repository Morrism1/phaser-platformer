import Phaser from 'phaser';

const shared = new Phaser.Events.EventEmitter();
const player = 'player';

export { shared as events, player };
