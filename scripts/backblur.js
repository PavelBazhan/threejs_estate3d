modw_cancel.onclick = () => {
  document.getElementById('modw').style.opacity = '0';
  document.getElementById('modw').style.transform = 'scale(0.1)';
  document.getElementsByClassName('background_image')[0].style.filter = '';
  document.getElementsByClassName('background_image')[0].style.transform = '';
  scene.remove(scene.children[3]);
  controls.reset();
}

let btn_array = document.getElementsByClassName('show_btn');
for (let elem of btn_array) {
  elem.onclick = (e) => {
    console.log(e.srcElement.id);
    document.getElementById('modw').style.visibility = 'visible';
    document.getElementById('modw').style.opacity = '1';
    document.getElementById('modw').style.transform = 'scale(1)';
    document.getElementsByClassName('background_image')[0].style.filter = 'blur(3px)';
    document.getElementsByClassName('background_image')[0].style.transform = 'scale(1.03)';

    let model = {};
    switch (e.srcElement.id) {
      case 'open01':
        model.path = 'mod/wukk17xbcutc-house/gost_house/3d_models/gost_house.3ds';
        model.scale = 0.015;
        model.posX = -4;
        model.posY = -2;
        model.posZ = -8;
        model.rotX = -0.5*Math.PI;
        model.rotY = null;
        model.rotZ = -0.75*Math.PI;
        model.hiddenChildren = 1;
        break;
      case 'open02':
        model.path = 'mod/lu9y7fwbjklc-barrack/barrack/models/3ds/dom.3ds';
        model.scale = 0.05;
        model.posX = null;
        model.posY = -1.1;
        model.posZ = null;
        model.rotX = -0.5*Math.PI;
        model.rotY = null;
        model.rotZ = 0.25*Math.PI;
        break;
      case 'open03':
        model.path = 'mod/bmfrzkal1iio-vb56/villa.3ds';
        model.scale = 0.05;
        model.posX = null;
        model.posY = -1.1;
        model.posZ = null;
        model.rotX = -0.5*Math.PI;
        model.rotY = null;
        model.rotZ = 0.25*Math.PI;
        break;
      case 'open04':
        model.path = 'mod/bmfrzkal1iio-vb56/villa.3ds';
        model.scale = 0.05;
        model.posX = null;
        model.posY = -0.75;
        model.posZ = null;
        model.rotX = -0.5*Math.PI;
        model.rotY = null;
        model.rotZ = 0.25*Math.PI;
        break;
    }

    var loader = new THREE.TDSLoader();
    loader.load(model.path, (obj) => {
    	obj.scale.x = model.scale ? model.scale : 1;
    	obj.scale.y = model.scale ? model.scale : 1;
    	obj.scale.z = model.scale ? model.scale : 1;
      obj.position.x = model.posX? model.posY : 0;
      obj.position.y = model.posY ? model.posY : 0;
      obj.position.z = model.posZ? model.posZ : 0;
      obj.rotation.x = model.rotX ? model.rotX : 0;
    	obj.rotation.y = model.rotY ? model.rotY : 0;
    	obj.rotation.z = model.rotZ ? model.rotZ : 0;
      if (model.hiddenChildren) {
        obj.children[model.hiddenChildren].visible = false;
      }
    	obj.traverse((child) => {
    		if (child instanceof THREE.Mesh) {
    			child.castShadow = true;
    			child.receiveShadow = true;
    		}
    	});
    	scene.add(obj);
    });
  }
}
