let currentAudio = null;

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    const audioSrc = card.dataset.audio;
    const gifSrc = card.dataset.gif;
    const gif = card.querySelector(".hover-gif");

    // Handle GIF
    if (gif && gifSrc) {
      gif.src = gifSrc;
    }

    // Handle audio
    if (audioSrc) {
      currentAudio = new Audio(audioSrc);
      currentAudio.volume = 0.4;
      currentAudio.loop = true;
      currentAudio.play().catch(() => {});
    }

  });

  card.addEventListener("mouseleave", () => {

    // Stop audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

  });

});
let hue = 0;
const trailCount = 12;
const trails = [];
let mouseX = 0;
let mouseY = 0;
// Pastel rainbow colors
const pastelColors = ["#f9a8d4", "#a5f3fc", "#fde68a", "#c7d2fe", "#6ee7b7"];


document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('cursor-trail');
    document.body.appendChild(dot);
    
    // Store position data for each dot
    trails.push({ 
      el: dot, 
      x: 0, 
      y: 0 
    });
  }
  
  // Start the animation loop
  animate();
});

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  let x = mouseX;
  let y = mouseY;

  trails.forEach((trail, index) => {
    // This creates the "delayed follow" effect
    // 0.3 is the friction; lower is slower/smoother
    trail.x += (x - trail.x) * 0.3;
    trail.y += (y - trail.y) * 0.3;

    // Apply the position
    trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px)`;

    // Rainbow color (offset per dot)
     trail.el.style.backgroundColor = `hsl(${hue + index * 20}, 60%, 80%)`;
    
    // Fade the trail out toward the end
    trail.el.style.opacity = (trailCount - index) / trailCount;

     // Spawn sparkles occasionally
    if (Math.random() < 0.15) { // 15% chance per frame
      spawnSparkle(trail.x, trail.y);
    }

    // The next dot follows the current dot for a "snake" effect
    x = trail.x;
    y = trail.y;
  });

  requestAnimationFrame(animate);
}
// Sparkle creator
function spawnSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random direction & distance
  const dx = (Math.random() - 0.5) * 40; // px
  const dy = (Math.random() - 0.5) * 40; // px
  sparkle.style.setProperty('--x', dx + 'px');
  sparkle.style.setProperty('--y', dy + 'px');

  // Random pastel color
  sparkle.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';

  document.body.appendChild(sparkle);

  sparkle.addEventListener('animationend', () => sparkle.remove());
}

// Array of image URLs to drop
const dropImages = [
  'chibi5.png',
  'chibi2.png',
  'chibi3.png',
  'chibi4.png', 
  // add more URLs as you like
];

document.addEventListener('click', e => {
  // --- STATIC IMAGE ---
  const staticPic = document.createElement('img');
  staticPic.className = 'cursor-pic';
  const randomIndex = Math.floor(Math.random() * dropImages.length);
  staticPic.src = dropImages[randomIndex];

  // Position static image at cursor
  staticPic.style.left = e.clientX + 'px';
  staticPic.style.top = e.clientY + 'px';
  document.body.appendChild(staticPic);

  // Remove after some time
  setTimeout(() => {
    staticPic.style.opacity = 0; // fade out
    staticPic.addEventListener('transitionend', () => staticPic.remove());
  }, 3000 + Math.random() * 2000); // 3–5 seconds stay

  // Drop animation for static image
  staticPic.style.animation = 'picDrop 2s forwards';

  // --- SPRITE IMAGE ---
  const spritePic = document.createElement('div'); // use div for sprite sheet
  spritePic.className = 'cursor-pic sprite';
  spritePic.style.backgroundImage = `url('chibi1_eat.png')`;

  // Position sprite slightly to the left of static image
  const offsetX = -50; // pixels left
  spritePic.style.left = e.clientX + offsetX + 'px';
  spritePic.style.top = e.clientY + 'px';
  document.body.appendChild(spritePic);

  // Wait for drop to finish before starting sprite animation
  setTimeout(() => {
  // Freeze position
  const rect = spritePic.getBoundingClientRect();
  spritePic.style.left = rect.left + 'px';
  spritePic.style.top = rect.top + 'px';
  spritePic.style.transform = 'none';
    spritePic.style.animation = 'spriteAnim 2.4s steps(16) forwards';
    
    // Fade out after sprite animation
    setTimeout(() => {
      spritePic.style.transition = 'opacity 1s ease';
      spritePic.style.opacity = 0;
      spritePic.addEventListener('transitionend', () => spritePic.remove());
    }, 800);
  }, 2000); // match picDrop duration
});




function flyStars(card, count = 40) {

  const rect = card.getBoundingClientRect();

  const offset = 5; // outside border

  for (let i = 0; i < count; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    // Randomly decide if inside or outside

    const spawnOutside = Math.random() < 0.5; // 50% chance

    let x, y, dx, dy;

    if (spawnOutside) {

      // Outside card

      const side = Math.floor(Math.random() * 4);

      switch (side) {

        case 0: // top

          x = rect.left + Math.random() * rect.width;

          y = rect.top - offset;

          dx = (Math.random() - 0.5) * 100;

          dy = -Math.random() * 150;

          break;

        case 1: // right

          x = rect.right + offset;

          y = rect.top + Math.random() * rect.height;

          dx = Math.random() * 150;

          dy = (Math.random() - 0.5) * 100;

          break;

        case 2: // bottom

          x = rect.left + Math.random() * rect.width;

          y = rect.bottom + offset;

          dx = (Math.random() - 0.5) * 100;

          dy = Math.random() * 150;

          break;

        case 3: // left

          x = rect.left - offset;

          y = rect.top + Math.random() * rect.height;

          dx = -Math.random() * 150;

          dy = (Math.random() - 0.5) * 100;

          break;

      }

    } else {

      // Inside card

      x = rect.left + Math.random() * rect.width;

      y = rect.top + Math.random() * rect.height;

      dx = (Math.random() - 0.5) * 100;

      dy = (Math.random() - 0.5) * 100;

    }

    star.style.left = x + "px";

    star.style.top = y + "px";

    star.style.setProperty("--x", dx + "px");

    star.style.setProperty("--y", dy + "px");

    // Random light color

    star.style.backgroundColor = getRandomLightColor();

    // Random size

    star.style.width = `${4 + Math.random() * 4}px`;

    star.style.height = `${4 + Math.random() * 4}px`;

    // Append to body to avoid clipping

    document.body.appendChild(star);

    // Remove after animation

    star.addEventListener("animationend", () => star.remove());

  }

}

// Helper function for random light color

function getRandomLightColor() {

  const r = Math.floor(Math.random() * 127 + 127);

  const g = Math.floor(Math.random() * 127 + 127);

  const b = Math.floor(Math.random() * 127 + 127);

  return `rgb(${r},${g},${b})`;

}