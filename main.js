// -----Define Elements-----

//Scene
const scene =new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight,1, 1000 );
camera.position.set(0,0,10);

// Renderer
const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


// -----Create Elements-----
// Create Geometrys
const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshLambertMaterial({color:0xffff00});
const cubeLenghts=15;
const cubes=[];
for(let i=0;i < cubeLenghts;i++){
    const cube = new THREE.Mesh(geometry,material);
    cube.position.set(((Math.random()-0.5)*10),((Math.random()-0.5)*10),((Math.random()-0.5)* -10));
    cubes.push(cube);
}

// Create light
const light=new THREE.PointLight(0xff0000,1,500);
light.position.set( 10, 0, 20 );
// Create ambient light
const ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light


//Add elements in Scene
scene.add(light);
scene.add(ambientlight);
cubes.forEach((cube)=>{
    scene.add(cube);
})


//Renderer All
const render=()=>{
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}
render();


// Gsap
const animateCube=(object)=>{
    const tl= new TimelineMax();
    tl.to(object.scale,0.5,{x:2,ease:Expo.easeOut});
    tl.to(object.scale,0.5,{y:2,ease:Expo.easeOut});
    tl.to(object.rotation,0.3,{y:Math.PI*.5});
    tl.to(object.scale,0.5,{z:2,ease:Expo.easeOut});
}



// window events
function resizeScreen(){
    camera.aspect =window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.updateProjectionMatrix();
}
function onMouseMove(event){
    event.preventDefault();
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    //Mouse events
    raycaster.setFromCamera(pointer,camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for ( let i = 0; i < intersects.length; i ++ ) {
        animateCube(intersects[ i ].object);
	}
    

}

window.addEventListener("resize",resizeScreen);
window.addEventListener("mousemove",onMouseMove)