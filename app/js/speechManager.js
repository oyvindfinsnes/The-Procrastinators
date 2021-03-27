class SpeechManager {
    static init() {
        this.desiredVoice = "Google UK English Male";
        this.voice = null;
        this.volume = 0.2;
        this.pitch = 0.1;
        this.rate = 1;

        if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this._setupVoice;
        }
    }

    static speak(sentence) {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = this.voice;
        utterance.volume = this.volume;
        utterance.pitch = this.pitch;
        utterance.rate = this.rate;

        speechSynthesis.speak(utterance);
    }

    static _setupVoice() {
        speechSynthesis.getVoices().forEach(voice => {
            if (voice.name === this.desiredVoice) {
                this.voice = voice;
                return;
            }
        });
    }
}

SpeechManager.init();
