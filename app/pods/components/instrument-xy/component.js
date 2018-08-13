import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import Automation from 'jsconf-us-2018/models/automation';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);
    schedule('afterRender', this, this._moveElements);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._moveElements();
  },

  _moveElements() {
    this._movePointer();
    this._moveGhostAutomationBox();
  },

  _movePointer() {
    let $pointer = this.element.querySelector('.pointer');

    if ($pointer) {
      let height = this.element.parentElement.offsetHeight;
      let width = this.element.parentElement.offsetWidth;

      let left = (width * (this.get('xy.xPercent') / 100));
      let top = (height * (this.get('xy.yPercent') / 100));

      $pointer.style.left = `${left}px`;
      $pointer.style.top = `${top}px`;
    }
  },

  _moveGhostAutomationBox() {
    let $automationBox = this.element.querySelector('.automation-box');

    if ($automationBox) {
      let beat = this.get('beat');
      let xAutomation = this.get('xAutomation');
      let yAutomation = this.get('yAutomation');

      let height = this.element.parentElement.offsetHeight;
      let width = this.element.parentElement.offsetWidth;

      let left = xAutomation.valueAtBeat(beat) * (width / 100) * 100;
      let top = yAutomation.valueAtBeat(beat) * (height / 100) * 100;

      $automationBox.style.left = `${left}px`;
      $automationBox.style.top = `${top}px`;
    }
  },

  xAutomation: computed('instrument', function() {
    return new Automation(this.get('instrument.x'));
  }),

  yAutomation: computed('instrument', function() {
    return new Automation(this.get('instrument.y'));
  }),

  isWaiting: computed('instrument.startsAt', 'beat', function() {
    let beat = this.get('beat') || 0;
    let startsAt = this.get('instrument.startsAt');

    return startsAt > beat;
  }),

  startsIn: computed('instrument.startsAt', 'beat', function() {
    return this.get('instrument.startsAt') - (this.get('beat') || 0);
  }),
});
