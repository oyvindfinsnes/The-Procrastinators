function AnimationManager() {
    this.queue = [];
    this.isPlaying = false;
    this.meshPlaying = null;
};

AnimationManager.prototype.enqueue = function (name) {
    this.queue.push(name);

    // If nothing is playing, start animation immediately
    if (!this.isPlaying) {
        this._playAnimation(this.queue.shift());
    }
};

AnimationManager.prototype.override = function (name) {
    if (this.isPlaying) {
        this.meshPlaying.animation.onAnimationGroupLoopObservable.clear();

        this.meshPlaying.setEnabled(false);
        this.meshPlaying.animation.stop();

        this._playAnimation(name);
    } else {
        this.enqueue(name);
    }
};

AnimationManager.prototype._playAnimation = function (name) {
    var mesh = scene.getMeshByID(name);
    
    this.isPlaying = true;
    this.meshPlaying = mesh;

    // Enable mesh, reset animation and play it
    mesh.setEnabled(true);
    mesh.animation.reset();
    mesh.animation.start(true);
    
    // Keep a reference to this for nested functions
    var self = this;
    // For every new animation loop, check if there are animations
    // in the queue waiting to be played, if so - play the next one
    mesh.animation.onAnimationGroupLoopObservable.add(function () {
        if (self.queue.length > 0) {
            mesh.animation.onAnimationGroupLoopObservable.clear();

            mesh.setEnabled(false);
            mesh.animation.stop();

            self.isPlaying = false;
            self._playAnimation(self.queue.shift());
        }
    });
};

// Create a globally available manager for queueing up animations
var AnimationManager = new AnimationManager();
