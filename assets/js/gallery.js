document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector(".vr-scene");
  const ring = document.getElementById("vr-ring");
  const cards = document.querySelectorAll(".vr-card");

  if (!scene || !ring || cards.length === 0) return;

  /* ==========================================================
       3D GALLERY SETUP
    ========================================================== */

  const numCards = cards.length;

  let radius = 0;

  function setupCards() {
    let cardWidth = 320;
    let extraSpacing = 80;

    if (window.innerWidth <= 1024) {
      cardWidth = 260;
      extraSpacing = 60;
    }

    if (window.innerWidth <= 768) {
      cardWidth = 220;
      extraSpacing = 40;
    }

    if (window.innerWidth <= 480) {
      cardWidth = 190;
      extraSpacing = 30;
    }

    radius = cardWidth / (2 * Math.tan(Math.PI / numCards)) + extraSpacing;

    cards.forEach((card, index) => {
      const angle = (360 / numCards) * index;

      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
  }

  /* ==========================================================
       DRAG + MOMENTUM
    ========================================================== */

  let isDragging = false;

  let previousX = 0;

  let currentRotation = 0;
  let targetRotation = 0;

  let velocity = 0;

  const sensitivity = 0.4;
  const friction = 0.95;
  const lerpEase = 0.1;

  /* ----------------------------------------------------------
       POINTER DOWN
    ---------------------------------------------------------- */

  function onPointerDown(e) {
    isDragging = true;

    previousX = e.clientX;

    velocity = 0;

    scene.setPointerCapture?.(e.pointerId);
  }

  /* ----------------------------------------------------------
       POINTER MOVE
    ---------------------------------------------------------- */

  function onPointerMove(e) {
    if (!isDragging) return;

    const currentX = e.clientX;

    const deltaX = currentX - previousX;

    velocity = deltaX * sensitivity;

    targetRotation += velocity;

    previousX = currentX;
  }

  /* ----------------------------------------------------------
       POINTER UP
    ---------------------------------------------------------- */

  function onPointerUp(e) {
    isDragging = false;

    try {
      scene.releasePointerCapture?.(e.pointerId);
    } catch (error) {}
  }

  /* ==========================================================
       POINTER EVENTS
    ========================================================== */

  scene.addEventListener("pointerdown", onPointerDown);

  scene.addEventListener("pointermove", onPointerMove);

  scene.addEventListener("pointerup", onPointerUp);

  scene.addEventListener("pointercancel", onPointerUp);

  /* ==========================================================
       ANIMATION LOOP
    ========================================================== */

  function renderLoop() {
    if (!isDragging) {
      targetRotation += velocity;

      velocity *= friction;

      if (Math.abs(velocity) < 0.01) {
        velocity = 0;
      }
    }

    currentRotation += (targetRotation - currentRotation) * lerpEase;

    ring.style.transform = `rotateX(-3deg) rotateY(${currentRotation}deg)`;

    requestAnimationFrame(renderLoop);
  }

  /* ==========================================================
       INITIALIZE
    ========================================================== */

  setupCards();

  renderLoop();

  /* ==========================================================
       RESPONSIVE
    ========================================================== */

  window.addEventListener("resize", setupCards);
});
