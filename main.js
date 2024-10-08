import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {FirstPersonControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/FirstPersonControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 10); 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: '#242a54' }); 
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 2;
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


const geometry_torus = new THREE.TorusKnotGeometry( 1, 0.3, 64, 8 ); 
const material_torus = new THREE.MeshBasicMaterial( { color: '#6995c2' } ); 
const torusKnot = new THREE.Mesh( geometry_torus, material_torus ); scene.add( torusKnot );

torusKnot.position.x = 6;
torusKnot.position.y = 4;
torusKnot.position.z = 4;
scene.add(torusKnot);

const controlsFP = new FirstPersonControls(camera, renderer.domElement); 
controlsFP.lookSpeed = 1;  
controlsFP.movementSpeed = 10; 
controlsFP.lookVertical = true; 

const clock = new THREE.Clock();




function animate() {
    requestAnimationFrame(animate); 

  
    const delta = clock.getDelta(); 
    controlsFP.update(delta); 


    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    

    renderer.render(scene, camera); 
}

animate(); 

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('resources/tundra_northern_lights.jpg');


texture.mapping = THREE.EquirectangularReflectionMapping;
scene.background = texture;


const geometry_plane = new THREE.PlaneGeometry( 100, 100 );
const material_plane = new THREE.MeshBasicMaterial( {color:'gray', side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry_plane, material_plane );
plane.rotation.x = - Math.PI / 2;

plane.position.x = 0;
scene.add( plane );


