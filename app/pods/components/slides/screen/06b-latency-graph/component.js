import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  latencyCountData: undefined,

  async didInsertElement() {
    this._super(...arguments);

    this.addMetadataCountsRealtimeListener('latencyFastestInMs', (data) => {
      this.set('latencyCountData', data);
    });
  },
});
