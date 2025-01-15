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
        canvas: document.getElementById('product-canvas-1'),
    });
    await addBasePlugins(viewer);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  await viewer.load("./assets/coffee-machine-2.glb");

  const options = viewer.scene.activeCamera.getCameraOptions();
	options.fov = 25;
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

const drawer = manager.materials.findMaterialsByName('obudowa_przod_black_plastic001_0')[0]
console.log(drawer);

document.getElementById('color-Black')?.addEventListener('click', () => {
    changeColor(new Color(0x010101))
  })

  document.getElementById('color-Grey')?.addEventListener('click', () => {
    changeColor(new Color(0x8a8a8a))
  })

  document.querySelector('color-btn')?.addEventListener('click', () => {
    changeColor(new Color(0x5a3220))
})
    function changeColor(colorToBeChanged) {
        drawer.color = colorToBeChanged;
        viewer.scene.setDirty();
      }
    }

    setupViewer();
    
//     var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
//     var x = setInterval(function() {
//         var now = new Date().getTime(); 
//         var distance = countDownDate - now;



//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     // Split hours and minutes into two digits
//     var hour1 = Math.floor(hours / 10);
//     var hour2 = hours % 10;
//     var min1 = Math.floor(minutes / 10);
//     var min2 = minutes % 10;

//     // Update the HTML elements
//     document.getElementById("hour1").innerHTML = hour1;
//     document.getElementById("hour2").innerHTML = hour2;
//     document.getElementById("min1").innerHTML = min1;
//     document.getElementById("min2").innerHTML = min2;

//     // If the countdown is over, display "EXPIRED"
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("hour1").innerHTML = "E";
//         document.getElementById("hour2").innerHTML = "X";
//         document.getElementById("min1").innerHTML = "P";
//         document.getElementById("min2").innerHTML = "D";
//     }
// }
// , 1000);

















// Get the color buttons and the product image

// Add event listeners to the color buttons
// colorButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         // Get the color from the button's data-color attribute
//         const color = button.getAttribute('data-color');

//         // Change the product image based on the selected color
//         switch (color) {
//             case 'Black':
//                 productImage.src = './Images/model_black.png';
//                 console.log("color changes to black")
//                 break;
//             case 'Grey':
//                 productImage.src = './Images/model_white.png';
//                 break;
//             case 'Brown':
//                 productImage.src = './Images/model_brown.png';
//                 break;
//             default:
//                 console.error('Invalid color');
//         }
//     });
// });
