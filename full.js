// Final Project Team 2
// Tristan Caetano, Jacob Holme, Vini Coelho, Yannick Almeida, Brandon Gurley

import * as THREE from "https://cdn.skypack.dev/three"
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { Flow } from "https://cdn.skypack.dev/three/examples/jsm/modifiers/CurveModifier.js";
import { FlyControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/FlyControls'

const scene = new THREE.Scene()
var mixer;
var clock = new THREE.Clock();
var controls, camera;
var center = -.5

// Front Point Light
// const light = new THREE.PointLight(0xFFFFFF, 1000, 101)
// light.position.set(5, 100, 100)

// Top Point Light
var alight = new THREE.DirectionalLight(0xFFFFFF, 1) //305
alight.position.set(0, 300, 100)
alight.rotation.x -= 1;

var vlight = new THREE.PointLight(0xADD8E6, 1, 10) //305
vlight.position.set(1.7, 1, 1)
vlight.rotation.x += 1;

var dlight = new THREE.PointLight(0xADD8E6, 1, 10) //305
dlight.position.set(-1.7, 1, 1)
dlight.rotation.x += 1;
// alight = new THREE.AmbientLight(0xFFFFFF)

// scene.add(light)

// Bezier 
var bezier = false

scene.add(alight)
scene.add(vlight)
scene.add(dlight)

var shine = 1000

init();

function init(){
// camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// )

camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 20, 20, 20 );

camera.position.x = 0
camera.position.y = .5
camera.position.z = 4


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const tableLoad = new GLTFLoader();

// Bezier Curve
const curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);

const points = curve.getPoints( 50 );
const curves = new THREE.CatmullRomCurve3(points);
curve.curveType = "centripetal";
curve.closed = true;

var walkMatrix = new THREE.Matrix4();


var tableMatrix = new THREE.Matrix4();
if(bezier == true){
    tableMatrix.set(.1,   0,   0,   0,
                    0,   .1,   0,   center,
                    0,   0,   .1,   0,
                    0,   0,    0,   3);
    camera.position.x = 0
    camera.position.y = 1
    camera.position.z = 3
    
}else{
    tableMatrix.set(  .01,   0,   0,   0,
                        0,   .01,   0,   center,
                        0,   0,   .01,   0,
                        0,   0,   0,   3  );

    // camera.position.x = 0
    // camera.position.y = 1
    // camera.position.z = 2
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

// Madara Model
var madaraMatrix = new THREE.Matrix4();
madaraMatrix.set(  .3,   0,   0,   -1,
                 0,   .3,   0,   center,
                 0,   0,   .3,   2,
                 0,   0,   0,   0  );
//object('Madara.gltf', madaraMatrix, '', false, [0,3,0]);

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

var car1Matrix = new THREE.Matrix4();
car1Matrix.set(   1,  0,   0,     40.5,
                     0,  1,  0,   -.7,
                     0,   0,  1,  40,
                     0,   0,   0,   1  );
object('3d_car/scene.gltf', car1Matrix, '', false, [0,1.5,0]);

var lmcqueenMatrix = new THREE.Matrix4();
lmcqueenMatrix.set(   .014,  0,   0,     36.8,
                     0,  .014,  0,   -.7,
                     0,   0,  .014,  -20,
                     0,   0,   0,   1  );
object('lightning_mcqueen/scene.gltf', lmcqueenMatrix, '', false, [0,3.2,0]);

var cicadaMatrix = new THREE.Matrix4();
cicadaMatrix.set(   2,  0,   0,     20,
                     0,  2,  0,   -.7,
                     0,   0,  2,  74,
                     0,   0,   0,   1  );
object('cicada/scene.gltf', cicadaMatrix, '', false, [0,3.2,0]);

var arMatrix = new THREE.Matrix4();
arMatrix.set(   15,  0,   0,     -10,
                     0,  15,  0,   -.7,
                     0,   0,  15,  77.5,
                     0,   0,   0,   1  );
object('ar/scene.gltf', arMatrix, '', false, [0,1.6,0]);

var porscheMatrix = new THREE.Matrix4();
porscheMatrix.set(   1,  0,   0,     -43,
                     0,  1,  0,   0,
                     0,   0,  1,  60,
                     0,   0,   0,   1  );
object('porsche/scene.gltf', porscheMatrix, '', false, [0,0,0]);

var mazdaMatrix = new THREE.Matrix4();
mazdaMatrix.set(   .01,  0,   0,     -39,
                     0,  .01,  0,   0,
                     0,   0,  .01,  30,
                     0,   0,   0,   1  );
object('mazda/scene.gltf', mazdaMatrix, '', false, [0,0,0]);

animated(3);

createSkyBox();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {

  var radians = .25
    var keyCode = event.which;
    console.log(keyCode)

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
      
    } else if (keyCode == 65) {
      camera.position.x -= 1
      
    } else if (keyCode == 68) {
      camera.position.x += 1
      
      // If UP arrow is pressed
    } else if (keyCode == 38) {
      // camera.rotation.x += .1
      camera.rotation.x += radians;
        camera.rotation.getRotationFromMatrix( camera.matrix );

      // If DOWN arrow is pressed
    }  else if (keyCode == 40) {
      // camera.rotation.x -= .1
      camera.rotation.x -= radians;
        camera.rotation.getRotationFromMatrix( camera.matrix );

      // If LEFT arrow is pressed
    }  else if (keyCode == 37) {
      // camera.rotation.y += .1
      camera.rotation.y += radians;;
      camera.rotation.getRotationFromMatrix( camera.matrix );

      // If RIGHT arrow is pressed
    } else if (keyCode == 39) {
      // camera.rotation.y -= .1
      camera.rotation.y -= radians;
        camera.rotation.getRotationFromMatrix( camera.matrix );

    } else if (keyCode == 72) {
      const direction = new THREE.Vector3;
      console.log(camera.getWorldDirection(direction))
    }
};

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame( animate );

    if ( mixer ) mixer.update( clock.getDelta() );

    //controls.update();

    renderer.render( scene, camera );
}

animate()

function object(imported, importedMatrix, importMaterial, ifMaterial, rotation){

const load = new GLTFLoader();

load.load( imported, function ( gltf ) {

    var GLTF = gltf.scene
    GLTF.applyMatrix4(importedMatrix)

    GLTF.traverse(function(child){
    if(child instanceof THREE.Mesh){
        
        var prevMaterial = child.material;
        child.material = new THREE.MeshPhongMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call( child.material, prevMaterial );
      
        child.material.shininess = shine;
      
        if(ifMaterial){
          const texture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(importMaterial)})
          child.material = texture
        }
      
        child.material.depthTest = true;
        child.geometry.computeVertexNormals();
        child.geometry.elementsNeedUpdate = true;
      } 
    });
    GLTF.rotation.x = rotation[0];
    GLTF.rotation.y = rotation[1];
    GLTF.rotation.z = rotation[2];

	scene.add( GLTF );

}, undefined, function ( error ) {

	console.error( error );

} );
}

function animated(depth){

  const walkLoad = new GLTFLoader();

walkLoad.load( 'walk.gltf', function ( gltf ) {
    
    walkMatrix.set(  .7,   0,   0,   0,
                    0,   .7,   0,   center,
                    0,   0,   .7,   depth,
                    0,   0,   0,   1  );

    var walkGLTF = gltf.scene
    walkGLTF.applyMatrix4(walkMatrix)
  
    walkGLTF.traverse(function(child){
    if(child instanceof THREE.Mesh){

        var prevMaterial = child.material;
        child.material = new THREE.MeshPhongMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call( child.material, prevMaterial );
    
      
        child.material.depthTest = true; 
      
        child.geometry.computeVertexNormals();
        child.geometry.elementsNeedUpdate = true;
      } 
    });

Animation
mixer = new THREE.AnimationMixer( gltf.scene );
    console.log( gltf.animations );
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    walkGLTF.rotation.y = 3.2
    scene.add( walkGLTF );


}, undefined, function ( error ) {

	console.error( error );

} );
}

function createSkyBox(){

 // var skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);

  const textureCube = [
    new THREE.TextureLoader().load('pngegg.png'), new THREE.TextureLoader().load('pngegg.png'),
    new THREE.TextureLoader().load('pngegg.png'), new THREE.TextureLoader().load('pngegg.png'),
    new THREE.TextureLoader().load('pngegg.png'), new THREE.TextureLoader().load('pngegg.png')
  ];
  
  let mat = [];

    for(var i = 0; i < 6; i ++){
      
          mat.push(new THREE.MeshLambertMaterial({map: textureCube[i]}))
  }
     var skyboxGeo = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), mat);

  // var skybox = new THREE.Mesh(skyboxGeo);
  // const skyTexture = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(mat)})
  // skybox.material = skyTexture;
  // skybox.material.depthTest = true
  scene.add(skyboxGeo);

}
}
