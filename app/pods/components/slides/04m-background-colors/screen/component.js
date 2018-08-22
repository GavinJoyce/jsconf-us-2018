import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { computed } from '@ember/object';

export default Component.extend(Realtime, {
  colorsClasses: undefined,
  colorClassIndex: 0,

  currentColorClass: computed('colorsClasses.[]', 'colorClassIndex', function() {
    return this.get('colorsClasses').objectAt(this.get('colorClassIndex'));
  }),

  init() {
    this._super(...arguments);

    this.set('colorsClasses', [
      'bg-red-dark',
      'bg-red',
      'bg-red-light',

      'bg-orange-dark',
      'bg-orange',
      'bg-orange-light',

      'bg-blue-dark',
      'bg-blue',
      'bg-blue-light',
    ]);
  },

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('changeColor', () => {
      let index = this.incrementProperty('colorClassIndex');
      if (index >= this.get('colorsClasses.length')) {
        this.set('colorClassIndex', 0);
      }
    });
  },
});
