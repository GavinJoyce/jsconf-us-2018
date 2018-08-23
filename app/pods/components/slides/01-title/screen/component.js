import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { inject } from '@ember/service';

export default Component.extend(Realtime, {
  audio: inject(),

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('playSound', ({ sound }) => {
      this.get('audio').play(sound);
    });

  },
});
