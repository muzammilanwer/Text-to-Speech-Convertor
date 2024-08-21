const textarea = document.querySelector("#text-area");
const speakBtn = document.querySelector("#speak-btn");
const pauseResumeBtn = document.querySelector("#pause-resume-btn");

let synth = window.speechSynthesis;
let utterance;
let speaking = false;

const texttospeech = () => {
    if (!speaking) {
        utterance = new SpeechSynthesisUtterance(textarea.value);
        synth.speak(utterance);
        speaking = true;
        speakBtn.disabled = true;
        pauseResumeBtn.style.display = "block";
    }
}

const pauseResume = () => {
    if (synth.paused) {
        synth.resume();
        pauseResumeBtn.textContent = "Pause";
    } else {
        synth.pause();
        pauseResumeBtn.textContent = "Resume";
    }
}

speakBtn.addEventListener("click", texttospeech);
pauseResumeBtn.addEventListener("click", pauseResume);

synth.onpause = () => {
    speaking = false;
    speakBtn.disabled = false;
    pauseResumeBtn.textContent = "Resume";
}

synth.onresume = () => {
    speaking = true;
    speakBtn.disabled = true;
    pauseResumeBtn.textContent = "Pause";
}

synth.onend = () => {
    speaking = false;
    speakBtn.disabled = false;
    pauseResumeBtn.style.display = "none";
}