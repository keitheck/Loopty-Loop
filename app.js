
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
decay  : 0.1 ,
release  : 0.1
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
//chord
//####################################################################

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();


var loopThree = new Tone.Loop(function(time){
  polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], "16n", time)

}, "1m")

var loopFour = new Tone.Loop(function(time){
  polySynth.triggerAttackRelease(['D4', 'F4', 'A4', 'C5'], "16n", time)

}, "1m")

document.querySelector('.loop3').addEventListener('change', function(e){
  if (e.target.checked){
    loopThree.start(0)
    loopFour.start('0:3')

  } else {
    loopThree.stop(0)
    loopFour.stop(0)
  }
})



//Play slash pause. actually really activates global transport
//************************************************************************









//set the transport to repeat
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true

//start/stop the  global transport
document.querySelector('.globalTransport').addEventListener('change', function(e){
  if (e.target.checked){
    Tone.Transport.start('+0.1')
  } else {
    Tone.Transport.stop()
  }
})
