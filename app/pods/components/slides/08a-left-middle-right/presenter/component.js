import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {

  didInsertElement() {
    this._super(...arguments);

    this.broadcastToRole('midi-gateway', 'applicationControl', { name: 'switchToPresentation' });
  },

});
