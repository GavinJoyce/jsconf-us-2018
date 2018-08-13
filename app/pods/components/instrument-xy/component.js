import Component from '@ember/component';
import { schedule } from '@ember/runloop';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    schedule('afterRender', this, this._movePointer);
  },

  didUpdateAttrs() {
    this._super(...arguments);

    this._movePointer();
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
});
