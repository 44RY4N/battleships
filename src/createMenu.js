import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js"; // Needed to load fonts
import helvetiker from "three/examples/fonts/droid/droid_sans_mono_regular.typeface.json";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RectAreaLight } from "three/src/lights/RectAreaLight.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import {  beginPlay } from "./beginPlay.js";
let blueGroup;
let greenGroup;
let rectHelper;
let isMenuActive = true;
let camera;
let Play;
let PlayFriend;
let cube;
let neonTube;
let neonTube2;
let textMesh;

function createMenu() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300,
  );
  const scene = new THREE.Scene();

  const menu = document.querySelector("#menu");
  menu.style.display = "grid";

  const renderer = new THREE.WebGLRenderer({ antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.zIndex = "0";

  document.body.appendChild(renderer.domElement);

  //orbital controls test
  //    const controls = new OrbitControls(camera, renderer.domElement);
  //      controls.enableDamping = true;

  const roundedBox = new THREE.BoxGeometry(
    2, // width
    2, // height
    2, // depth
    10, // segments (higher = smoother curve)
  );

  blueGroup = new THREE.Group();
  const boxes = [];

  for (let j = -3; j <= 6; j++) {
    for (let i = 0; i < 10; i++) {
      let material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      let box = new THREE.Mesh(roundedBox, material);
            // Add edge lines
const edgeGeometry = new THREE.EdgesGeometry(roundedBox); // use same geometry
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // edge color
const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

box.add(edges); // attach edges to the cube so they move/rotate with it
      box.position.z = -10;
      box.position.y = j * 5 + 1;
      box.position.x = i * 5 + 1;
      boxes.push(box);
      blueGroup.add(box);
    }
  }

  greenGroup = new THREE.Group();


  for (let j = -3; j <= 6; j++) {
    for (let i = -1; i > -10; i--) {
      let material = new THREE.MeshBasicMaterial({ color: 0x89f336 });
      let box = new THREE.Mesh(roundedBox, material);
      // Add edge lines
const edgeGeometry = new THREE.EdgesGeometry(roundedBox); // use same geometry
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // edge color
const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

box.add(edges); // attach edges to the cube so they move/rotate with it
      box.position.z = -10;
      box.position.y = j * 5 + 1;
      box.position.x = i * 5 + 1;
      boxes.push(box);
      greenGroup.add(box);
    }
  }

 gsap.to(boxes.map(b => b.rotation), {
  duration: 2,
  y: Math.PI / 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  stagger: {
    each: 0.1,         // delay between each box
    from: "random"
  },
  repeatRefresh: true // ensures a new random order each loop
});


  blueGroup.scale.set(4, 4, 4);
  greenGroup.scale.set(4, 4, 4);

  scene.add(greenGroup);
  scene.add(blueGroup);

  //lights
  const light = new THREE.DirectionalLight(0xffffff, 5); // CHANGE THIS TO 4
  light.position.set(-2, 10, 3);
  light.castShadow = true;

  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default

  scene.add(light);

  //ambience

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const mouseScreen = { x: 0, y: 0 };

  const cubeGeometry = new RoundedBoxGeometry(16, 4, 0.5, 1, 1);
  let cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x1e1e1e });
  cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e,
    metalness: 0.3,
    roughness: 0.01,
  });

  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.z = 0;
  cube.position.y = 8;
  cube.receiveShadow = true;
  cube.metalness = 1;
  cube.roughness = 0;

  scene.add(cube);

// cube 2 

const flatLightGeometry = new THREE.BoxGeometry(8.8,0.01, 0.2);
let flatMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
let flatMesh = new THREE.Mesh(flatLightGeometry, flatMaterial);
flatMesh.position.set(0,-2,0)

cube.add(flatMesh);




  // light at boardCube

  const rectBoardLight = new RectAreaLight(0xffffff, 10, 8.8, 10); // color, intensity, width, height
  rectBoardLight.position.set(0, -0.2, 0);
  rectBoardLight.lookAt(0, -10, 0); // point the light towards your cube
  rectBoardLight.rotation.z =0;
  

  flatMesh.add(rectBoardLight);



  // cube for play


 const PlayGeometry = new RoundedBoxGeometry(8, 4, 0.5, 1, 1);
 let PlayMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e,
    metalness: 0.3,
    roughness: 0.01,
  });

   Play = new THREE.Mesh(PlayGeometry, PlayMaterial);

  Play.receiveShadow = true;
  Play.position.set(0,2,0)

  scene.add(Play);


  // cube for play with friends

   const PlayGeometryFriend = new RoundedBoxGeometry(8, 4, 0.5, 1, 1);
 let PlayMaterialFriend = new THREE.MeshStandardMaterial({
    color: 0x1e1e1e,
    metalness: 0.3,
    roughness: 0.01,
  });

  PlayFriend = new THREE.Mesh(PlayGeometryFriend, PlayMaterialFriend);

  PlayFriend.receiveShadow = true;
  PlayFriend.position.set(0,-3,0)

  scene.add(PlayFriend);




  camera.position.z = 10;
  camera.position.y = 4;

  // handled resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const fontLoader = new FontLoader();
  fontLoader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new TextGeometry("BattleShips", {
        font: font,
        size: 1,
        height: 0.1,
        bevelThickness: 0.2,
      });
      const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
     textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.scale.z = 0.0045; // Flatten toward camera

      textMesh.position.z = 0.25;
      textMesh.position.y = 7.6;
      textMesh.position.x = -3.8;
      textMesh.castShadow = true;

      scene.add(textMesh);

      const textGeometryPlay = new TextGeometry("Play", {
        font: font,
        size: 1,
        height: 0.1,
        bevelThickness: 0.2,
      });

      const textMaterialPlay = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const textMeshPlay = new THREE.Mesh(textGeometryPlay, textMaterialPlay);
      textMeshPlay.scale.z = 0.01;
      textMeshPlay.position.set(-1.4,-0.2,0)
      textMeshPlay.castShadow = true;
      

      Play.add(textMeshPlay);

     let textMeshPlayFriend = new THREE.Mesh(textGeometryPlay,textMaterialPlay)
     textMeshPlayFriend.scale.z = 0.01;
     textMeshPlayFriend.position.set(-1.4,-0.2,0)
     textMeshPlayFriend.castShadow = true;
    PlayFriend.add(textMeshPlayFriend)

        const textGeometryPlaytag = new TextGeometry("(vs computer)", {
        font: font,
        size: 0.4,
        height: 0.1,
        bevelThickness: 0.2,
      });



      const textMaterialPlaytag = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const textMeshPlaytag = new THREE.Mesh(textGeometryPlaytag, textMaterialPlaytag);
      textMeshPlaytag.scale.z = 0.01;
      textMeshPlaytag.position.set(-1.8,-1.2,0)
      textMeshPlaytag.castShadow = true;
      

      Play.add(textMeshPlaytag);


        const textGeometryPlayFriendtag = new TextGeometry("(vs human)", {
        font: font,
        size: 0.4,
        height: 0.1,
        bevelThickness: 0.2,
      });
      const textMeshPlayFriendtag = new THREE.Mesh(textGeometryPlayFriendtag,textMaterialPlaytag)

      textMeshPlayFriendtag.scale.z = 0.008;
      textMeshPlayFriendtag.position.set(-1.6,-1.2,0)
      textMeshPlayFriendtag.castShadow = true;

      PlayFriend.add(textMeshPlayFriendtag);


    },
  );

  // tube light

  const tubeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 32);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1b00ff, // Neon cyan
    emissive: 0x1b00ff, // Emit same color
    emissiveIntensity: 4,
    metalness: 0.3,
    roughness: 0.2,
  });

  cube.castShadow = true;
  cube.receiveShadow = true;

  // neon tube 1 

  neonTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  neonTube.rotation.z = Math.PI / 2; // lay it horizontally
  neonTube.position.set(-7.6, 8, 0.25); // adjust as needed
  neonTube.rotation.z = 0;
  scene.add(neonTube);

  // neon tube 2

  neonTube2 = new THREE.Mesh(tubeGeometry, tubeMaterial);
  neonTube2.position.set(7.6, 8, 0.25); // adjust as needed
  neonTube2.rotation.z = 0;
  scene.add(neonTube2);


  // rectLight for tube 1 
  const rectLight = new RectAreaLight(0x9d00ff, 100, .15, 2.9); // color, intensity, width, height
  rectLight.position.set(0, 0, 0);
  rectLight.lookAt(10, 0, -1); // point the light towards your cube
  neonTube.add(rectLight);

  //rectLight for tube 2 

  const rectLight2 = new RectAreaLight(0x9d00ff, 100, 0.15, 2.9); // color, intensity, width, height
  rectLight2.position.set(0, 0, 0);
  rectLight2.lookAt(-10, 0, -1); // point the light towards your cube
  neonTube2.add(rectLight2);

  // Optional helper to visualize light bounds
  rectHelper = new RectAreaLightHelper(rectLight);
  rectLight.add(rectHelper);

  // raycasting and mouse

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("mousemove",onMouseMove )


  //on mouse move function 
  function onMouseMove(e) {
  mouseScreen.x = e.clientX;
  mouseScreen.y = e.clientY;

  if (isMenuActive){
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;

  gsap.to(camera.position, {
    x: x * 4,
    y: y * 5,
    duration: 1,
    ease: "power2.out",
    onUpdate: () => camera.lookAt(0, 3, -10),
  });
}
}


  /*
  window.addEventListener("click", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerWidth) * 2 - 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      console.log("You clicked:", clickedObject);
    }
  });
  */

  //play();

  function play() {
    gsap.to(blueGroup.position, {
      z: 20,
      ease: "power2.inOut",
      duration: 10,
    });
  }

  // play button functionality

  window.addEventListener("click",()=>{
    if(isObjectHovered(Play, camera, mouseScreen)){
      initiatePlay(camera);
    }
    else if (isObjectHovered(PlayFriend, camera, mouseScreen)){
      console.log("play friend button clicked");
    }
    else 
    return;
  })


// initiate Play Function 

function initiatePlay(camera){

  isMenuActive = false;

  blueGroup.position.z = 0;
  greenGroup.position.z = 0;
  
  gsap.to(camera.position,{
    y:-100,
    z:-20,
    duration: 3,
    ease: "power2.inOut",
    onUpdate: () => camera.lookAt(0, camera.position.y*-10, -100),
    onComplete: () =>{beginPlay();}
  })

  setTimeout(()=>{
    PlayFriend.visible = false;
    Play.visible = false;
    cube.visible =false;
    neonTube.visible = false;
    neonTube2.visible = false;
    textMesh.visible = false;
  },2000)


}















  // animation loop set

  renderer.setAnimationLoop(() => {
    animate(renderer, scene, camera, mouseScreen,Play,PlayFriend,onMouseMove);
  });
}


// Renamed and generalized function to check hover on any object
function isObjectHovered(object, camera, mouseScreen) {
  const box = new THREE.Box3().setFromObject(object);
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

  const screenCoords = vertices.map((v) => {
    const projected = v.project(camera);
    return {
      x: ((projected.x + 1) / 2) * window.innerWidth,
      y: ((-projected.y + 1) / 2) * window.innerHeight,
    };
  });

  let left = Infinity,
    right = -Infinity,
    top = Infinity,
    bottom = -Infinity;
  screenCoords.forEach((p) => {
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

function animate(renderer, scene, camera, mouseScreen, Play, PlayFriend,onMouseMove) {
  // Existing group hover logic

  const canvas = document.querySelector("canvas");
  if (isObjectHovered(blueGroup, camera, mouseScreen)) {
    gsap.to(blueGroup.position, { z: -5, duration: 2 });
  } else {
    gsap.to(blueGroup.position, { z: 0, duration: 2 });
  }

  if (isObjectHovered(greenGroup, camera, mouseScreen)) {
    gsap.to(greenGroup.position, { z: -5, duration: 2 });
  } else {
    gsap.to(greenGroup.position, { z: 0, duration: 2 });
  }

  // Hover check for Play button
  if (isObjectHovered(Play, camera, mouseScreen)) {
    gsap.to(Play.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.6 }); // Scale up
    Play.material.color.set(0x2a2a2a); // Change color
    canvas.style.cursor = "pointer"; // Change cursor
  } else {
    gsap.to(Play.scale, { x: 1, y: 1, z: 1, duration: 0.6 }); // Reset scale
    Play.material.color.set(0x1e1e1e); // Reset color
    canvas.style.cursor = "default"; // Reset cursor
  }

  // hover check for PlayFriend button
  
    if (isObjectHovered(PlayFriend, camera, mouseScreen)) {
    gsap.to(PlayFriend.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.6 }); // Scale up
    PlayFriend.material.color.set(0x2a2a2a); // Change color
   canvas.style.cursor = "pointer"; // Change cursor
    
  } else {
    gsap.to(PlayFriend.scale, { x: 1, y: 1, z: 1, duration: 0.6 }); // Reset scale
    PlayFriend.material.color.set(0x1e1e1e); // Reset color
  }

  renderer.render(scene, camera);
}

const backButton = document.createElement("button");
backButton.textContent = "Back to Menu";
backButton.style.position = "absolute";
backButton.style.top = "20px";
backButton.style.left = "20px";
backButton.style.pointerEvents = "auto";

const game = document.getElementById("game");
game.appendChild(backButton);
backButton.addEventListener("click", () => {
  isMenuActive = true;
  gsap.to(camera.position, {
    x: 0,
    y: 4,
    z: 10,
    duration: 3,
    ease: "power2.inOut",
    onUpdate: () => camera.lookAt(0, 3, -10),
  });
  PlayFriend.visible = true;
  Play.visible = true;
  cube.visible = true;
  neonTube.visible = true;
  neonTube2.visible = true;
  textMesh.visible = true;
});

export { createMenu };
