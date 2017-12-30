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
//volume volume node
//###################################################################


//Solo keyboard
//#####################################################################


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


//key1
document.getElementById('B2').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key2
document.getElementById('C3').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key3
document.getElementById('D3').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key4
document.getElementById('E3').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key5
document.getElementById('F3').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key6
document.getElementById('G3').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key7
document.getElementById('A4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key8
document.getElementById('B4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key9
document.getElementById('C4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key10
document.getElementById('D4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key11
document.getElementById('E4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key12
document.getElementById('F4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key13
document.getElementById('G4').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key14
document.getElementById('A5').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key8
document.getElementById('B5').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key9
document.getElementById('C5').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
});

//key10
document.getElementById('D5').addEventListener('mouseenter', function(e){
  console.log(e.target.id)
  playKey(e.target.id);
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
