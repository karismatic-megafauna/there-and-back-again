window.onload = function() {
  // var shipInfo = {
  //   fuel: {
  //     reserve: 100,
  //     consumptionRate: 10,
  //   },
  //   demensions: {
  //     width: 0,
  //     length: 0,
  //     shape: 'triangle',
  //   },
  //   health: 0,
  //   mass: 0,
  //   boosterPower: 0,
  //   antiGravity: {
  //     active: false,
  //     duration: 0,
  //     cooldown: 0,
  //   },
  // }

  // var level = {
  //   start: {
  //     x: 0,
  //     y: 0,
  //     landed: false,
  //   },
  //   end: {
  //     x: 0,
  //     y: 0,
  //     reached: false,
  //   },
  //   planets: [
  //     {
  //       size: 0,
  //       mass: 0,
  //       x: 0,
  //       y: 0,
  //     },
  //   ],
  // }

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var ship = particle.create(50, height / 2, 0, 0);
  var thrust = vector.create(0, 0);
  var angle = 0;
  var turningLeft = false;
  var turningRight = false;
  var thrusting = false;
  var antiGravityEngaged = false;
  var fuel = 150;
  var fuelMax = 150;
  var planets = [
    { x: 400, y:600, radius:100, mass: 500 },
    { x: 900, y:1000, radius:250, mass: 500 },
    { x: 1200, y:200, radius:50, mass: 500 },
  ]

  var beacon = { x: width - 100, y: height / 2, radius:50, mass: 500 };

  update();

  document.body.addEventListener("keydown", function(event) {
    // console.log(event.keyCode);
    switch(event.keyCode) {
      case 32: // space
        antiGravityEngaged = true;
        break;

      case 38: // up
        thrusting = true;
        break;

      case 37: // left
        turningLeft = true;
        break;

      case 39: // right
        turningRight = true;
        break;

      default:
        break;

    }
  });

  document.body.addEventListener("keyup", function(event) {
    // console.log(event.keyCode);
    switch(event.keyCode) {
      case 32: // space
        antiGravityEngaged = false;
        break;

      case 38: // up
        thrusting = false;
        break;

      case 37: // left
        turningLeft = false;
        break;

      case 39: // right
        turningRight = false;
        break;

      default:
        break;

    }
  });

  function update() {
    context.clearRect(0, 0, width, height);

    if(turningLeft) {
      angle -= 0.05;
    }
    if(turningRight) {
      angle += 0.05;
    }

    thrust.setAngle(angle);

    if(thrusting && fuel >= 0) {
      thrust.setLength(0.1);
      fuel = fuel - 1;
    }
    else {
      thrust.setLength(0);
    }


    // Move the ship
    ship.accelerate(thrust);
    ship.update();

    // Planets
    planets.map(function(p){
      context.beginPath();
      context.ellipse(p.x, p.y, p.radius, p.radius, 0, 0, 2 *Math.PI)
      context.stroke();
    });

    // Beacon
    context.beginPath()
    context.ellipse(beacon.x, beacon.y, beacon.radius, beacon.radius, 0, 0, 2 *Math.PI)
    context.stroke()

    // Fuel Meter
    context.strokeRect(10, 10, fuelMax, 25);
    context.fillStyle = 'green';
    if (fuel <= 100) {
      context.fillStyle = 'orange';
    }
    if (fuel <= 50) {
      context.fillStyle = 'red';
    }
    context.fillRect(10, 10, fuel, 25)
    context.fillStyle = 'black';

    // Set the page center to be around the ship
    // TODO: maybe change this to not translate?
    context.save();
    context.translate(ship.position.getX(), ship.position.getY());
    context.rotate(angle);

    // Draw the ship
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    if(thrusting && fuel >= 0) {
      context.moveTo(-10, 0);
      context.lineTo(-18, 0);
      context.moveTo(-10, -5);
      context.lineTo(-16, -5);
      context.moveTo(-10, 5);
      context.lineTo(-16, 5);
    }

    if(antiGravityEngaged) {
      context.moveTo(18, 0);
      context.ellipse(-2, 0, 20, 20, 0, 0, 2 * Math.PI);
    }

    context.stroke();
    context.restore();


    // Boundaries logic
    if(ship.position.getX() > width) {
      ship.position.setX(0);
    }
    if(ship.position.getX() < 0) {
      ship.position.setX(width);
    }
    if(ship.position.getY() > height) {
      ship.position.setY(0);
    }
    if(ship.position.getY() < 0) {
      ship.position.setY(height);
    }

    requestAnimationFrame(update);
  }
};
