
//kickDrum
//************************************************************************

var kickDrum = new Tone.MembraneSynth().toMaster()

var loopOne = new Tone.Loop(function(time){
	kickDrum.triggerAttackRelease("C1", "4n", time)
}, "4n")

document.querySelector('.loop1').addEventListener('change', function(e){
  if (e.target.checked){
    loopOne.start(0)

  } else {
    loopOne.stop(0)
  }
})
//hi hats
//*************************************************************************
var hats = new Tone.MetalSynth({
frequency  : 1200,
envelope  : {
attack  : 0.001 ,
decay  : 0.5 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5
}
).toMaster()

var loopTwo = new Tone.Loop(function(time){
	hats.triggerAttackRelease("8n", time)
}, "8n")

document.querySelector('.loop2').addEventListener('change', function(e){
  if (e.target.checked){
    loopTwo.start(0)

  } else {
    loopTwo.stop(0)
  }
})
//melody
//####################################################################

var melody = new Tone.MonoSynth({

detune  : 0 ,
oscillator  : {
type  : 'sine'
}  ,
filter  : {
Q  : 6 ,
type  : 'lowpass' ,
rolloff  : -24
}  ,
envelope  : {
attack  : 0.005 ,
decay  : 0.1 ,
sustain  : 0.9 ,
release  : 1
}  ,
filterEnvelope  : {
attack  : 0.06 ,
decay  : 0.2 ,
sustain  : 0.5 ,
release  : 1 ,
baseFrequency  : 200 ,
octaves  : 7 ,
exponent  : 2
}
}).toMaster()

var loopThree = new Tone.Loop(function(time){
  melody.triggerAttackRelease("D4", "16n", time)
}, "2n")

document.querySelector('.loop3').addEventListener('change', function(e){
  if (e.target.checked){
    loopThree.start(0)

  } else {
    loopThree.stop(0)
  }
})



//Play slash pause. actually really activates global transport
//************************************************************************









//set the transport to repeat
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true

//start/stop the transport
document.querySelector('.globalTransport').addEventListener('change', function(e){
  if (e.target.checked){
    Tone.Transport.start('+0.1')
  } else {
    Tone.Transport.stop()
  }
})
