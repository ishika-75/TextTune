const textarea = document.querySelector("textarea"),
speechBtn = document.querySelector("button"),
voicelist = document.querySelector("select");


let synth = speechSynthesis,isSpeaking = true;
voices();
function voices(){
        for(let voice of synth.getVoices()){
                
                let selected = voice.name === "Google US English"? 'selected':'';
                let option = '<option value='+'"'+voice.name+'"' + selected+ '>'+ voice.name +' '+  voice.lang + '</option>';
                voicelist.insertAdjacentHTML("beforeend", option);
        }
}

synth.addEventListener('voiceschanged',voices);
console.log(speechBtn);
function texttospeech(text){
        let utterance = new SpeechSynthesisUtterance(text);
        for(let voice of synth.getVoices()){
                if(voice.name === voicelist.value){
                        utterance.voice = voice;
                }
        }
        speechSynthesis.speak(utterance);
}
speechBtn.addEventListener('click', e=>{
        e.preventDefault();
        if(textarea.value.length > 0){
                if(!synth.speaking){
                        console.log("Hello");
                        texttospeech(textarea.value);
                }
                if(textarea.value.length > 80){
                        if(isSpeaking){
                                synth.resume();
                                isSpeaking = false;
                                speechBtn.innerText = "Pause Speech";
                        }else{
                                synth.pause();
                                isSpeaking = true;
                                speechBtn.innerText = "Resume Speech";
                        }
                        setInterval(()=>{
                                if(!synth.speaking && !isSpeaking){
                                        isSpeaking = true;
                                        speechBtn.innerText = "Convert to Speech";
                                }
                        })
                }
        }else{
                speechBtn.innerText = "Convert to Speech";
        }
        
});