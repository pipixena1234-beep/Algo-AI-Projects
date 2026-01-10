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