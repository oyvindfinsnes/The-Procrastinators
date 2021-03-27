class Babylon {
    static startup() {
        const ScreneLoader = require("babylonjs-loaders");
        const { Scene, Engine, Color4, Vector3, FollowCamera, HemisphericLight, DirectionalLight, SceneLoader } = require("babylonjs");

        this.canvas = document.getElementById("botCanvas");
        this.engine = new Engine(this.canvas, true);

        this.scene = new Scene(this.engine);
        // Set the background to 100% opacity
        this.scene.clearColor = new Color4(0, 0, 0, 0);

        // Camera position (value positive/negative): left/right, up/down, in/out
        new FollowCamera("Camera", new Vector3(0, 3.7, -9.5), this.scene);

        new HemisphericLight("light-hemis", new Vector3(0, 1, 0), this.scene);
        new DirectionalLight("light-dir", new Vector3(0, -0.5, -1.0), this.scene);

        // Load all textured 3D-assets, get reference to their animation and disable them
        this.modelNames = ["idle_base", "idle_1", "idle_2", "idle_3", "talk_0", "talk_1", "talk_2", "talk_3"];
        this.modelNames.forEach(name => {
            // meshes, particleSystems, skeleton, animationGroups
            SceneLoader.ImportMesh("", "animations/", name + ".glb", this.scene, (m, p, s, a) => {
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
