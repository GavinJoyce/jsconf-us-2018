import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import song from 'jsconf-us-2018/data/song';

export default Component.extend(Realtime, {
  users: undefined,

  beat: undefined,

  pad1Xy: undefined,
  pad2Xy: undefined,
  miniV3Xy: undefined,
  prophetV3Xy: undefined,

  pad1: computed('users.[]', function() {
    return this.get('users').find(u => u.metadata.instrument === 'pad1');
  }),

  pad2: computed('users.[]', function() {
    return this.get('users').find(u => u.metadata.instrument === 'pad2');
  }),

  miniV3: computed('users.[]', function() {
    return this.get('users').find(u => u.metadata.instrument === 'miniV3');
  }),

  prophetV3: computed('users.[]', function() {
    return this.get('users').find(u => u.metadata.instrument === 'prophetV3');
  }),

  init() {
    this._super(...arguments);

    this.set('users', []);
    this.set('song', song);
  },

  didInsertElement() {
    this._super(...arguments);

    this.get('pollInstruments').perform();

    this.addRealtimeListener('instrumentXy', (data) => {
      this.set(`${data.instrument}Xy`, data);
    });

    this.addRealtimeListener('songBeat', ({ beat }) => {
      this.set('beat', beat);
    });
  },

  pollInstruments: task(function * () { //TODO: replace with a real time primitive that scales
    while(true) {
      let response = yield this.get('realtime').emitWithResponse('getUsersWithMetadata', 'instrument');
      this.set('users', response.users);

      yield timeout(1500);
    }
  })
});
