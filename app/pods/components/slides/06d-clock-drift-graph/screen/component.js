import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  serverOffsetCountData: undefined,

  didInsertElement() {
    this._super(...arguments);

    this.addMetadataCountsRealtimeListener('latencyServerOffsetInMs', (data) => {
      this.set('serverOffsetCountData', data);
    });
  },
});
