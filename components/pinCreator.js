AFRAME.registerComponent('pin-creator', {
  init: function () {
    this.createPin()
  },
  
  createPin: function(){
    pinPositions = [
      {x: 0, y: 0, z: -30}, {x: 1, y: 0, z: -32},
      {x: -1, y: 0, z: -32}, {x: 1.5, y: 0, z: -34},
      {x: 0, y: 0, z: -34}, {x: -1.5, y: 0, z: -34}
    ]

    var scene = document.querySelector('#scene')

    pinPositions.forEach(position => {
      var pin = document.createElement('a-entity')

      pin.setAttribute('class', 'pin')
      pin.setAttribute("gltf-model", "#pinModel");
      pin.setAttribute('position', position)
      pin.setAttribute('dynamic-body', {})

      scene.appendChild(pin)
    });
  }
});
