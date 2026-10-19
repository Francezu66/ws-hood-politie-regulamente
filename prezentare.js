(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const counter = document.querySelector(".counter");
  let current = 0;

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, position) => {
      slide.classList.toggle("active", position === current);
    });
    counter.textContent = `${current + 1} / ${slides.length}`;
  }

  document.querySelector(".previous").addEventListener("click", () => show(current - 1));
  document.querySelector(".next").addEventListener("click", () => show(current + 1));
  document.querySelector(".print").addEventListener("click", () => window.print());
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === " ") show(current + 1);
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "Home") show(0);
    if (event.key === "End") show(slides.length - 1);
  });

  const requestedSlide = Number(new URLSearchParams(window.location.search).get("slide"));
  const initialSlide = Number.isInteger(requestedSlide) && requestedSlide >= 1 && requestedSlide <= slides.length
    ? requestedSlide - 1
    : 0;

  show(initialSlide);
})();
