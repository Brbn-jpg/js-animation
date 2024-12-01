const ballsNumber = 12;
const div = document.querySelector(".container");
let objects = [];
for (let i = 1; i <= ballsNumber; i++) {
  const object = document.createElement("div");
  object.classList.add("object");
  div.appendChild(object);
  objects.push(object);
}

const divSize = div.getBoundingClientRect();
const ballSize = objects[0].offsetWidth;

const positions = objects.map(() => ({ x: Math.random() * 1000, y: 50 }));
const velocities = objects.map(() => ({ x: 2, y: 3 }));
const acceleration = objects.map(() => ({ x: Math.random() }));

function Animate() {
  objects.forEach((object, index) => {
    velocities[index].y += acceleration[index].x;
    positions[index].x += velocities[index].x;
    positions[index].y += velocities[index].y;

    if (positions[index].x <= 0) {
      positions[index].x = 0;
      velocities[index].x = -velocities[index].x;
    } else if (positions[index].x >= divSize.width - ballSize) {
      positions[index].x = divSize.width - ballSize;
      velocities[index].x = -velocities[index].x;
    }
    if (positions[index].y <= 0) {
      positions[index].y = 0;
      velocities[index].y = -velocities[index].y;
    } else if (positions[index].y >= divSize.height - ballSize) {
      positions[index].y = divSize.height - ballSize;
      velocities[index].y = -velocities[index].y;
    }
    if (
      positions[index].y === divSize.height - ballSize &&
      positions[index].x === divSize.width - ballSize
    ) {
      positions[index].x = 0;
      positions[index].y = 0;
    }
    object.style.top = positions[index].y + "px";
    object.style.left = positions[index].x + "px";
  });
}

setInterval(Animate, 10);
