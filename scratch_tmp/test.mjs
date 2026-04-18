import * as THREE from 'three';
import fs from 'fs';

// simple mock of gltf object
const group = new THREE.Group();
const mesh = new THREE.Mesh(new THREE.BoxGeometry(87, 314, 42));
// set offset simulating the mesh being far from origin
mesh.position.set(-67.77, -140.32, -15.60);
group.add(mesh); // group represents gltf.scene

group.updateMatrixWorld(true);

const box = new THREE.Box3().setFromObject(group);
const size = new THREE.Vector3();
box.getSize(size);
const center = new THREE.Vector3();
box.getCenter(center);

console.log("Original Center:", center);

group.position.x = -center.x;
group.position.y = -center.y;
group.position.z = -center.z;

const wrapper = new THREE.Group();
wrapper.add(group);

const maxDim = Math.max(size.x, size.y, size.z);
console.log("maxDim", maxDim);

// Test scale 1.0 vs 5.0
const scaleFactor1 = 1.0 / maxDim;
wrapper.scale.set(scaleFactor1, scaleFactor1, scaleFactor1);
wrapper.updateMatrixWorld(true);

const box1 = new THREE.Box3().setFromObject(wrapper);
const center1 = new THREE.Vector3();
box1.getCenter(center1);
console.log("Wrapper center with scale 1.0:", center1);

const scaleFactor5 = 5.0 / maxDim;
wrapper.scale.set(scaleFactor5, scaleFactor5, scaleFactor5);
wrapper.updateMatrixWorld(true);

const box5 = new THREE.Box3().setFromObject(wrapper);
const center5 = new THREE.Vector3();
box5.getCenter(center5);
console.log("Wrapper center with scale 5.0:", center5);
