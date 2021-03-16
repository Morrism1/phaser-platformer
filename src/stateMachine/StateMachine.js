let idCount = 0;
export default class StateMachine {
  constructor(context, id) {
    this.id = (idCount += 1).toString();
    this.states = new Map();
    this.isChangingState = false;
    this.changeStateQueue = [];
    this.id = id !== null && id !== undefined ? id : this.id;
    this.context = context;
  }

  get previousStateName() {
    if (!this.previousState) {
      return '';
    }
    return this.previousState.name;
  }

  isCurrentState(name) {
    if (!this.currentState) {
      return false;
    }
    return this.currentState.name === name;
  }

  addState(name, config) {
    let a;
    let b;
    let c;
    const { context } = this;


    this.states.set(name, {
      name,
      onEnter:
        (a = config === null || config === undefined ? undefined : config.onEnter)
          === null || a === undefined
          ? undefined
          : a.bind(context),
      onUpdate:
        (b = config === null || config === undefined ? undefined : config.onUpdate)
          === null || b === undefined
          ? undefined
          : b.bind(context),
      onExit:
        (c = config === null || config === undefined ? undefined : config.onExit)
          === null || c === undefined
          ? undefined
          : c.bind(context),
    });
    return this;
  }

  setState(name) {
    if (!this.states.has(name)) {
      return;
    }
    if (this.isCurrentState(name)) {
      return;
    }
    if (this.isChangingState) {
      this.changeStateQueue.push(name);
      return;
    }
    this.isChangingState = true;

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }
    this.previousState = this.currentState;
    this.currentState = this.states.get(name);
    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }
    this.isChangingState = false;
  }

  update(dt) {
    if (this.changeStateQueue.length > 0) {
      this.setState(this.changeStateQueue.shift());
      return;
    }
    if (this.currentState && this.currentState.onUpdate) {
      this.currentState.onUpdate(dt);
    }
  }
}
