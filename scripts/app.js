var scene = new THREE.Scene();

//camera settings
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(7, 5, 7);

//renderer settings
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(360, 360);
renderer.setClearColor('#777777', 1);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
let renderOuter = document.getElementById('WebGL-output');
renderOuter.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, document.getElementById('WebGL-output'));
controls.addEventListener('change, render');

var spotLight = new THREE.SpotLight( 0xffffff, 2, 70, 0.8, 0.5, 1.5 );
spotLight.castShadow = true;
spotLight.position.set( 11, 6, 2 );
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 500
scene.add(spotLight);

spotLight = new THREE.SpotLight( 0xffffff, 2, 40, 0.8, 0.5, 1.5 );
spotLight.castShadow = false;
spotLight.position.set( 0, 3, -12 );
scene.add(spotLight);

geometry = new THREE.PlaneGeometry(20, 20);
material = new THREE.MeshLambertMaterial({color: '#ffffff'});
var plane = new THREE.Mesh(geometry,material);
plane.receiveShadow = true;
plane.castShadow = true;
plane.position.y = -1;
plane.rotation.x=-0.5*Math.PI;
scene.add(plane);

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
	controls.update;
}

if ( WEBGL.isWebGLAvailable() ) {
  animate();
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'container' ).appendChild( warning );
}
