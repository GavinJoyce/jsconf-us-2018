import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  showTaskHighlight: false,
  showGeneratorHighlight: false,

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('toggleTaskHighlight', () => {
      this.toggleProperty('showTaskHighlight');
    });

    this.addRealtimeListener('toggleGeneratorHighlight', () => {
      this.toggleProperty('showGeneratorHighlight');
    });
  },
});
