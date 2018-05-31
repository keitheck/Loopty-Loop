'use strict';

var sequencer = new Nexus.Sequencer('#target',{
 'size': [400,90],
 'mode': 'toggle',
 'rows': 3,
 'columns': 16
})

var bassSequencer = new Nexus.Sequencer('#bass',{
 'size': [400,90],
 'mode': 'toggle',
 'rows': 3,
 'columns': 16
})

//set the transport to repeat
Tone.Transport.loopStart = 0;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "4m";

//start/stop the  global transport
document.querySelector('.playpause').addEventListener('change', function(e){

  if (e.target.checked){
    Tone.Transport.start('+0.1');
    sequencer.start();
    bassSequencer.start();

  } else {
    Tone.Transport.stop();
    sequencer.stop();
    bassSequencer.stop();

  }
});

var kick = new Tone.MembraneSynth().toMaster()

var snare = new Tone.NoiseSynth().toMaster()

var hats = new Tone.MetalSynth().toMaster()

var bass = new Tone.MonoSynth().toMaster()

bass.volume.value = -10;

hats.envelope.decay = 0.05;

var step
sequencer.on('step',function(v) {

  step = v;

  if(step[0] === 1) {

    kick.triggerAttackRelease("C1","4n");
  };

  if(step[1] === 1) {
    snare.triggerAttackRelease("4n");
  };

  if(step[2] === 1) {
    hats.triggerAttackRelease("16n");
  };
})

var stepTwo
bassSequencer.on('step',function(v){
  stepTwo = v;
  if(stepTwo[0] === 1) {
  bass.triggerAttackRelease("C3","8n");
  };

if(stepTwo[1] === 1) {
  bass.triggerAttackRelease("G3","8n");
  };

if(stepTwo[2] === 1) {
  bass.triggerAttackRelease("C4","8n");
  };
})




//set the transport to repeat
Tone.Transport.loopStart = 0;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "4m";


//start/stop the  global transport
document.querySelector('.playpause').addEventListener('change', function(e){



  if (e.target.checked){
    Tone.Transport.start('+0.1');


  } else {
    Tone.Transport.stop()
  }


})

Tone.Transport.bpm.value = 105;






//***********************************************************
let octave = 4;

const keys = [];
let prevKey = 0;

const Instruments = {
  // https://github.com/stuartmemo/qwerty-hancock
  keyboard: {
    // Lower octave.
    a: 'Cl',
    w: 'C#l',
    s: 'Dl',
    e: 'D#l',
    d: 'El',
    f: 'Fl',
    t: 'F#l',
    g: 'Gl',
    y: 'G#l',
    h: 'Al',
    u: 'A#l',
    j: 'Bl',
    // Upper octave.
    k: 'Cu',
    o: 'C#u',
    l: 'Du',
    p: 'D#u',
    ';': 'Eu',
    "'": 'Fu',
    ']': 'F#u',
    '\\': 'Gu',
  },
};

let instrument = Instruments.keyboard;

const keyToNote = key => {
  const note = instrument[ key ];
  if ( !note ) {
    return;
  }

  return Tone.Frequency(
    note
      .replace( 'l', octave )
      .replace( 'u', octave + 1 )
  ).toNote();
};

const onKeyDown = (() => {
  let listener;

  return synth => {
    document.removeEventListener( 'keydown', listener );

    listener = event => {
      const { key } = event;

      // Only trigger once per keydown event.
      if ( !keys[ key ] ) {
        keys[ key ] = true;

        const note = keyToNote( key );
        if ( note ) {
          synth.triggerAttack( note );
          prevKey = key;
        }
      }
    };

    document.addEventListener( 'keydown', listener );
  };
})();

const onKeyUp = (() => {
  let listener;
  let prev;

  return synth => {
    // Clean-up.
    if ( prev ) {
      prev.triggerRelease();
    }

    document.removeEventListener( 'keyup', listener );

    prev = synth;
    listener = event => {
      const { key } = event;
      if ( keys[ key ] ) {
        keys[ key ] = false;

        const note = keyToNote( key );
        if ( synth instanceof Tone.PolySynth ) {
          synth.triggerRelease( note );
        } else if ( note && key === prevKey ) {
          // Trigger release if this is the previous note played.
          synth.triggerRelease();
        }
      }
    };

    document.addEventListener( 'keyup', listener );
  };
})();

// Octave controls.
document.addEventListener( 'keydown', event => {
  // Decrease octave range (min: 0).
  if ( event.key === 'z' ) { octave = Math.max( octave - 1, 0 ); }
  // Increase octave range (max: 10).
  if ( event.key === 'x' ) { octave = Math.min( octave + 1, 9 ); }
});

// Init.
(() => {
  const synth = new Tone.PolySynth( 10, Tone.AMSynth);
  synth.toMaster();

  onKeyDown( synth );
  onKeyUp( synth );
})();
