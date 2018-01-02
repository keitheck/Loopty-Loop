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
    console.log(Tone.Transport);
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

var crushTom = new Tone.BitCrusher();

var chorusTom = new Tone.Chorus();

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

var kickLoopFive = new Tone.Part(function(time, note){
  kickDrum.triggerAttackRelease(note, "16n", time);
}, [[0, "C1"], ["0:0:3", "C1"], ["0:1:0", "C1"], ["0:1:3", "C1"], ["0:2:0", "C1"]]);


kickLoopOne.loop = true;
kickLoopTwo.loop = true;
kickLoopThree.loop = true;
kickLoopFive.loop = true;


document.querySelector('.kick_1').addEventListener('change', function(e){
  if (e.target.checked){
    kickOne.start(0)

  } else {
    kickOne.stop(0)
  }
})

document.querySelector('.kick_2').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopOne.start(0)

  } else {
    kickLoopOne.stop(0)
  }
})

document.querySelector('.kick_3').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopTwo.start(0)

  } else {
    kickLoopTwo.stop(0)
  }
})

document.querySelector('.kick_4').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopThree.start(0)

  } else {
    kickLoopThree.stop(0)
  }
});

document.querySelector('.kick_5').addEventListener('change', function(e){
  if (e.target.checked){
    kickLoopFive.start(0)

  } else {
    kickLoopFive.stop(0)
  }
});
//snare
//****************************************************************************
var snare = new Tone.NoiseSynth()

snare.chain(globalReverb, Tone.Master)

var snareOne = new Tone.Loop(function(time){
	snare.triggerAttackRelease("2n", time)
}, "2n")

document.querySelector('.snare_1').addEventListener('change', function(e){
  if (e.target.checked){
    snareOne.start('0:1')

  } else {
    snareOne.stop(0)
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
}, [[0], ["0:1:2"], ["0:1:2.5"],["0:1:3"],["0:1:3.5"],["0:2:0"],["0:2:0.5"],["0:2:2"],["0:3:1"]]);

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
});

//Toms
//****************************************************************************
var tom = new Tone.MembraneSynth();

tom.chain(chorusTom, Tone.Master);



var tomOne = new Tone.Part(function(time, note){
  tom.triggerAttackRelease(note, "2m", time);
}, [[0, "C3"], ["0:0:1", "D4"], ["0:0:2", "C3"],["0:0:3","D4"],["0:1:0","C3"],["0:3:2","C3"]]);

tomOne.loop = true;

var tomTwo = new Tone.Part(function(time, note){
  tom.triggerAttackRelease(note, '1m', time);
}, [['0:0:2', 'C3'], ['0:1:0', 'C3'], ['0:2:2', 'C3'], ['0:3:0', 'C3']]);

tomTwo.loop = true;
tomTwo.loopEnd = '1m';

document.querySelector('.tom_1').addEventListener('change', function(e){
  if (e.target.checked){
    tomOne.start(0);

  } else {
    tomOne.stop(0);
  }
});

document.querySelector('.tom_2').addEventListener('change', function(e){
  if (e.target.checked){
    tomTwo.start(0);

  } else {
    tomTwo.stop(0);
  }
});


// var kickLoopTwo = new Tone.Part(function(time, note){
//   kickDrum.triggerAttackRelease(note, "8n", time);
// }, [[0, "C1"], ["0:1:2", "C1"], ["0:1:3", "C1"],["0:2:1","C1"],["0:3:1","C1"]]);


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
    chordOne.start(0)


  } else {
    chordOne.stop(0)

  }
})

document.querySelector('.chord_2').addEventListener('change', function(e){
  if (e.target.checked){
    chordTwo.start(0)


  } else {
    chordTwo.stop(0)

  }
})

//lead/arp
//##################################################

var arp = new Tone.AMSynth({
harmonicity  : 3 ,
detune  : 0 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.01 ,
decay  : 0.01 ,
sustain  : 1 ,
release  : 0.5
}  ,
modulation  : {
type  : "square"
}  ,
modulationEnvelope  : {
attack  : 0.5 ,
decay  : 0 ,
sustain  : 1 ,
release  : 0.5
}
}
)

arp.chain(globalReverb, Tone.Master)

arp.volume.value = -16;




var arpPart = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	arp.triggerAttackRelease(note, "8n", time);
}, [[0, "C5"], ["0:0:2", "E5"], ["0:1", "C5"],["0:1:2","E5"],["0:2","C5"],["0:2:2","E5"],["0:3","B5"],["0:3:2","G5"]]);

arpPart.loop = true;

document.querySelector('.arp_1').addEventListener('change', function(e){
  if (e.target.checked){
    arpPart.start(0)

  } else {
    arpPart.stop(0)
  }
})

//bassline
//#################################################################

var bass = new Tone.DuoSynth()

bass.chain(crushBass, globalReverb, Tone.Master)


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
//keyboard audio files
//###################################################################

var aScale = [];

//Solo keyboard
//#####################################################################

function KeyboardScale(key,notes) {
  this.key = key;
  this.notes = notes;
  this.position = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
}

var cScale = new KeyboardScale('C-Major', [ 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66]);

var guitarSolo = new Tone.PluckSynth({
  attackNoise  : 1 ,
  dampening  : 2000 ,
  resonance  : 0.99
});

guitarSolo.chain(globalReverb, Tone.Master);

guitarSolo.volume.value = 1;


function playKey(noteValue){
  guitarSolo.triggerAttack(noteValue);
}

//
// var cScale = ['B2', 'C3', 'D3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C5', 'D5'];

//This solution indtroduces too much lag and loop eventually gets out of sync
//#############################################################################################

// document.getElementById('keyboard').addEventListener('mouseenter', function(e){
//
//   for (var i = 0; i <= cScale.position.length; i++){
//
//     document.getElementById(cScale.position[i]).addEventListener('mouseenter', function(e){
//       console.log(e.target.id);
//       console.log(cScale.notes[e.target.id]);
//       playKey(cScale.notes[e.target.id]);
//     });
//   }
// });

var aScale = new Tone.Buffer (['./samples/kick4.flac']);

//add play via keyboard functionality

var qq = 81;
var ww = 87;
var ee = 69;
var rr = 82;
var tt = 84;
var yy = 89;
var uu = 85;
var ii = 73;
var oo = 79;
var pp = 80;
var leftBracket = 219;
var rightBracket = 221;
var backSlash = 220;
var aa = 65;
var ss = 83;
var dd = 68;
var ff = 70;



window.addEventListener('keydown', function(e) { //inspired from courses.wesbos.com
  console.log('keydown', e.keyCode);

  if (qq === e.keyCode){
    playKey(cScale.notes[0]);
    document.getElementById('0').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('0').classList.remove('playing');
    });
  }

  if (ww === e.keyCode){
    playKey(cScale.notes[1]);
    document.getElementById('1').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('1').classList.remove('playing');
    });
  }
  if (ee === e.keyCode){
    playKey(cScale.notes[2]);
    document.getElementById('2').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('2').classList.remove('playing');
    });
  }
  if (rr === e.keyCode){
    playKey(cScale.notes[3]);
    document.getElementById('3').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('3').classList.remove('playing');
    });
  }
  if (tt === e.keyCode){
    playKey(cScale.notes[4]);
    document.getElementById('4').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('4').classList.remove('playing');
    });
  }
  if (yy === e.keyCode){
    playKey(cScale.notes[5]);
    document.getElementById('5').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('5').classList.remove('playing');
    });
  }
  if (uu === e.keyCode){
    playKey(cScale.notes[6]);
    document.getElementById('6').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('6').classList.remove('playing');
    });
  }
  if (ii === e.keyCode){
    playKey(cScale.notes[7]);
    document.getElementById('7').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('7').classList.remove('playing');
    });
  }
  if (oo === e.keyCode){
    playKey(cScale.notes[8]);
    document.getElementById('8').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('8').classList.remove('playing');
    });
  }
  if (pp === e.keyCode){
    playKey(cScale.notes[9]);
    document.getElementById('9').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('9').classList.remove('playing');
    });
  }
  if (leftBracket === e.keyCode){
    playKey(cScale.notes[10]);
    document.getElementById('10').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('10').classList.remove('playing');
    });
  }
  if (rightBracket === e.keyCode){
    playKey(cScale.notes[11]);
    document.getElementById('11').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('11').classList.remove('playing');
    });
  }
  if (backSlash === e.keyCode){
    playKey(cScale.notes[12]);
    document.getElementById('12').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('12').classList.remove('playing');
    });
  }
  if (aa === e.keyCode){
    playKey(cScale.notes[13]);
    document.getElementById('13').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('13').classList.remove('playing');
    });
  }
  if (ss === e.keyCode){
    playKey(cScale.notes[14]);
    document.getElementById('14').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('14').classList.remove('playing');
    });
  }
  if (dd === e.keyCode){
    playKey(cScale.notes[15]);
    document.getElementById('15').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('15').classList.remove('playing');
    });
  }
  if (ff === e.keyCode){
    playKey(cScale.notes[16]);
    document.getElementById('16').classList.add('playing');
    window.addEventListener('keyup', function(e) {
      console.log('keyup', e.keyCode);
      document.getElementById('16').classList.remove('playing');
    });
  }
});

// window.addEventListener('keyup', function(e) { //inspired from courses.wesbos.com
//   console.log('keyup', e.keyCode);
//   for (var i = 0; i < cScale.notes.length; i++){
//     document.getElementById([i]).classList.remove('playing');
//   }
// });



//key1 - audio file
// document.getElementById('0').addEventListener('mouseenter', function(e){
//   console.log(cScale.notes[e.target.id]);
//   aScale[0].start();
// });

//key1
document.getElementById('0').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key2
document.getElementById('1').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key3
document.getElementById('2').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key4
document.getElementById('3').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key5
document.getElementById('4').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key6
document.getElementById('5').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key7
document.getElementById('6').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key8
document.getElementById('7').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key9
document.getElementById('8').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key10
document.getElementById('9').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key11
document.getElementById('10').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key12
document.getElementById('11').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key13
document.getElementById('12').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key14
document.getElementById('13').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key15
document.getElementById('14').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key16
document.getElementById('15').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});

//key17
document.getElementById('16').addEventListener('mouseenter', function(e){
  console.log(cScale.notes[e.target.id]);
  playKey(cScale.notes[e.target.id]);
});


// for (var i = 0; i < keyArray.length; i++){
//   console.log(keyArray[i]);
//
//   var scaleSelector = document.querySelector(keyArray[i]);
//   scaleSelector.addEventListener('mouseover', function(e){
//     guitarSolo.triggerAttack(scaleArray[i]);
//     console.log(scaleArray[i]);
//     guitarSolo.start(0);
//   });
//   scaleSelector.addEventListener('mouseout', guitarSolo.stop(0));
// };



// document.querySelector(keyArray[0]);
// console.log(document.querySelector(keyArray[0]));



//bpm slider
//**************************************
Tone.Transport.bpm.value = 105;

document.querySelector('#bpm').addEventListener('input', function(e){
	Tone.Transport.bpm.value = parseInt(e.target.value);
  document.querySelector('#bpm_value').innerText = 'BPM: '+ parseInt(e.target.value);
})

//effects listeners
//######################################################################

document.querySelector('#reverb').addEventListener('input', function(e){
	globalReverb.roomSize.value = parseFloat(e.target.value)
})


polySynth.volume.value = -15;

document.querySelector('#chord_vol').addEventListener('input', function(e){
	polySynth.volume.value = parseInt(e.target.value)
})

document.querySelector('#kick_vol').addEventListener('input', function(e){
	kickDrum.volume.value = parseInt(e.target.value)
})

document.querySelector('#snare_vol').addEventListener('input', function(e){
	snare.volume.value = parseInt(e.target.value)
})

document.querySelector('#tom_vol').addEventListener('input', function(e){
  tom.volume.value = parseInt(e.target.value);
});

document.querySelector('#hat_vol').addEventListener('input', function(e){
	hats.volume.value = parseInt(e.target.value)
})

document.querySelector('#hat_decay').addEventListener('input', function(e){
	hats.envelope.decay = parseFloat(e.target.value)
})

document.querySelector('#arp_release').addEventListener('input', function(e){
	arp.envelope.release = parseFloat(e.target.value)
})


chorusChord.delayTime = 0.02;

document.querySelector('#chord_chorus').addEventListener('input', function(e){
	chorusChord.delayTime = parseFloat(e.target.value)
})






crushBass.bits = 8;

document.querySelector('#crush_bass').addEventListener('input', function(e){
	crushBass.bits = parseFloat(e.target.value)
})
