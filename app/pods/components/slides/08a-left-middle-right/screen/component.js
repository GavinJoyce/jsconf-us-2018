import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  counts: undefined,

  didInsertElement() {
    this._super(...arguments);

    this.addMetadataCountsRealtimeListener('section', (data) => {
      this.set('counts', data.counts);
    });
  },
});
