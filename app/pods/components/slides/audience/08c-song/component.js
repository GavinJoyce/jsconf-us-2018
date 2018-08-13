import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { inject } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import song from 'jsconf-us-2018/data/song';
import { computed } from '@ember/object';

export default Component.extend(Realtime, {
  session: inject(),
  instrument: readOnly('session.user.metadata.instrument'),
  instrumentData: computed('instrument', function() {
    return song[this.get('instrument')];
  }),
  beat: undefined,

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('songBeat', ({ beat }) => {
      this.set('beat', beat);
    });
  },

  actions: {
    onChange(data) {
      data.instrument = this.get('instrument');
      this.broadcastToRoles(['midi-gateway', 'ableton'], 'instrumentXy', data);
    }
  }
});
