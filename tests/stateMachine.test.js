import StateMachine from '../src/stateMachine/StateMachine';

describe('Make a new instance of StateMachine class', () => {
  const player = new StateMachine(this, 'player');

  it('returns true when an object whose prototype is a StateMachine', () => {
    expect(
      Object.getPrototypeOf(player)
        === Object.getPrototypeOf(new StateMachine(this, 'player')),
    ).toBe(true);
  });

  it('we can check if we add new state will be an object', () => {
    expect(
      player.addState('run', { onEnter: undefined, onUpdate: undefined })
        instanceof Object,
    ).toBe(true);
  });

  it('we can check the changeStateQueue of new instance of the StateMachine', () => {
    expect(player.changeStateQueue).toEqual([]);
  });

  it('we can check the id of the new created instance', () => {
    expect(player.id).toEqual('player');
  });

  it('we can set a state to the new created instance', () => {
    expect(player.setState('run')).toBe(undefined);
  });

  it('we can check if the state is changing', () => {
    expect(player.isChangingState).toBe(false);
  });
  it('we can check the states we have on our new instance if it is a Map', () => {
    expect(player.states).toBeInstanceOf(Map);
  });
});
