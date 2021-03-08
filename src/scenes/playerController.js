import Phaser from 'phaser'
import StateMachine from '../stateMachine/StateMachine'
import { events } from './eventEmitter'

export default class PlayerController {
  constructor(scene, sprite = Phaser.Physics.Matter.Sprite, cursors, obstacles) {
    this.sprite = sprite
    this.cursors = cursors
    this.obstacles = obstacles
    this.scene = scene
    this.createAnimations()
    this.stateMachine = new StateMachine(this, 'player')
    this.stateMachine
      .addState('idle', { onEnter: this.idleOnEnter, onUpdate: this.idleOnUpdate })
      .addState('walk', { onEnter: this.walkOnEnter, onUpdate: this.walkOnUpdate })
      .addState('jump', { onEnter: this.jumpOnEnter, onUpdate: this.jumpOnUpdate })
      .addState('spike-hit', { onEnter: this.spikeHitOnEnter })
      .setState('idle')

    this.sprite.setOnCollide((data) => {
      const body = data.bodyB
      if (this.obstacles.is('spikes', body)) {
        this.stateMachine.setState('spike-hit')
        return
      }
      const { gameObject } = body
      if (!gameObject) {
        return
      }
      if (gameObject instanceof Phaser.Physics.Matter.TileBody) {
        if (this.stateMachine.isCurrentState('jump')) {
          this.stateMachine.setState('idle')
        }
        return
      }

      const sprite = gameObject
      const type = sprite.getData('type')

      if (type === 'cherry') {
        events.emit('cherry-collected')
        sprite.destroy()
      }
    })
  }

  update(dt) {
    this.stateMachine.update(dt)
  }

  idleOnEnter() {
    this.sprite.play('player-idle')
  }

  idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState('walk')
    }
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    const pressed = jumpPressed || this.cursors.up.isDown
    if (pressed) {
      this.stateMachine.setState('jump')
    }
  }

  walkOnEnter() {
    this.sprite.play('player-run')
  }

  walkOnUpdate() {
    const spriteSpeed = 5
    if (this.cursors.left.isDown) {
      this.sprite.flipX = true
      this.sprite.setVelocityX(-spriteSpeed)
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false
      this.sprite.setVelocityX(spriteSpeed)
    } else {
      this.sprite.setVelocityX(0)
      this.stateMachine.setState('idle')
    }

    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)

    const pressed = jumpPressed || this.cursors.up.isDown

    if (pressed) {
      this.stateMachine.setState('jump')
    }
  }

  jumpOnEnter() {
    this.sprite.setVelocityY(-12)
  }

  jumpOnUpdate() {
    const spriteSpeed = 5
    if (this.cursors.left.isDown) {
      this.sprite.flipX = true
      this.sprite.setVelocityX(-spriteSpeed)
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false
      this.sprite.setVelocityX(spriteSpeed)
    }
  }

  spikeHitOnEnter() {
    this.sprite.setVelocityY(-12)
    const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
    const endColor = Phaser.Display.Color.ValueToColor(0xff0000)
    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration: 100,
      repeat: 2,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: (tween) => {
        const value = tween.getValue()
        const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
          startColor,
          endColor,
          100,
          value
        )
        const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b)
        this.sprite.setTint(color)
      },
    })

    this.stateMachine.setState('idle')
  }

  createAnimations() {
    this.sprite.anims.create({
      key: 'player-idle',
      frames: [{ key: 'kim', frame: 'player_run_5.png' }],
    })

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
    })
  }
}
