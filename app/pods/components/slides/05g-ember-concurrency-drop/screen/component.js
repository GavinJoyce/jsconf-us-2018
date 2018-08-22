import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  showHighlight: false,

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('toggleHighlight', () => {
      this.toggleProperty('showHighlight');
    });
  },
});
