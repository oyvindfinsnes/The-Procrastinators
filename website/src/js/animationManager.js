function AnimationManager() {
    this.queue = [];
    this.isPlaying = false;
}

AnimationManager.prototype.enqueue = function (name) {
    this.queue.push(name);

    // If nothing is playing, start animation immediately
    if (!this.isPlaying) {
        this._playAnimation(this.queue.shift());
    }
}

AnimationManager.prototype._playAnimation = function (name) {
    // Keep a reference to this for nested functions
    self = this;
    self.isPlaying = true;
    var mesh = scene.getMeshByID(name);

    // Enable mesh, reset animation and play it
    mesh.setEnabled(true);
    mesh.animation.reset();
    mesh.animation.start(true);
    
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