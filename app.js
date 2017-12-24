//Play slash pause. actually really activates global transport
//************************************************************************

//set the transport to repeat
Tone.Transport.loopStart = 0;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "2m";

//start/stop the  global transport
document.querySelector('.global_transport').addEventListener('change', function(e){
  if (e.target.checked){
    Tone.Transport.start('+0.1');
    console.log(Tone.Transport);
  } else {
    Tone.Transport.stop()
  }
})

//kickDrum
//************************************************************************

var kickDrum = new Tone.MembraneSynth().toMaster()

var kickOne = new Tone.Loop(function(time){
	kickDrum.triggerAttackRelease("C1", "4n", time)
}, "4n")

var kickPart = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	kickDrum.triggerAttackRelease(note, "8n", time);
}, [[0, "C1"], ["0:0:3", "C1"], ["0:1:2", "C1"],["0:2:1","C1"]]);

kickPart.loop = true;


document.querySelector('.kick_1').addEventListener('change', function(e){
  if (e.target.checked){
    kickOne.start(0)

  } else {
    kickOne.stop(0)
  }
})

document.querySelector('.kick_2').addEventListener('change', function(e){
  if (e.target.checked){
    kickPart.start(0)

  } else {
    kickPart.stop(0)
  }
})
//snare
//****************************************************************************
var snare = new Tone.MetalSynth({
frequency  : 440,
envelope  : {
attack  : 0.001 ,
decay  : 0.25 ,
release  : 0.25
}  ,
harmonicity  : 4.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5
}
).toMaster()

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
frequency  : 4000,
envelope  : {
attack  : 0.001 ,
decay  : 0.01 ,
release  : 0.01
}  ,
harmonicity  : 7.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5
}
).toMaster()

hats.volume.value = -20;

var hatsOne = new Tone.Loop(function(time){
	hats.triggerAttackRelease("8n", time)
}, "8n")

var hatsTwo = new Tone.Loop(function(time){
  hats.triggerAttackRelease("8n",time)
}, "4n")


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
//chord
//####################################################################

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();


var chordOne = new Tone.Loop(function(time){
  polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], "2n", time, 0.24)

}, "1m")

var chordTwo = new Tone.Loop(function(time){
  polySynth.triggerAttackRelease(['D4', 'F4', 'A4', 'C5'], "8n", time, 0.24)

}, "1m")

document.querySelector('.chord_1').addEventListener('change', function(e){
  if (e.target.checked){
    chordOne.start(0)
    chordTwo.start('0:3')

  } else {
    chordOne.stop(0)
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
).toMaster();

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

var bass = new Tone.AMSynth({
harmonicity  : 3 ,
detune  : 0 ,
oscillator  : {
type  : "square"
}  ,
envelope  : {
attack  : 0.01 ,
decay  : 0.01 ,
sustain  : 1 ,
release  : 0.5
}  ,
modulation  : {
type  : "triangle"
}  ,
modulationEnvelope  : {
attack  : 0.5 ,
decay  : 0 ,
sustain  : 1 ,
release  : 0.5
}
}
).toMaster();

bass.volume.value = 10;

var bassPart = new Tone.Part(function(time, note){
	//this shows how to assign division in a specific part
	bass.triggerAttackRelease(note, "8n", time);
}, [["0:1", "B2"], ["0:2", "G2"], ["0:3:2", "A2"],["1:0:2","A2"],["1:1:2","C2"],["1:2","C2"],["1:3","C2"]]);

bassPart.loop = true;
//defines length of loop
bassPart.loopEnd = "2m";


document.querySelector('.bass_1').addEventListener('change', function(e){
  if (e.target.checked){
    bassPart.start(0)

  } else {
    bassPart.stop(0)
  }
})
//volume volume node
//###################################################################
var vol = new Tone.Volume().toMaster()
//kickDrum.chain(vol, Tone.Master);
//snare.chain(vol, Tone.Master);
//hats.chain(vol, Tone.Master);
//polySynth.chain(vol, Tone.Master);
//arp.chain(vol, Tone.Master);
//bass.chain(vol, Tone.Master);

document.querySelector('#global_volume').addEventListener('input', function(e){
	vol.value = parseInt(e.target.value)
})

//bpm slider
//**************************************
document.querySelector('#bpm').addEventListener('input', function(e){
	Tone.Transport.bpm.value = parseInt(e.target.value)
})

//effects
//######################################################################
document.querySelector('#chord_vol').addEventListener('input', function(e){
	polySynth.volume.value = parseInt(e.target.value)
})

document.querySelector('#hat_decay').addEventListener('input', function(e){
	hats.envelope.decay.value = parseInt(e.target.value)
})
