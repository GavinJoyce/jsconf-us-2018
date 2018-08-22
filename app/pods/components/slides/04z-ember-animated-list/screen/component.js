import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';

import models from '../../../../../data/animated-models';

export default Component.extend(Realtime, {
  init() {
    this._super(...arguments);

    this.set('models', models);

    let shuffledLogos = shuffle(models.logos);

    this.set('leftItems', shuffledLogos.slice(0, 5));
    this.set('rightItems', shuffledLogos.slice(5, 10));
  },

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('moveRandomLeft', () => {
      this.send('moveRandomLeft');
    });

    this.addRealtimeListener('moveRandomRight', () => {
      this.send('moveRandomRight');
    });
  },

  listTransition: function * ({ keptSprites, sentSprites, receivedSprites }) {
    keptSprites.forEach(move);
    sentSprites.forEach(move);
    receivedSprites.forEach(sprite => sprite.moveToFinalPosition());
    yield;
  },

  routeTransition: function * ({ sentSprites, receivedSprites }) {
    yield sentSprites.forEach(sprite => {
      scale(sprite);
      move(sprite);
    });

    yield receivedSprites.forEach(sprite => {
      scale(sprite);
      move(sprite);
    });
  },

  actions: {
    move(item) {
      if (!item) {
        return;
      }

      let rightItems = this.get('rightItems');
      let leftItems = this.get('leftItems');
      let index = rightItems.indexOf(item);
      if (index !== -1) {
        this.set('rightItems', rightItems.slice(0, index).concat(rightItems.slice(index+1)));

        let randomIndex = Math.floor(Math.random()*leftItems.get('length'));
        leftItems.insertAt(randomIndex, item);
      } else {
        index = leftItems.indexOf(item);
        this.set('leftItems', leftItems.slice(0, index).concat(leftItems.slice(index+1)));

        let randomIndex = Math.floor(Math.random()*rightItems.get('length'));
        rightItems.insertAt(randomIndex, item);
      }
    },
    moveRandomLeft() {
      let randomItem = getRandomItem(this.get('rightItems'));
      this.send('move', randomItem);
    },
    moveRandomRight() {
      let randomItem = getRandomItem(this.get('leftItems'));
      this.send('move', randomItem);
    }
  }
});

function getRandomItem(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}