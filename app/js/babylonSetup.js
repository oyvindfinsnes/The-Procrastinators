class Babylon {
    static startup() {
        this.canvas = document.getElementById("botCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.scene = new BABYLON.Scene(this.engine);
        // Set the background to 100% opacity
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

        // Camera position (value positive/negative): left/right, up/down, in/out
        new BABYLON.FollowCamera("Camera", new BABYLON.Vector3(0, 3.7, -9.5), this.scene);

        new BABYLON.HemisphericLight("light-hemis", new BABYLON.Vector3(0, 1, 0), this.scene);
        new BABYLON.DirectionalLight("light-dir", new BABYLON.Vector3(0, -0.5, -1.0), this.scene);

        // Load all textured 3D-assets, get reference to their animation and disable them
        this.modelNames = ["idle_base", "idle_1", "idle_2", "idle_3", "talk_0", "talk_1", "talk_2", "talk_3"];
        this.modelNames.forEach(name => {
            // meshes, particleSystems, skeleton, animationGroups
            BABYLON.SceneLoader.ImportMesh("", "animations/", name + ".glb", this.scene, (m, p, s, a) => {
                m[1].animation = a[0];
                m[1].setEnabled(false);
                a[0].stop();
            });
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // Only start executing when the entire BABYLON.js scene is ready
        this.scene.executeWhenReady(main);
    }
}
