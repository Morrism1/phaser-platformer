import { Scene } from 'phaser'

export default class InputForm extends Scene {
  constructor() {
    super('input')
  }
  preload() {
    this.load.html('form', 'assets/form.html')
  }

  create() {
    const text = this.add.text(10, 10, 'Please Enter your Name to play', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '32px ',
    })
    const element = this.add
      .dom(this.scale.width * 0.5, this.scale.height * 0.5)
      .createFromCache('form')

    element.addListener('click')
    element.on('click', function ({ target }) {
      if (target.name === 'loginButton') {
        const inputUsername = this.getChildByName('username')

        //  Have they entered anything?
        if (inputUsername.value !== '') {
          //  Turn off the click events
          this.removeListener('click')

          //  Tween the login form out
          this.scene.tweens.add({
            targets: element.rotate3d,
            x: 1,
            w: 90,
            duration: 3000,
            ease: 'Power3',
          })

          this.scene.tweens.add({
            targets: element,
            scaleX: 2,
            scaleY: 2,
            y: 700,
            duration: 3000,
            ease: 'Power3',
            onComplete() {
              element.setVisible(false)
            },
          })

          //  Put the username! in the LocalStorage

          let userName = inputUsername.value

          localStorage.setItem('userName', JSON.stringify(userName))

          console.log(inputUsername.value, this)
          this.scene.scene.start('preloader')
        } else {
          //  Flash the prompt
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true,
          })
        }
      }
    })

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    })
  }
}