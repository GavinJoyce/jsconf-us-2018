import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['role'],

  session: inject(),

  username: '',
  password: '',

  revealOptionsCount: 0,
  showOptions: computed.gte('revealOptionsCount', 5),

  backgroundClass: computed('role', function() {
    let role = this.get('role');

    if (role === 'screen') {
      return 'bg-blue-light';
    } else if(role === 'ableton') {
      return 'bg-green'
    } else if(role === 'presenter') {
      return 'bg-pink'
    } else {
      return 'bg-yellow';
    }
  }),

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
