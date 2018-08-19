const midi = require('midi');
const midiOutput = new midi.output();
const midiInput = new midi.input();

midiOutput.openVirtualPort('JSConf US 2018');
midiInput.openVirtualPort('JSConf US 2018');
midiInput.ignoreTypes(false, false, false); //(Sysex, Timing, Active Sensing)

const exec = require("child_process").exec;
const io = require('socket.io-client');
// const socket = io('http://localhost:5200');
const socket = io('http://34.226.118.128:5300');

const INSTRUMENTS = {
  pad1: { xNote: 1, yNote: 2 },
  pad2: { xNote: 3, yNote: 4 },
  miniV3: { xNote: 5, yNote: 6 },
  prophetV3: { xNote: 7, yNote: 8 }
};

const LIVE_COMMANDS = {
  stop: 100,
  play: 101
};

function _debug(data) {
  console.log('debug', data);
}

function liveControl(data) {
  console.log('LIVE CONTROL', data);
  let value = data.value || 127;

  if (data.command) {
    data.note = LIVE_COMMANDS[data.command];
  }

  if(data.note) {
    midiOutput.sendMessage([176, data.note, value]);
  }
}

function applicationControl(data) {
  console.log('applicationControl', data);
  if(data.name === 'switchToLive') {
    exec(`osascript -e 'activate application "Ableton Live 9 Suite"'`);
  } else if(data.name === 'toggleLiveLoop') { //TODO: use sendKey
    exec(`osascript -e 'tell application "System Events" to keystroke "e"'`);
  } else if(data.name === 'switchToPresentation') {
    exec(`osascript -e 'activate application "Google Chrome"'`);
  } else if(data.name === 'switchToTerminal') {
    exec(`osascript -e 'activate application "iTerm"'`);
  }
}

function sendKey(data) {
  console.log('sendKey', data);

  let using = '';
  if(data.commandOption) {
    using = ' using {command down, option down}';
  }

  if(data.key) {
    exec(`osascript -e 'tell application "System Events" to keystroke "${data.key}"${using}'`);
  }
}

function instrumentXy(data) {
  console.log('instrumentXy', data);

  let instrument = INSTRUMENTS[data.instrument];

  if(instrument) {
    if(data.xPercent !== undefined) {
      let x = Math.round((data.xPercent / 100) * 127); //TODO: do on server?
      console.log('send x', [176, instrument.xNote, x]);
      midiOutput.sendMessage([176, instrument.xNote, x]);
    }

    if(data.yPercent !== undefined) {
      let y = Math.round((data.yPercent / 100) * 127);
      console.log('send y', [176, instrument.yNote, y]);
      midiOutput.sendMessage([176, instrument.yNote, y]);
    }
  }
}

socket.on('connect', function() {
  console.log('CONNECT');

  socket.emit('login', { username: 'midi-gateway', password: 'midipassword' }, (response) => {
    console.log('LOGIN', response);

    socket.on('debug', _debug);
    socket.on('liveControl', liveControl);
    socket.on('applicationControl', applicationControl);
    socket.on('sendKey', sendKey);
    socket.on('instrumentXy', instrumentXy);
  });
});

socket.on('disconnect', function() {
  console.log('DISCONNECT');
  socket.off('debug', _debug);
  socket.off('liveControl', liveControl);
  socket.off('applicationControl', applicationControl);
  socket.off('sendKey', sendKey);
  socket.off('instrumentXy', instrumentXy);
  socket.off('liveControl', liveControl);
});


let drumMachineTick = 0;

midiInput.on('message', function(deltaTime, message) {
  if(message[0] === 250) { //stop
    drumMachineTick = 0;
  } else if(message[0] === 248) { //tick
    drumMachineTick++;
  }

  let beat = drumMachineTick / 24;
  if(drumMachineTick % 24 === 0) {
    console.log('tick', drumMachineTick, beat);

    socket.emit('broadcast', { name: 'songBeat', data: { beat }});

    // let sound = 'kick';
    // if(beat === 92) {
    //   sound = 'clap';
    // }
    //
    // if(beat > 64 && beat < 180) {
    //   socket.emit('playSoundInFuture', {
    //     sound: sound,
    //     delayInMs: 1000,
    //     filter: { os: 'iOS' }
    //    });
    //  }
  }
});
