import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  PickingPlugin,
  // Import THREE.js internals
  Vector3,
} from 'webgi';

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById('easytoclean-canvas'),
  });
  await addBasePlugins(viewer);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  await viewer.load("./assets/easy to clean.glb");
  var currentCameraTransform = viewer.scene.activeCamera.position;
  var currentCameraTarget = viewer.scene.activeCamera.target;
  var camTransform1 = new Vector3(6.84, 1.04, 4.48);
  var camTarget1 = new Vector3(0.08, -0.25, -0.12);
  var camTransform2 = new Vector3(-2.76, -0.50, 4.31);
  var camTarget2 = new Vector3(0.31, -0.15, 0.04);

  // // Access the cameras in the loaded GLB model
  // const cameras = [];
  // viewer.scene.traverse((node) => {
  //   if (node.isCamera) {
  //     cameras.push(node);
  //   }
  // });

  // console.log("Cameras found:", cameras.length); // Debug output

  // Add button functionality to switch between camera views

    document.getElementById('easytoclean-button1').addEventListener('click', () => {
      currentCameraTarget = camTarget1;
      currentCameraTransform = camTransform1;
      viewer.scene.activeCamera.position = currentCameraTransform;
      viewer.scene.activeCamera.target = currentCameraTarget;
      viewer.scene.setDirty(); // Mark scene as dirty to force update
    });

    document.getElementById('easytoclean-button2').addEventListener('click', () => {
      currentCameraTarget = camTarget2;
      currentCameraTransform = camTransform2;
      viewer.scene.activeCamera.position = currentCameraTransform;
      viewer.scene.activeCamera.target = currentCameraTarget; 
      viewer.scene.setDirty(); // Mark scene as dirty to force update
    });
 

  // Disable auto-rotate and any idle animation behavior
  const controls = viewer.scene.activeCamera.controls;
  controls.autoRotate = false; // Disable auto-rotation
  controls.enableDamping = true;
  controls.rotateSpeed = 2.0;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 12;

  // Set up PickingPlugin for object interaction (you may still want to keep this)
  const picking = viewer.addPluginSync(PickingPlugin);
  picking.hoverEnabled = true;
  picking.enableWidget = false;

  picking.addEventListener('hitObject', (e) => {
    console.log('Hit object', e, e.intersects.selectedObject);
  });

  picking.addEventListener('selectedObjectChanged', (e) => {
    console.log('Selected Object Changed', e);
  });

  picking.addEventListener('hoverObjectChanged', (e) => {
    console.log('Hover object changed', e);
  });
}

setupViewer();