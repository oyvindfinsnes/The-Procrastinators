var canvas = document.getElementById("botCanvas");
var engine = new BABYLON.Engine(canvas, true);

var scene = new BABYLON.Scene(engine);
// Set the background to 100% opacity
scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

// Camera position (value positive/negative): left/right, up/down, in/out
new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 3.7, -9.5), scene);

new BABYLON.HemisphericLight("light-hemis", new BABYLON.Vector3(0, 1, 0), scene);
new BABYLON.DirectionalLight("light-dir", new BABYLON.Vector3(0, -0.5, -1.0), scene);

// Load all textured 3D-assets, get reference to their animation and disable them
modelNames = [
    "idle", "acknowledge", "angry", "cocky", "dismissive", "happy", "nod",
    "hard-nod", "sarcastic-nod", "lengthy-nod", "headshake",
    "thoughtful-head-shake", "look-away", "shake-head", "sigh"
];
modelNames.forEach(function (name) {
    // meshes, particleSystems, skeleton, animationGroups
    BABYLON.SceneLoader.ImportMesh("", "src/animations/", name + ".glb", scene, function (m, p, s, a) {
        m[1].animation = a[0];
        m[1].setEnabled(false);
        a[0].stop();
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});

engine.runRenderLoop(function () {
    scene.render();
});