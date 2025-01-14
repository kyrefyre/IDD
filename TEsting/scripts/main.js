import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  GLTFAnimationPlugin,

  // Import THREE.js internals
  Color,
	Texture,
  Vector3,
} from 'webgi';

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById('web-canvas'),
  });

  await addBasePlugins(viewer);

  // Load the GLB file
  await viewer.load("./assets/easy to use (1).glb");
  console.log("GLB file loaded successfully");

  // Load an environment map if not set in the glb file
  await viewer.setEnvironmentMap("./assets/autumn forest.hdr");

  // Disable auto-rotate
  const controls = viewer.scene.activeCamera.controls;
  controls.autoRotate = false; // Disable idle rotation
  
  const findNodeByName = (name) => {
    return viewer.scene.traverse((node) => {
      console.log("Node found:", node.name);
      if (node.name === name && node.isCamera) return node;
    });
  };

  const view1Node = findNodeByName('#view1');
  if (view1Node) {
    console.log("#view1 node found:", view1Node);

    // Copy transform properties from #view1 to main camera
    const mainCamera = viewer.scene.activeCamera;
    mainCamera.position.copy(view1Node.position);
    mainCamera.rotation.copy(view1Node.rotation);
    mainCamera.scale.copy(view1Node.scale);

    console.log("Main camera transform applied from #view1");
  } else {
    console.error("Camera #view1 not found!");
  }
  // Set initial camera to #view1
  const camera1 = findNodeByName('#view1');
  if (camera1) {
    viewer.scene.activeCamera = camera1;
    console.log("Initial camera set to #view1");
  } else {
    console.error("Camera #view1 not found!");
  }

  // Camera options
  const options = viewer.scene.activeCamera.getCameraOptions();
  options.fov = 25;
  viewer.scene.activeCamera.setCameraOptions(options);

  // Control options
  controls.enableDamping = true;
  controls.rotateSpeed = 2.0;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minDistance = 3;
  controls.maxDistance = 12;

  // Event listeners for play, pause, and stop buttons
  document.querySelector('.button.play')?.addEventListener('click', () => {
    play();
  });

  document.querySelector('.button.pause')?.addEventListener('click', () => {
    pause();
  });

  document.querySelector('.button.stop')?.addEventListener('click', () => {
    stop();
  });

  let mixer;
  let clips;

  // Wait for the mesh to load
  viewer.scene.onMeshAdded = (mesh) => {
    if (!mixer) {
      mixer = new THREE.AnimationMixer(mesh);
      clips = mesh.animations;
      console.log("Animation mixer created for mesh:", mesh.name);
    }
  };

  function play() {
    if (!mixer) {
      console.error("Animation mixer not initialized!");
      return;
    }

    // Play the animation
    mixer.playAnimation();
    console.log("Animation started");

    // Switch camera to #view2
    const camera2 = findNodeByName('#view2');
    if (camera2) {
      viewer.scene.activeCamera = camera2;
      console.log("Camera switched to #view2");
    } else {
      console.error("Camera #view2 not found!");
    }
  }

  function pause() {
    if (animator) {
      animator.pauseAnimation();
      console.log("Animation paused");
    } else {
      console.error("Animator not initialized!");
    }
  }

  function stop() {
    if (animator) {
      animator.stop();
      console.log("Animation stopped");
    } else {
      console.error("Animator not initialized!");
    }
  }

  function update() {
    if (mixer) {
      mixer.update(deltaSeconds);
    }
  }
}

setupViewer();