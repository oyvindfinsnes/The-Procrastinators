class AnimationManager {
    static init() {
        this.queue = [];
        this.isPlaying = false;
        this.meshPlaying = null;
    }

    static enable() {
        this.enqueue("idle_base");
    }

    static enqueue(name) {
        this.queue.push(name);
    
        // If nothing is playing, start animation immediately
        if (!this.isPlaying) {
            this._playAnimation(this.queue.shift());
        }
    }

    static override(name) {
        if (this.isPlaying) {
            this.meshPlaying.animation.onAnimationGroupLoopObservable.clear();
    
            this.meshPlaying.setEnabled(false);
            this.meshPlaying.animation.stop();
    
            this._playAnimation(name);
        } else {
            this.enqueue(name);
        }
    }

    static playRandomTalkingAnimation() {
        this.override(this._getRandomElement(["talk_0", "talk_1", "talk_2", "talk_3"]));
        this.enqueue("idle_base");
    }

    static _playAnimation(name) {
        this.meshPlaying = Babylon.scene.getMeshByID(name);
        this.isPlaying = true;
    
        this.meshPlaying.setEnabled(true);
        this.meshPlaying.animation.reset();
        this.meshPlaying.animation.start(true);
        
        // For every new animation loop, check if there are animations
        // in the queue waiting to be played, if so - play the next one
        this.meshPlaying.animation.onAnimationGroupLoopObservable.add(() => {
            if (this.queue.length > 0) {
                this.meshPlaying.animation.onAnimationGroupLoopObservable.clear();
    
                this.meshPlaying.setEnabled(false);
                this.meshPlaying.animation.stop();
    
                this.isPlaying = false;
                this._playAnimation(this.queue.shift());
            } else {
                this._playRandomIdleAnimation();
            }
        });
    }

    static _playRandomIdleAnimation() {
        // Chance for Marvin to do a one-time random animation
        if (Math.random() <= 1 / 3) {
            this.enqueue(this._getRandomElement(["idle_1", "idle_2", "idle_3"]));
            this.enqueue("idle_base");
        }
    }

    static _getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

AnimationManager.init();
