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
    canvas: document.getElementById('easytouse-canvas'),
  });
  await addBasePlugins(viewer);

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  await viewer.load("./assets/easy to use (1).glb");
  var currentCameraTransform = viewer.scene.activeCamera.position;
  var currentCameraTarget = viewer.scene.activeCamera.target;
  var camTransform1 = new Vector3(-0.25, 2.26, 3.79);
  var camTarget1 = new Vector3(-0.24, -0.03, 0.01);
  var camTransform2 = new Vector3(-3.95, -0.05, 8.47);
  var camTarget2 = new Vector3(0.16, -0.05, 0.24);

  // // Access the cameras in the loaded GLB model
  // const cameras = [];
  // viewer.scene.traverse((node) => {
  //   if (node.isCamera) {
  //     cameras.push(node);
  //   }
  // });

  // console.log("Cameras found:", cameras.length); // Debug output

  // Add button functionality to switch between camera views

    document.getElementById('easytouse-button1').addEventListener('click', () => {
      currentCameraTarget = camTarget1;
      currentCameraTransform = camTransform1;
      viewer.scene.activeCamera.position = currentCameraTransform;
      viewer.scene.activeCamera.target = currentCameraTarget;
      viewer.scene.setDirty(); // Mark scene as dirty to force update
    });

    document.getElementById('easytouse-button2').addEventListener('click', () => {
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
