'use strict';

//transport display
//#################################################


function updateTime(){
  requestAnimationFrame(updateTime)

  document.querySelector('#transport').textContent = Tone.Transport.position.split('.')[0];
}
//Play slash pause. actually really activates global transport
//************************************************************************

//set the transport to repeat
Tone.Transport.loopStart = 0;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "4m";

//start/stop the  global transport
document.querySelector('.playpause').addEventListener('change', function(e){

  if (e.target.checked){
    Tone.Transport.start('+0.1');
    updateTime();
    document.querySelector('#logo_id').classList.remove('logo_class');
    document.querySelector('#logo_id').classList.add('logo_active');
  } else {
    Tone.Transport.stop();
    document.querySelector('#logo_id').classList.remove('logo_active');
    document.querySelector('#logo_id').classList.add('logo_class');
  }
});


//Global Effect Declaration
//*************************************************************************************
var globalReverb = new Tone.JCReverb(0.0);

var filter = new Tone.Filter(200, "highpass");


//Local Effect Declaration
//***************************************************************************************
var crushBass = new Tone.BitCrusher();

var chorusChord = new Tone.Chorus();

var delayArp = new Tone.FeedbackDelay("8n", 0.5);

var filterDrone = new Tone.AutoFilter().start();

var bassVibrato = new Tone.Vibrato();

var soloDist = new Tone.Distortion();



//kickDrum
//************************************************************************

var kickDrum = new Tone.MembraneSynth();

kickDrum.chain(globalReverb, filter, Tone.Master);


var kickOne = new Tone.Loop(function(time){
  kickDrum.triggerAttackRelease("C1", "4n", time)
}, "4n");

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

snare.chain(globalReverb, filter, Tone.Master)

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

hats.chain(globalReverb, filter, Tone.Master)

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
});



//chord
//####################################################################

var polySynth = new Tone.PolySynth(4, Tone.Synth)

polySynth.chain(chorusChord, globalReverb, filter, Tone.Master)




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

arp.chain(delayArp, globalReverb, filter, Tone.Master)

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

bassDrone.chain(filterDrone, globalReverb, filter, Tone.Master)

var droneLoop = new Tone.Part(function(time, note){

	bassDrone.triggerAttackRelease(note, "1m", time);
}, [[0, "B2"], ["1:0:0", "E2"], ["2:0:0", "G2"],["3:0:0","F2"]]);


//bassline
//#################################################################

var bass = new Tone.DuoSynth()

bass.chain(crushBass, bassVibrato, globalReverb, filter, Tone.Master)


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

//SHOW HIDE KEYBOARD
//#############################################################################

var soloKeyboardButton = document.getElementById('toggle_keyboard');
var soloKeyboardSlide = document.getElementById('keyboard');
var displayKeyboard = false;

soloKeyboardButton.addEventListener('click', function(){
  if (displayKeyboard == false){
    soloKeyboardSlide.style.display = 'block';
    displayKeyboard = true;
    document.getElementById('toggle_keyboard').innerHTML = 'Hide Solo Keyboard';
  } else {
    soloKeyboardSlide.style.display = 'none';
    displayKeyboard = false;
    document.getElementById('toggle_keyboard').innerHTML = 'Open Solo Keyboard';
  }
});


//Solo keyboard setup items
//#####################################################################

function KeyboardScale(key,notes) {
  this.key = key;
  this.notes = notes;
  this.position = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];
}

var cScale = new KeyboardScale('C-Major', [ 293.66, 329.63, 392, 440, 493.88, 587.33, 659.25, 783.99, 880, 987.77, 1174.66, 1318.51, 1567.98, 1760, 1975.53, 2349.32, 2637.02]);

var guitarSolo = new Tone.MonoSynth()

guitarSolo.chain(globalReverb, soloDist, filter, Tone.Master);

guitarSolo.volume.value = -20;
guitarSolo.envelope.decay = 0.5;
guitarSolo.envelope.sustain = 0;



function playKey(noteValue){
  guitarSolo.triggerAttackRelease(noteValue);
}


var aScale = new Tone.Buffer (['./samples/kick4.flac']);

//add play via keyboard functionality
//###########################################################################################
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

var keyboardEntry = function(positionNumber){ //FUNCTION LINKING KEYBOARD KEYSTROKES TO SCREEN PIANO KEYBOARD
  playKey(cScale.notes[positionNumber]);
  document.getElementById(positionNumber).classList.add('playing');
  window.addEventListener('keyup', function(e) {
    document.getElementById(positionNumber).classList.remove('playing');
  });
};

window.addEventListener('keydown', function(e) { //KEYBOARD LISTENER
  console.log('keydown', e.keyCode);

  if (qq === e.keyCode){keyboardEntry(0);}
  if (ww === e.keyCode){keyboardEntry(1);}
  if (ee === e.keyCode){keyboardEntry(2);}
  if (rr === e.keyCode){keyboardEntry(3);}
  if (tt === e.keyCode){keyboardEntry(4);}
  if (yy === e.keyCode){keyboardEntry(5);}
  if (uu === e.keyCode){keyboardEntry(6);}
  if (ii === e.keyCode){keyboardEntry(7);}
  if (oo === e.keyCode){keyboardEntry(8);}
  if (pp === e.keyCode){keyboardEntry(9);}
  if (leftBracket === e.keyCode){keyboardEntry(10);}
  if (rightBracket === e.keyCode){keyboardEntry(11);}
  if (backSlash === e.keyCode){keyboardEntry(12);}
  if (aa === e.keyCode){keyboardEntry(13);}
  if (ss === e.keyCode){keyboardEntry(14);}
  if (dd === e.keyCode){keyboardEntry(15);}
  if (ff === e.keyCode){keyboardEntry(16);}
});


//VIRTUAL PIANO Keyboard
//#########################################################################################

var virtualKeyboardKeyPositionValue = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

var virtualPianoKey = function(keyPosition) {
  document.getElementById(keyPosition).addEventListener('mouseenter', function(e){
    console.log(cScale.notes[e.target.id]);
    playKey(cScale.notes[e.target.id]);
  });
};

virtualPianoKey(virtualKeyboardKeyPositionValue[0]);
virtualPianoKey(virtualKeyboardKeyPositionValue[1]);
virtualPianoKey(virtualKeyboardKeyPositionValue[2]);
virtualPianoKey(virtualKeyboardKeyPositionValue[3]);
virtualPianoKey(virtualKeyboardKeyPositionValue[4]);
virtualPianoKey(virtualKeyboardKeyPositionValue[5]);
virtualPianoKey(virtualKeyboardKeyPositionValue[6]);
virtualPianoKey(virtualKeyboardKeyPositionValue[7]);
virtualPianoKey(virtualKeyboardKeyPositionValue[8]);
virtualPianoKey(virtualKeyboardKeyPositionValue[9]);
virtualPianoKey(virtualKeyboardKeyPositionValue[10]);
virtualPianoKey(virtualKeyboardKeyPositionValue[11]);
virtualPianoKey(virtualKeyboardKeyPositionValue[12]);
virtualPianoKey(virtualKeyboardKeyPositionValue[13]);
virtualPianoKey(virtualKeyboardKeyPositionValue[14]);
virtualPianoKey(virtualKeyboardKeyPositionValue[15]);
virtualPianoKey(virtualKeyboardKeyPositionValue[16]);

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

filter.frequency.value = 0;

document.querySelector('#filter').addEventListener('input', function(e){
	filter.frequency.value = parseFloat(e.target.value)
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
crushBass.wet.value = 0;

document.querySelector('#crush_bass').addEventListener('input', function(e){
  crushBass.bits = parseFloat(e.target.value)
  if(crushBass.bits === 8) {
    crushBass.wet.value = 0;
  } else {
    crushBass.wet.value = 1;
  }
})

//######################EXPERIMENT#############################################
