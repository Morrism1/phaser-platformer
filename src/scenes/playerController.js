// @ts-nocheck
import Phaser from 'phaser';
import StateMachine from '../stateMachine/StateMachine';
import { events } from './eventEmitter';

export default class PlayerController {
  constructor(scene, sprite = Phaser.Physics.Matter.Sprite, cursors, obstacles) {
    this.health = 100;
    this.sprite = sprite;
    this.cursors = cursors;
    this.obstacles = obstacles;
    this.scene = scene;
    this.jumps = 0;
    this.sprite.jumping = false;
    this.createAnimations();
    this.stateMachine = new StateMachine(this, 'player');
    this.stateMachine
      .addState('idle', { onEnter: this.idleOnEnter, onUpdate: this.idleOnUpdate })
      .addState('walk', { onEnter: this.walkOnEnter, onUpdate: this.walkOnUpdate })
      .addState('jump', { onEnter: this.jumpOnEnter, onUpdate: this.jumpOnUpdate })
      .addState('spike-hit', { onEnter: this.spikeHitOnEnter })
      .addState('dead', {
        onEnter: this.deadOnEnter,
      })
      .setState('idle');

    this.sprite.setOnCollide((data) => {
      let a;
      const body = data.bodyB;
      if (this.obstacles.is('spikes', body)) {
        this.stateMachine.setState('spike-hit');
        return;
      }
      const { gameObject } = body;
      if (!gameObject) {
        return;
      }
      if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
        if (this.stateMachine.isCurrentState('jump')) {
          this.stateMachine.setState('idle');
        }
        return;
      }

      const sprite = gameObject;
      const type = sprite.getData('type');

      if (type === 'cherry') {
        events.emit('cherry-collected');
        sprite.destroy();
      }

      if (type === 'health') {
        a = sprite.getData('healthValue');
        const value = a !== null && a !== undefined
          ? a
          : 10;
        this.health = Phaser.Math.Clamp(this.health + value, 0, 100);
        events.emit('health-changed', this.health);
        sprite.destroy();
      }
    });
  }

  update(dt) {
    this.stateMachine.update(dt);
  }

  setHealth(value) {
    this.health = Phaser.Math.Clamp(value, 0, 100);
    events.emit('health-changed', this.health);

    if (this.health <= 0) {
      this.stateMachine.setState('dead');
    }
  }

  deadOnEnter() {
    this.sprite.play('player-die');
    this.sprite.setOnCollide(() => { });
    this.scene.time.delayedCall(1500, () => {
      this.scene.scene.start('game-over');
      this.setHealth(100);
    });
  }

  idleOnEnter() {
    this.sprite.play('player-idle');
  }

  idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState('walk');
    }
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const pressed = jumpPressed || this.cursors.up.isDown;
    if (pressed) {
      this.stateMachine.setState('jump');
    }
  }

  walkOnEnter() {
    this.sprite.play('player-run');
  }

  walkOnUpdate() {
    const spriteSpeed = 5;
    if (this.cursors.left.isDown) {
      this.sprite.flipX = true;
      this.sprite.setVelocityX(-spriteSpeed);
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(spriteSpeed);
    } else {
      this.sprite.setVelocityX(0);
      this.stateMachine.setState('idle');
    }

    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const pressed = jumpPressed || this.cursors.up.isDown;

    if (pressed) {
      this.stateMachine.setState('jump');
    }
  }

  jumpOnEnter() {
    this.sprite.setVelocityY(-12);
    this.jumps = 0;
  }

  jumpOnUpdate() {
    const spriteSpeed = 5;
    if (this.cursors.left.isDown) {
      this.sprite.flipX = true;
      this.sprite.setVelocityX(-spriteSpeed);
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(spriteSpeed);
    }

    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space);

    const pressed = jumpPressed || this.cursors.up.isDown;

    if (pressed && this.jumps < 2) {
      this.sprite.setVelocityY(-12);
      this.jumps += 1;
      this.stateMachine.setState('idle');
    }
  }

  spikeHitOnEnter() {
    this.sprite.setVelocityY(-12);
    const startColor = Phaser.Display.Color.ValueToColor(0xffffff);
    const endColor = Phaser.Display.Color.ValueToColor(0xff0000);
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 100,
      repeat: 2,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween) => {
        const value = tween.getValue();
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          startColor,
          endColor,
          100,
          value,
        );
        const color = Phaser.Display.Color.GetColor(
          colorObject.r,
          colorObject.g,
          colorObject.b,
        );
        this.sprite.setTint(color);
      },
    });

    this.stateMachine.setState('idle');
    this.setHealth(this.health - 40);
  }

  createAnimations() {
    this.sprite.anims.create({
      key: 'player-idle',
      frames: [{ key: 'kim', frame: 'player_run_5.png' }],
    });

    this.sprite.anims.create({
      key: 'player-run',
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNames('kim', {
        start: 8,
        end: 11,
        prefix: 'player_run_',
        suffix: '.png',
      }),
      repeat: -1,
    });

    this.sprite.anims.create({
      key: 'player-die',
      frames: this.sprite.anims.generateFrameNames('kim', {
        start: 2,
        end: 4,
        prefix: 'player_run_',
        suffix: '.png',
      }),
      frameRate: 10,
    });
  }
}
