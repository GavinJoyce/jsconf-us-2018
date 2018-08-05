import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { inject } from '@ember/service';

export default Component.extend(Realtime, {
  beethoven12Audio: inject(),
  counts: undefined,

  didInsertElement() {
    this._super(...arguments);

    this.addMetadataCountsRealtimeListener('symphonyInstrument', (data) => {
      this.set('counts', data.counts);
    });
  },
});
