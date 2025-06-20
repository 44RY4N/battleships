import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; // Needed to load fonts
import helvetiker from 'three/examples/fonts/droid/droid_sans_mono_regular.typeface.json';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from "gsap";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RectAreaLight } from 'three/src/lights/RectAreaLight.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
let blueGroup;
let greenGroup;
let rectHelper;

function createMenu(){


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,200)
    const scene = new THREE.Scene();

    const menu = document.querySelector("#menu");
    menu.style.display = "grid";

    const renderer = new THREE.WebGLRenderer({})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

   

    document.body.appendChild(renderer.domElement);



    //orbital controls test
  //    const controls = new OrbitControls(camera, renderer.domElement);
//      controls.enableDamping = true;

const roundedBox = new RoundedBoxGeometry(
  2,    // width
  2,    // height
  2,    // depth
  10,   // segments (higher = smoother curve)
  0.2   // radius of edges
);

blueGroup = new THREE.Group();

for(let j = -3; j<= 6 ; j++){
for(let i= 0 ; i< 10 ; i ++){
let material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
let box = new THREE.Mesh(roundedBox, material);
box.position.z = -10
box.position.y = j* 5 + 1;
box.position.x = i * 5 + 1;
blueGroup.add(box)
}
}

 greenGroup = new THREE.Group();

for(let j = -3; j<= 6 ; j++){
for(let i= -1 ; i > -10 ; i --){
let material = new THREE.MeshBasicMaterial({ color: 0x89F336 });
let box = new THREE.Mesh(roundedBox, material);
box.position.z = -10
box.position.y = j* 5 + 1;
box.position.x = i * 5 + 1;
greenGroup.add(box)
}
}

blueGroup.scale.set(4,4,4);
greenGroup.scale.set(4,4,4);

scene.add(greenGroup);
scene.add(blueGroup);





//lights
const light = new THREE.DirectionalLight(0xffffff, 4)   // CHANGE THIS TO 4
light.position.set(-2, 10, 3);
light.castShadow = true;

light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

scene.add(light);

//ambience

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight);










const mouseScreen = { x: 0, y: 0 };


    

    const cubeGeometry = new RoundedBoxGeometry( 16,4,0.5,1,1 );
    let cubeMaterial = new THREE.MeshStandardMaterial({color: 0x1E1E1E});
    cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1E1E1E,
  metalness: 0.3,
  roughness: 0.01
});

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.z = 0;
    cube.position.y = 7;
    cube.receiveShadow = true;
    cube.metalness = 1;
    cube.roughness = 0;

    scene.add(cube);

    camera.position.z = 10;
    camera.position.y = 4;

    // handled resize
window.addEventListener("resize",()=>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

const fontLoader = new FontLoader();
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry("BattleShips", {
      font: font,
      size: 1,
      height: 0.1,
      bevelThickness: 0.2
    });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.scale.z = 0.009; // Flatten toward camera

    textMesh.position.z = 0.25;
    textMesh.position.y = 7;
    textMesh.position.x = -3.8;
    textMesh.castShadow = true;

    scene.add(textMesh);
  });


  // tube light



  const tubeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 32);
const tubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1B00FF,               // Neon cyan
  emissive: 0x1B00FF,            // Emit same color
  emissiveIntensity: 4,
  metalness: 0.3,
  roughness: 0.2
});


cube.castShadow = true;
cube.receiveShadow = true;


const neonTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
neonTube.rotation.z = Math.PI / 2; // lay it horizontally
neonTube.position.set(-7.6, 7, 0.25);     // adjust as needed
neonTube.rotation.z = 0;
scene.add(neonTube);



const rectLight = new RectAreaLight(0x9D00FF, 100, 0.15, 2.9); // color, intensity, width, height
rectLight.position.set(0,0,0);0

rectLight.lookAt(10, 0, -1); // point the light towards your cube

neonTube.add(rectLight);

// Optional helper to visualize light bounds
 rectHelper = new RectAreaLightHelper(rectLight);
rectLight.add(rectHelper);




  // raycasting and mouse




  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();



window.addEventListener("mousemove", (e) => {
  mouseScreen.x = e.clientX;
  mouseScreen.y = e.clientY;

  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;

  gsap.to(camera.position, {
    x: x * 4,
    y: y * 5,
    duration: 1,
    ease: "power2.out",
    onUpdate: () => camera.lookAt(0, 3, -10)
  });
});




window.addEventListener("click",(e)=>{
  mouse.x = (e.clientX/window.innerWidth * 2 -1);
  mouse.y =(e.clientY/window.innerWidth * 2 -1);

    raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log("You clicked:", clickedObject);

  }
}
)

//play();

function play(){
  gsap.to(blueGroup.position,{
    z:20,
    ease:"power2.inOut",
    duration: 10
  })
}




// animation loop set 

    renderer.setAnimationLoop(()=>{animate(renderer,scene,camera,mouseScreen);})

}



function isGroupHovered(group, camera,mouseScreen) {
  const box = new THREE.Box3().setFromObject(group);
  const min = box.min.clone();
  const max = box.max.clone();

  const vertices = [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z),
    new THREE.Vector3(min.x, max.y, min.z),
    new THREE.Vector3(min.x, max.y, max.z),
    new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(max.x, max.y, max.z),
  ];

  const screenCoords = vertices.map(v => {
    const projected = v.project(camera);
    return {
      x: (projected.x + 1) / 2 * window.innerWidth,
      y: (-projected.y + 1) / 2 * window.innerHeight
    };
  });

  let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
  screenCoords.forEach(p => {
    left = Math.min(left, p.x);
    right = Math.max(right, p.x);
    top = Math.min(top, p.y);
    bottom = Math.max(bottom, p.y);
  });

  return (
    mouseScreen.x >= left &&
    mouseScreen.x <= right &&
    mouseScreen.y >= top &&
    mouseScreen.y <= bottom
  );
}






function animate(renderer,scene,camera,mouse){


 //   controls.update();
  if (isGroupHovered(blueGroup, camera,mouse)) {
    gsap.to(blueGroup.position,{
      z:-5,
    duration:2})
  } else {
     gsap.to(blueGroup.position,{
      z:0,
    duration:2})
  }

  if (isGroupHovered(greenGroup, camera,mouse)) {
     gsap.to(greenGroup.position,{
      z:-5,
    duration:2})
  } else {
    gsap.to(greenGroup.position,{
      z:0,
    duration:2})
  }

    renderer.render(scene,camera);
    
}



export {createMenu}