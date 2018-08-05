import Service from '@ember/service';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import { notEmpty } from '@ember/object/computed';
import RunMixin from 'ember-lifeline/mixins/run';

const PING_REQUESTS_TO_MAKE = 10;
const MAXIMUM_ALLOWED_LATENCY_MS = 100;

function randomNumber(max) {
  return Math.floor((Math.random() * max) + 1);
}

export default Service.extend(RunMixin, {
  realtime: inject(),
  session: inject(),
  userAgent: inject(),

  addRandomAudienceLatency: true, //useful for testing locally

  pongResponses: null,
  fastestResponse: null,
  slowestResponse: null,
  delayForMs: null,

  runLoopLag: null,
  timeoutLag: null,
  setTimeoutLag: null,

  hasResults: notEmpty('pongResponses'),

  init() {
    this._super(...arguments);

    this.set('pongResponses', []);

    let realtime = this.get('realtime');
    realtime.on('latencyPong', this._latencyPong, this);
  },

  //TODO: GJ: convert to promise or async function (and a nicer API)
  executeInSynchronizedFuture(delayInMs, serverTime, callback) {
    let fastestResponse = this.get('fastestResponse');

    if(!fastestResponse || fastestResponse.latencyInMs > MAXIMUM_ALLOWED_LATENCY_MS) {
      return;
    }

    let osAdjustmentMs = 0;
    if(this.get('userAgent.os.isAndroid')) {
      osAdjustmentMs = -100; //Android is sloooow!
    }

    let serverWhen = serverTime + delayInMs;
    let localDelayInMs = serverWhen - Date.now() + fastestResponse.serverOffsetInMs + osAdjustmentMs;

     if(localDelayInMs > 50) {
       this.runTask(callback, localDelayInMs);
     }
  },

  testRealtimeLatency() {
    let realtime = this.get('realtime');

    realtime.emit('latencyReport', {
      latencyReport: null
    });

    this.set('pongResponses', []);
    this._latencyPing();
  },

  testRealtimeLatencyIfRequired() {
    if (!this.get('hasResults')) {
      this.testRealtimeLatency(); //TODO: use a task
    }
  },

  _latencyPing() {
    let realtime = this.get('realtime');
    realtime.emit('latencyPing', { timestamp: Date.now() });
  },

  _latencyPong(data) { //TODO: use a task?
    // console.log('_latencyPong', data);
    let pongResponses = this.get('pongResponses');
    let pongCount = pongResponses.get('length');

    let now = Date.now();

    let latencyInMs = (now - data.timestamp) / 2;

    if (this.get('addRandomAudienceLatency')) {
      latencyInMs += randomNumber(200);
    }

    let serverOffsetInMs = now - data.serverTime - latencyInMs;

    pongResponses.pushObject({
      data,
      latencyInMs,
      serverOffsetInMs
    });

    if(pongCount < PING_REQUESTS_TO_MAKE) {
      later(() => {
        this._latencyPing();
      }, randomNumber(1000));
    } else {
      //get the offset from the ping/pong with the lowest latency
      let sortedResponses = pongResponses.sortBy('latencyInMs');
      let fastestResponse = sortedResponses.get('firstObject');
      let slowestResponse = sortedResponses.get('lastObject');

      this.set('fastestResponse', fastestResponse); //TODO: GJ: CPs
      this.set('slowestResponse', slowestResponse);

      let realtime = this.get('realtime');
      realtime.emit('updateUserMetaData', {
        latencyFastestInMs: fastestResponse.latencyInMs,
        latencySlowestInMs: slowestResponse.latencyInMs,
        latencyServerOffsetInMs: fastestResponse.serverOffsetInMs
      });
    }
  }
});