const imgContent = document.querySelectorAll('.img-content-hover');

function showImgContent(e) {
  for(var i = 0; i < imgContent.length; i++) {
    x = e.pageX;
    y = e.pageY;
    imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
};

document.addEventListener('mousemove', showImgContent);

var width = getWidth();
var height = getHeight();
var flakesCount = 100; //70
var moveY = 0.7;
var moveX = 20;
var flakes = [];

initAnimation();

function initAnimation() {
  setInterval(doAnimation, 5);
  var flakesCounter = 0;

  while (flakesCounter < flakesCount) {
    var flake = document.createElement("div");
    flake.className = "flake";
    flake.style.fontSize = getRandom(12, 60) + "px";
    flake.style.top = getRandom(0, height) + "px";
    flake.style.left = getRandom(0, width) + "px";
    flake.style.color = "#f06292";
    flake.innerHTML = "&#10084";
    newFlake = hearts.appendChild(flake);
    newFlake.speed = getRandom(1, 100);
    flakes.push(newFlake);
    flakesCounter++;
  }
}
function get(id) {
  return document.getElementById(id);
}
function getWidth() {
  return document.body.scrollWidth || document.documentElement.scrollWidth || document.body.offsetWidth;
}

function getHeight() {
  return document.body.scrollHeight || document.documentElement.scrollHeight || document.body.offsetHeight;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doAnimation() {
  for (var i = 0; i < flakes.length; i++) {
    newX = false;
    newY = false;
   
    newY =
      parseFloat(flakes[i].style.top) + (flakes[i].speed / 100) * moveY;
    if (newY > height) {
      newY = 0 - parseInt(flakes[i].style.fontSize);
 
      newX = getRandom(0, width);
    }

    if (!newX)
      newX = parseFloat(flakes[i].style.left) + Math.sin(newY / moveX);
    if (newX < -20) newX = width + 20;
    if (newX > width + 20) newX = -20;
  
    flakes[i].style.top = newY + "px";
    flakes[i].style.left = newX + "px";
  }
}
const flakeElements = document.querySelectorAll('#hearts .flake');

// Add event listeners to each heart element
flakeElements.forEach(flake => {
flake.addEventListener('mouseenter', () => {
// Add the 'hovered' class on hover
flake.classList.add('hovered');
});

flake.addEventListener('animationend', () => {
// Remove the 'hovered' class after the animation ends
flake.classList.remove('hovered');
});
});
window.addEventListener('load', () => {
  const imgContainers = document.querySelectorAll('.img-container');

  imgContainers.forEach(container => {
    const image = container.querySelector('img');

    image.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the click from reaching the body

      const enlargedImage = document.createElement('div');
      enlargedImage.classList.add('enlarged-image');

      const img = document.createElement('img');
      img.src = image.src;
      enlargedImage.appendChild(img);

      document.body.appendChild(enlargedImage);

      // Trigger reflow by accessing computed style to enable the transition
      enlargedImage.offsetWidth;

      enlargedImage.style.opacity = '1'; // Change opacity to 1

      document.body.addEventListener('click', closeEnlargedImage);

      function closeEnlargedImage() {
        enlargedImage.style.opacity = '0'; // Fade out the enlarged image
        setTimeout(() => {
          document.body.removeChild(enlargedImage);
          document.body.style.overflow = 'auto';
          document.body.removeEventListener('click', closeEnlargedImage);
        }, 300); // Match this time with the transition duration
      }

      document.body.style.overflow = 'hidden';
    });
  });
});
