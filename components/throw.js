AFRAME.registerComponent('throw', {
  init: function () {
    this.eventCreator()
  },

  eventCreator: function() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'z') {

        var ball = document.createElement("a-entity");

        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.5,
        });

        ball.setAttribute("material", "color", "black");

        var cam = document.querySelector("#cameraRig");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-30));

        var scene = document.querySelector("#scene");

        //set the ball as the dynamic entity
        ball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "5",
        });

        //add the collide event listener to the ball
        ball.addEventListener("collide", this.removeball);

        scene.appendChild(ball);
      }
    })
  },

  removeball: function (e) {
    //ball element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.class == "pin") {
      elementHit.setAttribute("material", {
        opacity: 1,
        transparent: true,
      });

      //impulse and point vector
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeball);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});
