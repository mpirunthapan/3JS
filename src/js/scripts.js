import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.png';
import mercuryTexture from '../img/mercury.jpg';
import earthTexture from '../img/earth.jpg';
import moonTexture from '../img/moon.png';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

//Sun
const sunGeo = new THREE.SphereGeometry(20, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

//Mercury
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercuryTexture)
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.position.x = 38;

//Earth
const earthGeo = new THREE.SphereGeometry(7, 30, 30);
const earthMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(earthTexture)
});
const earth = new THREE.Mesh(earthGeo, earthMat);
const earthObj = new THREE.Object3D();
earthObj.add(earth);
scene.add(earthObj);
earth.position.x = 68;

//Saturn
const saturnGeo = new THREE.SphereGeometry(13, 30, 30);
const saturnMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(saturnTexture)
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.position.x = 148;

//SaturnRing
const saturnRingGeo = new THREE.RingGeometry(15, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(saturnRingTexture),
  side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x = 148;
saturnRing.rotation.x = -0.7 * Math.PI;

//Saturn Moon
const moonGeo = new THREE.SphereGeometry(1, 20, 32);
const moonMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(sunTexture)
});
const moon = new THREE.Mesh(moonGeo, moonMat);
saturnObj.add(moon);
moon.position.x = 185;

//Day and night for planets
const pointLight = new THREE.PointLight(0xFFFFFF, 10000, 30000);
scene.add(pointLight);

//Planets and Sun rotation
function animate() {
  sun.rotateY(0.008);
  mercury.rotateY(0.004);
  mercuryObj.rotateY(0.02);
  earth.rotateY(0.001);
  earthObj.rotateY(0.01);
  saturn.rotateY(0.038);
  saturnObj.rotateY(0.0009);
  moon.rotateY(0.018);


  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});