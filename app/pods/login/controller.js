import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  session: inject(),

  username: '',
  password: '',

  revealOptionsCount: 0,
  showOptions: computed.gte('revealOptionsCount', 5),

  actions: {
    register() {
      let username = this.get('username');
      let password = this.get('password');
      this.set('showNameIsTaken', false);

      if(username.length === 0) {
        this.incrementProperty('revealOptionsCount');
      } else {
        this.get('session.loginTask').perform(username, password);
      }
    }
  }
});
