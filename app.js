var kickDrum = new Tone.MembraneSynth().toMaster()



var loopOne = new Tone.Loop(function(time){
	kickDrum.triggerAttackRelease("C0", "4n", time)
}, "4n")




loopOne.start(0)


document.querySelector('.toggle_loop').addEventListener('change', function(e){
	if (e.target.checked){
		Tone.Transport.start('+0.1')
  } else {
    Tone.Transport.stop()
  }
})
