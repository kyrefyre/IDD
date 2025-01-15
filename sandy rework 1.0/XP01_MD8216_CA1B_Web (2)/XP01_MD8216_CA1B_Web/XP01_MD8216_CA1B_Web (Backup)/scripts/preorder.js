import {
    ViewerApp,
    AssetManagerPlugin,
    addBasePlugins,
    VariationConfiguratorPlugin,
    FrameFadePlugin,
    LoadingScreenPlugin,
    PickingPlugin,
    TweakpaneUiPlugin,
    MaterialConfiguratorPlugin,
  //material - obudowa_przod_black_plastic001_0
    // Import THREE.js internals
    Color,
      Texture,
    Vector3,
  } from 'webgi';

  async function setupViewer() {
    const viewer = new ViewerApp({
        canvas: document.getElementById('product-canvas-2'),
    });
    await addBasePlugins(viewer);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  await viewer.load("./assets/coffee-machine-3.glb");

  const options = viewer.scene.activeCamera.getCameraOptions();
    options.fov = 15;
    viewer.scene.activeCamera.setCameraOptions(options);
    const controls = viewer.scene.activeCamera.controls;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 5;
    controls.enableDamping = true;
    controls.rotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 12;

    const picking = viewer.addPluginSync(PickingPlugin);
  picking.hoverEnabled = true;
  picking.enableWidget = false;
  console.log(picking.getSelectedObject);
  // const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));
  // ui.setupPluginUi(PickingPlugin);
  picking.addEventListener('hitObject', (e) => {
      console.log('Hit object', e, e.intersects.selectedObject);
      // set to null to prevent selection
      // e.intersects.selectedObject = null
  });
  picking.addEventListener('selectedObjectChanged', (e) => {
    console.log('Selected Object Changed', e);
});

picking.addEventListener('hoverObjectChanged', (e) => {
    console.log('Hover object changed', e);
});

const drawer = manager.materials.findMaterialsByName('light_grey_plastic')[0]
    console.log(drawer);

document.getElementById('color-Black')?.addEventListener('click', () => {
    changeColor(new Color(0x010101))
    console.log('color changed');
  })

  document.getElementById('color-Grey')?.addEventListener('click', () => {
    changeColor(new Color(0x8a8a8a))
  })

  document.getElementById('color-Brown')?.addEventListener('click', () => {
    changeColor(new Color(0x5a3220))
})
    function changeColor(colorToBeChanged) {
        drawer.color = colorToBeChanged;
        viewer.scene.setDirty();
      }
    }

    setupViewer();