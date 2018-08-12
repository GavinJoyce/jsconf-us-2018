import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { inject } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend(Realtime, {
  session: inject(),
  instrument: readOnly('session.user.metadata.instrument'),
});
