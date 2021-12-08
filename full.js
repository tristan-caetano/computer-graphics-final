// Final Project Team 2
// Tristan Caetano, Jacob Holme, Vini Coelho, Yannick Almeida, Brandon Gurley
// All Team Members Contributed Equally

// Importing modules
import * as THREE from "https://cdn.skypack.dev/three"
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';

// Declaring variables:

// Creating scene and camera
const scene = new THREE.Scene()
var camera;

// Required for animation
var mixer;
var clock = new THREE.Clock();

// Variable that affects translation on some objects matricies
var center = -.5;

// Bezier boolean
var bezier = false

// Shine value
var shine = 1000

// Directional Light that simulates moonlight
var alight = new THREE.DirectionalLight(0xFFFFFF, 1)
alight.position.set(0, 300, 100)
alight.rotation.x -= 1;

// Soft blue lights that simulate vending machine lights
var vlight = new THREE.PointLight(0xADD8E6, 1, 10)
vlight.position.set(1.7, 1, 1)
vlight.rotation.x += 1;

var dlight = new THREE.PointLight(0xADD8E6, 1, 10)
dlight.position.set(-1.7, 1, 1)
dlight.rotation.x += 1;

// Ambient light used to see scene better for creation 
// alight = new THREE.AmbientLight(0xFFFFFF)

// Adding lights to scene
scene.add(alight)
scene.add(vlight)
scene.add(dlight)

// Initializing main function
init();

// Main Function that creates the scene
function init(){

// Initializing the camera
camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 20, 20, 20 );

// Placing the camera in 3D space
camera.position.x = 0
camera.position.y = .5
camera.position.z = 4

// Initializing renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Bezier Curve
const curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);

// Arithmetic for bezier curve on table
const points = curve.getPoints( 50 );
curve.curveType = "centripetal";
curve.closed = true;

// Initializing matrix for table so that it can be affected based on bezier curve
var tableMatrix = new THREE.Matrix4();

// The matricies used to be applied to the models are scale and translate matricies 

// If statement that sets camera and matrix if bezier curve is true
if(bezier == true){
    tableMatrix.set(.1,   0,   0,   0,
                    0,   .1,   0,   center,
                    0,   0,   .1,   0,
                    0,   0,    0,   3);
    camera.position.x = 0
    camera.position.y = 1
    camera.position.z = 3
    
// If bezier curve is false, this matrix is applied and camera is kept the same
}else{
    tableMatrix.set(  .01,   0,   0,   0,
                        0,   .01,   0,   center,
                        0,   0,   .01,   0,
                        0,   0,   0,   3  );
}

// Table Model
object('yable.gltf', tableMatrix, 'wood.png', true, [0,0,0]);

// Pizza Model
var pizzaMatrix = new THREE.Matrix4();
pizzaMatrix.set(  1,   0,   0,   .5,
                 0,   1,   0,   .665 + center,
                 0,   0,   1,   .2,
                 0,   0,   0,   0  );
object('pizza.gltf', pizzaMatrix, 'drywall.png', false, [0,0,0]);

// Cake Model
var cakeMatrix = new THREE.Matrix4();
cakeMatrix.set(  .1,   0,   0,   0,
                 0,   .1,   0,   .665 + center,
                 0,   0,   .1,   .2,
                 0,   0,   0,   0  );
object('cake.gltf', cakeMatrix, '', false, [0,0,0]);

// IceCream Model
var creamyMatrix = new THREE.Matrix4();
creamyMatrix.set(  .03,   0,   0,   .2,
                 0,   .03,   0,   .665 + center,
                 0,   0,   .03,   .1,
                 0,   0,   0,   0  );
object('creamy.gltf', creamyMatrix, '', false, [1,0,5]);

// Pringles Model
var pringlesMatrix = new THREE.Matrix4();
pringlesMatrix.set(   .001,  0,   0,  -.5,
                     0,  .001,  0,   .75 + center,
                     0,   0,  .001,  .3,
                     0,   0,   0, 0  );
object('pringles/scene.gltf', pringlesMatrix, '', false, [0,0,0]);

// Hot Dog Model
var hotdogMatrix = new THREE.Matrix4();
hotdogMatrix.set(  .0002,   0,   0,   -.5,
                 0,   .0002,   0,   .665 + center,
                 0,   0,   .0002,   .2,
                 0,   0,   0,   0  );
object('hotdog/scene.gltf', hotdogMatrix, '', false, [0,1,0]);

// Fridge Machine Model
var fridgeMatrix = new THREE.Matrix4();
fridgeMatrix.set(   .01,  0,   0,  1.7,
                     0,  .01,  0,   center,
                     0,   0,  .01,  .2,
                     0,   0,   0,   1  );
object('fridge/scene.gltf', fridgeMatrix, '', false, [0,-1.6,0]);

// Vending Machine Model
var vendingMatrix = new THREE.Matrix4();
vendingMatrix.set(   .009,  0,   0,  -1.7,
                     0,  .008,  0,   center,
                     0,   0,  .008,  0,
                     0,   0,   0,   1  );
object('vending_machine/scene.gltf', vendingMatrix, '', false, [0,0,0]);

// Soccer Ball Model
var sBallMatrix = new THREE.Matrix4();
sBallMatrix.set(   .2,  0,   0,  -.6 ,
                     0,  .2,  0,   0,
                     0,   0,  .2,  -13.8,
                     0,   0,   0,   1  );
object('soccer_ball/scene.gltf', sBallMatrix, '', false, [0,0,0]);

// Soccer Ball Model
var fieldMatrix = new THREE.Matrix4();
fieldMatrix.set(   1,  0,   0,  -2 ,
                     0,  1,  0,   2.5,
                     0,   0,  1,  22.5,
                     0,   0,   0,   1  );
object('football_field/scene.gltf', fieldMatrix, '', false, [0,0,0]);

// Nice Car Model
var car1Matrix = new THREE.Matrix4();
car1Matrix.set(   1,  0,   0,     40.5,
                     0,  1,  0,   -.7,
                     0,   0,  1,  40,
                     0,   0,   0,   1  );
object('3d_car/scene.gltf', car1Matrix, '', false, [0,1.5,0]);

// Lightning McQueen Model
var lmcqueenMatrix = new THREE.Matrix4();
lmcqueenMatrix.set(   .014,  0,   0,     36.8,
                     0,  .014,  0,   -.7,
                     0,   0,  .014,  -20,
                     0,   0,   0,   1  );
object('lightning_mcqueen/scene.gltf', lmcqueenMatrix, '', false, [0,3.2,0]);

// Cicada Car Model
var cicadaMatrix = new THREE.Matrix4();
cicadaMatrix.set(   2,  0,   0,     20,
                     0,  2,  0,   -.7,
                     0,   0,  2,  74,
                     0,   0,   0,   1  );
object('cicada/scene.gltf', cicadaMatrix, '', false, [0,3.2,0]);

// AR Car Model
var arMatrix = new THREE.Matrix4();
arMatrix.set(       15,  0,   0,   -10,
                     0,  15,  0,   -.7,
                     0,   0,  15,  77.5,
                     0,   0,   0,   1  );
object('ar/scene.gltf', arMatrix, '', false, [0,1.6,0]);

// Porsche Car Model
var porscheMatrix = new THREE.Matrix4();
porscheMatrix.set(   1,  0,   0,     -43,
                     0,  1,  0,   0,
                     0,   0,  1,  60,
                     0,   0,   0,   1  );
object('porsche/scene.gltf', porscheMatrix, '', false, [0,0,0]);

// Mazda Car Model
var mazdaMatrix = new THREE.Matrix4();
mazdaMatrix.set(   .01,  0,   0,     -39,
                     0,  .01,  0,   0,
                     0,   0,  .01,  30,
                     0,   0,   0,   1  );
object('mazda/scene.gltf', mazdaMatrix, '', false, [0,0,0]);

// Animated Man Model
animated(3);

// Keylistener that allows the camera to be moved and tilted using WASD and ↑ →	↓	←
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {

    // Rotation angle
    const radians = .25

    // Value that saves what key is pressed
    var keyCode = event.which;

    // Pressed Key Value is sent to console
    console.log(keyCode)

    // The W and S key will work correctly regardless of worldview, however, the rest of the buttons will work incorrectly if the camera isnt facing negative Z

    // If W is pressed
    if (keyCode == 87) {
      const direction = new THREE.Vector3;
      let speed = 1.0;
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, speed);
        
    // If S is pressed
    } else if (keyCode == 83) {
      const direction = new THREE.Vector3;
      let speed = -1.0;
      camera.getWorldDirection(direction);
      camera.position.addScaledVector(direction, speed);
      
    // If A is pressed
    } else if (keyCode == 65) {
      camera.position.x -= 1

    // If D is pressed
    } else if (keyCode == 68) {
      camera.position.x += 1
      
      // If UP arrow is pressed
    } else if (keyCode == 38) {
      camera.rotation.x += radians;

      // If DOWN arrow is pressed
    }  else if (keyCode == 40) {
      camera.rotation.x -= radians;

      // If LEFT arrow is pressed
    }  else if (keyCode == 37) {
      camera.rotation.y += radians;;

      // If RIGHT arrow is pressed
    } else if (keyCode == 39) {
      camera.rotation.y -= radians;
    }
};

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame( animate );

    // Updating animation frames using clock
    if ( mixer ) mixer.update( clock.getDelta() );

    // Rendering the scene
    renderer.render( scene, camera );
}

animate()

// Function that makes it much easier too import models
function object(imported, importedMatrix, importMaterial, ifMaterial, rotation){

// Initializing GLTF loader
const load = new GLTFLoader();

// Importing model
load.load( imported, function ( gltf ) {

    // Getting model prepared for the scene
    var GLTF = gltf.scene

    // Applying input matrix to scene
    GLTF.applyMatrix4(importedMatrix)

    // Going through object settings
    GLTF.traverse(function(child){
    if(child instanceof THREE.Mesh){
        
        // Copying texture from GLTF and applying it to model
        var prevMaterial = child.material;
        child.material = new THREE.MeshPhongMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call( child.material, prevMaterial );
      
        // Shininess value, spectral or diffuse
        child.material.shininess = shine;
      
        // If a texture is imported, it is mapped to the object
        if(ifMaterial){
          const texture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(importMaterial)})
          child.material = texture
        }
      
        // Depth testing 
        child.material.depthTest = true;
        child.geometry.computeVertexNormals();
        child.geometry.elementsNeedUpdate = true;
      } 
    });

    // Object rotation (easier than using matrix)
    GLTF.rotation.x = rotation[0];
    GLTF.rotation.y = rotation[1];
    GLTF.rotation.z = rotation[2];

  // Adding model to scene
	scene.add( GLTF );

}, undefined, function ( error ) {

	console.error( error );

} );
}

// Function that imports the animated model
function animated(depth){

  // Creating GLTF loader
  const walkLoad = new GLTFLoader();

// Importing GLTF file
walkLoad.load( 'walk.gltf', function ( gltf ) {
    
    // Creating matrix to be applied to geometry
    var walkMatrix = new THREE.Matrix4();
    walkMatrix.set(  .7,   0,   0,   0,
                    0,   .7,   0,   center,
                    0,   0,   .7,   depth,
                    0,   0,   0,   1  );

    // Getting model prepared for the scene
    var walkGLTF = gltf.scene

    // Applying input matrix to scene
    walkGLTF.applyMatrix4(walkMatrix)
  
    // Going through object settings
    walkGLTF.traverse(function(child){
    if(child instanceof THREE.Mesh){

       // Copying texture from GLTF and applying it to model
        var prevMaterial = child.material;
        child.material = new THREE.MeshPhongMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call( child.material, prevMaterial );
    
        // Depth Testing
        child.material.depthTest = true; 
        child.geometry.computeVertexNormals();
        child.geometry.elementsNeedUpdate = true;
      } 
    });

// Initialization of animation
Animation
mixer = new THREE.AnimationMixer( gltf.scene );
    
    // Acquiring animation from GLTF file
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    // Rotating model to it faces correct direction
    walkGLTF.rotation.y = 3.2

    // Adding model to the scene
    scene.add( walkGLTF );


}, undefined, function ( error ) {

	console.error( error );

} );
}
}
