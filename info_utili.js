const header = document.getElementById('header');
const hero = document.getElementById('hero');
const mainNavLinks = document.querySelectorAll('#main-nav a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Cambia colore header con dissolvenza
  if(scrollY > 50){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Parallax inverso: muove sfondo opposto allo scroll
  //const heroOffset = scrollY * -0.3; // inverso e ridotto
  //hero.style.backgroundPosition = `center ${heroOffset}px`;
});


  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Chiudi menu mobile quando clicchi un link
  document.querySelectorAll("#main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

