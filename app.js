'use strict';

//Play slash pause. actually really activates global transport
//************************************************************************

//set the transport to repeat
Tone.Transport.loopStart = 0;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "4m";

//start/stop the  global transport
document.querySelector('.global_transport').addEventListener('change', function(e){

  if (e.target.checked){
    Tone.Transport.start('+0.1');


  } else {
    Tone.Transport.stop()
  }
})







//Global Effect Declaration
//*************************************************************************************
var globalReverb = new Tone.JCReverb(0.0)

//Local Effect Declaration
//***************************************************************************************
var crushBass = new Tone.BitCrusher()

var chorusChord = new Tone.Chorus()

var delayArp = new Tone.FeedbackDelay("8n", 0.5)

var filterDrone = new Tone.AutoFilter().start();

var bassVibrato = new Tone.Vibrato()
//kickDrum
//************************************************************************

var kickDrum = new Tone.MembraneSynth()

kickDrum.chain(globalReverb, Tone.Master)


var kickOne = new Tone.Loop(function(time){
	kickDrum.triggerAttackRelease("C1", "4n", time)
}, "4n")

var kickLoopOne = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	kickDrum.triggerAttackRelease(note, "8n", time);
}, [[0, "C1"], ["0:0:3", "C1"], ["0:1:2", "C1"],["0:2:1","C1"]]);

var kickLoopTwo = new Tone.Part(function(time, note){
  kickDrum.triggerAttackRelease(note, "8n", time);
}, [[0, "C1"], ["0:1:2", "C1"], ["0:1:3", "C1"],["0:2:1","C1"],["0:3:1","C1"]]);

var kickLoopThree = new Tone.Part(function(time, note){
  kickDrum.triggerAttackRelease(note, "8n", time);
}, [[0, "C1"], ["0:2:2", "C1"], ["0:3:1", "C1"]]);


kickLoopOne.loop = true;
kickLoopTwo.loop = true;
kickLoopThree.loop = true;


document.querySelector('.kick_1').addEventListener('change', function(e){
  if (e.target.checked){
    kickOne.start('0:0:0')

  } else {
    kickOne.stop(0)
  }
})

document.querySelector('.kick_2').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopOne.start('0:0:0')

  } else {
    kickLoopOne.stop(0)
  }
})

document.querySelector('.kick_3').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopTwo.start('0:0:0')

  } else {
    kickLoopTwo.stop(0)
  }
})

document.querySelector('.kick_4').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopThree.start('0:0:0')

  } else {
    kickLoopThree.stop(0)
  }
})
//snare
//****************************************************************************
var snare = new Tone.NoiseSynth()

snare.chain(globalReverb, Tone.Master)

var snareOne = new Tone.Loop(function(time){
	snare.triggerAttackRelease("2n", time)
}, "2n")

var snareTwo = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	snare.triggerAttackRelease("16n", time);
}, [["0:1:0"], ["0:3:0"], ["1:1:0"],["1:3:0"],["1:3:3"]]);

snareTwo.loop = true;
snareTwo.loopEnd = '2m';

document.querySelector('.snare_1').addEventListener('change', function(e){
  if (e.target.checked){
    snareOne.start('0:1')

  } else {
    snareOne.stop(0)
  }
})

document.querySelector('.snare_2').addEventListener('change', function(e){
  if (e.target.checked){
    snareTwo.start(0)

  } else {
    snareTwo.stop(0)
  }
})





//hi hats
//*************************************************************************
var hats = new Tone.MetalSynth({
frequency  : 200 ,
envelope  : {
attack  : 0.0001 ,
decay  : 0.069 ,
release  : 0.05
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5
}

)

hats.chain(globalReverb, Tone.Master)

hats.volume.value = -20;

var hatsOne = new Tone.Loop(function(time){
	hats.triggerAttackRelease("8n", time)
}, "8n")

var hatsTwo = new Tone.Loop(function(time){
  hats.triggerAttackRelease("8n",time)
}, "4n")

var hatsThree = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	hats.triggerAttackRelease(note, "8n", time);
}, [[0], ["0:1:2"], ["0:2:0"],["0:2:1"],["0:2:3"],["0:3:0"],["0:3:1"]]);

hatsThree.loop = true;


document.querySelector('.hat_1').addEventListener('change', function(e){
  if (e.target.checked){
    hatsOne.start(0)

  } else {
    hatsOne.stop(0)
  }
})

document.querySelector('.hat_2').addEventListener('change', function(e){
  if (e.target.checked){
    hatsTwo.start("0:0:2)")

  } else {
    hatsTwo.stop(0)
  }
})

document.querySelector('.hat_3').addEventListener('change', function(e){
  if (e.target.checked){
    hatsThree.start(0)

  } else {
    hatsThree.stop(0)
  }
})
//chord
//####################################################################

var polySynth = new Tone.PolySynth(4, Tone.Synth)

polySynth.chain(chorusChord, globalReverb, Tone.Master)




var chordOne = new Tone.Part(function(time, note){
  polySynth.triggerAttackRelease(note, '1m', time);
}, [[0, ['C4', 'E4', 'G4', 'B4'] ], ['1:0:0', ['F4', 'A4', 'C5', 'E5']], ['2:0:0', ['D#3', 'G3', 'A#3', 'D4']], ['3:0:0', ['G#3', 'C4', 'D#4', 'G4']]]);

var chordTwo = new Tone.Part(function(time, note){
  polySynth.triggerAttackRelease(note, '1m', time);
}, [[0, ['C4', 'E4', 'G4', 'B4'] ], ['1:0:0', ['F3', 'A3', 'C4', 'E4']], ['2:0:0', ['G#3', 'C4', 'D#4', 'G4']], ['3:0:0', ['F#3', 'A#3', 'C#4', 'F4']]]);

document.querySelector('.chord_1').addEventListener('change', function(e){
  if (e.target.checked){
    chordOne.start(0);
    droneLoop.start(0);

  } else {
    chordOne.stop(0);
    droneLoop.stop(0);

  }
})

document.querySelector('.chord_2').addEventListener('change', function(e){
  if (e.target.checked){
    chordTwo.start(0);
    droneLoop.start(0);


  } else {
    chordTwo.stop(0);
    droneLoop.stop(0);

  }
})

//lead/arp
//##################################################

var arp = new Tone.Synth()

arp.chain(delayArp, globalReverb, Tone.Master)

arp.volume.value = -16;




var arpPart = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	arp.triggerAttackRelease(note, "16n", time);
}, [[0, "C5"], ["0:0:2", "E5"], ["0:1", "C5"],["0:1:2","E5"],["0:2","C5"],["0:2:2","E5"],["0:3","B5"],["0:3:2","G5"]]);

var arpPart2 = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	arp.triggerAttackRelease(note, "16n", time);
}, [[0, "C5"], ["0:0:2", "E5"], ["0:1", "G5"],["0:1:2","B5"],["0:2","C6"],["0:2:2","B5"],["0:3","G5"],["0:3:2","E5"]]);

arpPart.loop = true;
arpPart2.loop = true;

document.querySelector('.arp_1').addEventListener('change', function(e){
  if (e.target.checked){
    arpPart.start(0)

  } else {
    arpPart.stop(0)
  }
})

document.querySelector('.arp_2').addEventListener('change', function(e){
  if (e.target.checked){
    arpPart2.start(0)

  } else {
    arpPart2.stop(0)
  }
})
//bass drone
//###########################################################################
var bassDrone = new Tone.Synth()

bassDrone.chain(filterDrone, globalReverb, Tone.Master)

var droneLoop = new Tone.Part(function(time, note){

	bassDrone.triggerAttackRelease(note, "1m", time);
}, [[0, "B2"], ["1:0:0", "E2"], ["2:0:0", "G2"],["3:0:0","F2"]]);


//bassline
//#################################################################

var bass = new Tone.DuoSynth()

bass.chain(crushBass, bassVibrato, globalReverb, Tone.Master)


bass.volume.value = 0;

var bassPart = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	bass.triggerAttackRelease(note, "8n", time);
}, [["0:1:0", "B3"], ["0:1:2", "G3"], ["0:2:0", "A3"],["0:2:2","E3"],["1:1:2","E3"],["1:2:2","E3"],["1:3:2","E3"],["2:1:0", "B3"], ["2:1:2", "G3"], ["2:2:0", "A3"],["2:3:0","E3"],["3:1:2","E3"],["3:2:2","E3"]]);

var bassPartTwo = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	bass.triggerAttackRelease(note, "8n", time);
}, [["0:1:0", "B3"], ["0:1:2", "G3"], ["0:2:0", "A3"],["0:2:2","E4"],["1:1:2","E4"],["1:2:2","D4"],["1:3:2","B3"]]);

bassPart.loop = true;
bassPart.loopEnd = '4m';
bassPartTwo.loop = true;
bassPartTwo.loopEnd = '2m';


document.querySelector('.bass_1').addEventListener('change', function(e){
  if (e.target.checked){
    bassPart.start(0)

  } else {
    bassPart.stop(0)
  }
})

document.querySelector('.bass_2').addEventListener('change', function(e){
  if (e.target.checked){
    bassPartTwo.start(0)

  } else {
    bassPartTwo.stop(0)
  }
})
//volume volume node
//###################################################################




//bpm slider
//**************************************
Tone.Transport.bpm.value = 105;

document.querySelector('#bpm').addEventListener('input', function(e){
	Tone.Transport.bpm.value = parseInt(e.target.value);
  document.querySelector('#bpm_value').innerText = 'BPM: '+ parseInt(e.target.value);
})

//transport display
//##########################################################


//effects listeners
//######################################################################

document.querySelector('#reverb').addEventListener('input', function(e){
	globalReverb.roomSize.value = parseFloat(e.target.value)
})


polySynth.volume.value = -15;

document.querySelector('#chord_vol').addEventListener('input', function(e){
	polySynth.volume.value = parseFloat(e.target.value)
})

document.querySelector('#drone_vol').addEventListener('input', function(e){
	bassDrone.volume.value = parseFloat(e.target.value)
})

document.querySelector('#kick_vol').addEventListener('input', function(e){
	kickDrum.volume.value = parseFloat(e.target.value)
})

document.querySelector('#snare_vol').addEventListener('input', function(e){
	snare.volume.value = parseFloat(e.target.value)
})

document.querySelector('#hat_vol').addEventListener('input', function(e){
	hats.volume.value = parseFloat(e.target.value)
})

document.querySelector('#hat_freq').addEventListener('input', function(e){
	hats.frequency.value = parseInt(e.target.value)
})

document.querySelector('#arp_osc').addEventListener('input', function(e){
	arp.oscillator.type = e.target.value
})

document.querySelector('#hat_decay').addEventListener('input', function(e){
	hats.envelope.decay = parseFloat(e.target.value)
})

document.querySelector('#arp_decay').addEventListener('input', function(e){
	arp.envelope.decay = parseFloat(e.target.value)
})

document.querySelector('#arp_vol').addEventListener('input', function(e){
	arp.volume.value = parseFloat(e.target.value)
})

document.querySelector('#arp_release').addEventListener('input', function(e){
	arp.envelope.release = parseFloat(e.target.value)
})

document.querySelector('#arp_sustain').addEventListener('input', function(e){
	arp.envelope.sustain = parseFloat(e.target.value)
})

document.querySelector('#arp_attack').addEventListener('input', function(e){
	arp.envelope.attack = parseFloat(e.target.value)
})

delayArp.wet.value = 0;

document.querySelector('#arp_delay_wet').addEventListener('input', function(e){
	delayArp.wet.value = parseFloat(e.target.value)
})

document.querySelector('#arp_delay_time').addEventListener('input', function(e){
	delayArp.delayTime.value = parseFloat(e.target.value)
})


chorusChord.delayTime = 0.02;

document.querySelector('#chord_chorus').addEventListener('input', function(e){
	chorusChord.delayTime = parseFloat(e.target.value)
})

chorusChord.frequency.value = 1.5;

document.querySelector('#chord_chorus_freq').addEventListener('input', function(e){
	chorusChord.frequency.value = parseFloat(e.target.value)
})



document.querySelector('#bass_vol').addEventListener('input', function(e){
	bass.volume.value = parseFloat(e.target.value)
})

document.querySelector('#vib_bass').addEventListener('input', function(e){
	bassVibrato.frequency.value = parseFloat(e.target.value)
})

document.querySelector('#drone_filter').addEventListener('input', function(e){
	filterDrone.frequency.value = parseFloat(e.target.value)
})

crushBass.bits = 8;

document.querySelector('#crush_bass').addEventListener('input', function(e){
  crushBass.bits = parseFloat(e.target.value)
})

//######################EXPERIMENT#############################################

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
  const synth = new Tone.PolySynth( 10 );
  synth.toMaster();

  onKeyDown( synth );
  onKeyUp( synth );
})();
