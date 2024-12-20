let ballsNumber = document.querySelector(".balls-number").value;
const div = document.querySelector(".container");
let objects = [];
let intervalID;

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function Run() {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  }

  objects.forEach((obj) => div.removeChild(obj));
  objects = [];

  let ballsNumber = document.querySelector(".balls-number").value;

  for (let i = 1; i <= ballsNumber; i++) {
    const object = document.createElement("div");
    object.classList.add("object");
    object.style.backgroundColor = `rgb(${getRandomInt(0, 255)},${getRandomInt(
      0,
      255
    )},${getRandomInt(0, 255)})`;
    div.appendChild(object);
    objects.push(object);
  }

  const divSize = div.getBoundingClientRect();
  const ballSize = objects[0].offsetWidth;

  const positions = objects.map(() => ({
    x: getRandomInt(1, divSize.width),
    y: 50,
  }));
  const velocities = objects.map(() => ({
    x: Math.random() > 0.5 ? -1 : 1,
    y: Math.random() > 0.5 ? -2 : 2,
  }));
  const acceleration = objects.map(() => ({ x: Math.random() }));

  function Animate() {
    intervalID = 1;
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
        // resets animation
        positions[index].y === divSize.height - ballSize &&
        positions[index].x === divSize.width - ballSize
      ) {
        positions[index].x = divSize.width - ballSize;
        positions[index].y = divSize.height - ballSize;
      }
      object.style.top = positions[index].y + "px";
      object.style.left = positions[index].x + "px";
    });
  }
  intervalID = setInterval(Animate, 10);
}
