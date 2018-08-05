import Service from '@ember/service';

const SOUNDS = [
  'flute', 'oboe', 'clarinet1', 'clarinet2', 'horn1', 'horn2', 'trumpet',
  'violin1', 'violin2', 'viola', 'cello', 'contrabass'
];

function getRandom(items) {
  let randomIndex = Math.floor(Math.random()*items.length);
  return items[randomIndex];
}

export default Service.extend({
  sounds: SOUNDS,

  getRandomSound() {
    return getRandom(SOUNDS)
  }
});