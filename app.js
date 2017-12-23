
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
var hats = new Tone.MetalSynth().toMaster()

var loopTwo = new Tone.Loop(function(time){
	hats.triggerAttackRelease("8n", time)
}, "8n")


//Play slash pause. actually really activates global transport
//************************************************************************

document.querySelector('.loop2').addEventListener('change', function(e){
  if (e.target.checked){
    loopTwo.start(0)

  } else {
    loopTwo.stop(0)
  }
})








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
