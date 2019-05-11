var scene = new THREE.Scene();

//camera settings
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.z = 10;
camera.position.set(7, 5, 7);

//renderer settings
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(700, 700);
renderer.setClearColor('#777777', 1);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
let renderOuter = document.getElementById('WebGL-output');
renderOuter.appendChild( renderer.domElement );

//controls settings
var controls = new THREE.OrbitControls( camera );
controls.addEventListener('change, render');

// var axes = new THREE.AxisHelper( 20 );
// scene.add(axes);

var spotLight = new THREE.SpotLight( 0xffffff, 2, 70, 0.8, 0.5, 1.5 );
spotLight.castShadow = true;
spotLight.position.set( 11, 6, 2 );
spotLight.shadow.mapSize.width = 4000;
spotLight.shadow.mapSize.height = 4000;
scene.add(spotLight);

spotLight = new THREE.SpotLight( 0xffffff, 2, 40, 0.8, 0.5, 1.5 );
spotLight.castShadow = false;
spotLight.position.set( 0, 3, -12 );
/*spotLight.shadow.mapSize.width = 4000;
spotLight.shadow.mapSize.height = 4000;*/
scene.add(spotLight);

geometry = new THREE.PlaneGeometry(20, 20);
material = new THREE.MeshLambertMaterial({color: '#ffffff'});
var plane = new THREE.Mesh(geometry,material);
plane.receiveShadow = true;
plane.castShadow = true;
plane.position.y = -1;
plane.rotation.x=-0.5*Math.PI;
scene.add(plane);

var loader = new THREE.TDSLoader();
loader.load('mod/lu9y7fwbjklc-barrack/barrack/Models/3Ds/dom.3DS', (obj) => {
	obj.scale.x = 0.05;
	obj.scale.y = 0.05;
	obj.scale.z = 0.05;
	obj.position.y = -1.1;
	obj.rotation.x = -0.5*Math.PI;
	obj.rotation.z = 0.25*Math.PI;
	obj.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		}
	});
	scene.add(obj);
});

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
	//console.log(camera.position);
	controls.update;
}

if ( WEBGL.isWebGLAvailable() ) {
  animate();
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById( 'container' ).appendChild( warning );
}
