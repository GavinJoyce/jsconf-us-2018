import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { computed } from '@ember/object';

export default Component.extend(Realtime, {
  videoUrls: undefined,
  videoUrlIndex: 0,

  currentVideoUrl: computed('videoUrls.[]', 'videoUrlIndex', function() {
    return this.get('videoUrls').objectAt(this.get('videoUrlIndex'));
  }),

  init() {
    this._super(...arguments);

    this.set('videoUrls', [
      '/video/crosby.webm',
      '/video/swimmers.webm',
      '/video/boulevard.webm',
    ]);
  },

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('changeVideo', () => {
      let index = this.incrementProperty('videoUrlIndex');
      if (index >= this.get('videoUrls.length')) {
        this.set('videoUrlIndex', 0);
      }
    });
  },
});
