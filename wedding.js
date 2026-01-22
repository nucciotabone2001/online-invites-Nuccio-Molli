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






/*

document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.details-image img');
  if ('IntersectionObserver' in window && imgs.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.30, rootMargin: '0px 0px -80px 0px' });

    imgs.forEach(img => io.observe(img));
  } else {
    // fallback: show images immediately if IntersectionObserver non supportato
    imgs.forEach(img => img.classList.add('visible'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const events = document.querySelectorAll('.timeline .event');
  if ('IntersectionObserver' in window && events.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.12 });

    events.forEach(ev => obs.observe(ev));
  } else {
    // fallback: mostra subito
    events.forEach(ev => ev.classList.add('visible'));
  }
});

// Directions form: m
// ostra/nascondi sezioni in base alla selezione
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('origin-select');
  const content = document.getElementById('directions-content');
  const gelaOption = document.getElementById('option-gela');
  const airportOption = document.getElementById('option-airport');

  if (select) {
    select.addEventListener('change', () => {
      const value = select.value;
      if (value) {
        content.style.display = 'block';
        // nascondi entrambe, poi mostra solo quella selezionata
        gelaOption.style.display = 'none';
        airportOption.style.display = 'none';

        if (value === 'gela') gelaOption.style.display = 'block';
        if (value === 'airport') airportOption.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const guestsInput = document.getElementById('guests');
  const guestNamesContainer = document.getElementById('guest-names');

  if (!guestsInput || !guestNamesContainer) return;

  function createGuestRow(index, value = '') {
    const row = document.createElement('div');
    row.className = 'guest-name-row';

    const lbl = document.createElement('label');
    lbl.setAttribute('for', `guest_name_${index}`);
    lbl.textContent = `Nome ${index}`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `guest_name_${index}`;
    input.name = `guest_name_${index}`;
    input.placeholder = `Nome e cognome ${index}`;
    input.value = value || '';
    input.required = true;

    row.appendChild(lbl);
    row.appendChild(input);
    return row;
  }

  function updateGuestFields(count) {
    // clamp count
    count = Math.max(0, Math.min(10, Number(count) || 0));

    // preserve existing values
    const existingValues = Array.from(guestNamesContainer.querySelectorAll('input'))
      .map(i => i.value);

    // clear
    guestNamesContainer.innerHTML = '';

    if (count === 0) {
      guestNamesContainer.style.display = 'none';
      return;
    }

    guestNamesContainer.style.display = 'block';

    for (let i = 1; i <= count; i++) {
      const val = existingValues[i - 1] || '';
      guestNamesContainer.appendChild(createGuestRow(i, val));
    }
  }

  // initialize from current value
  updateGuestFields(guestsInput.value);

  // update on change/input
  guestsInput.addEventListener('input', () => updateGuestFields(guestsInput.value));
});
function prepareGuestNames() {
  const guestInputs = document.querySelectorAll('#guest-names input');
  const hiddenField = document.getElementById('all_guest_names');

  const names = Array.from(guestInputs)
    .map(i => i.value.trim())
    .filter(Boolean);

  hiddenField.value = names.join(', ');
}

function sentRSVP() {
  setTimeout(() => {
    alert("Grazie! La tua RSVP è stata inviata 💚");
  }, 500);
}
document.addEventListener('DOMContentLoaded', () => {
  const programWrap = document.querySelector('.program-section .timeline-wrap');
  const programInner = document.querySelector('.program-section .timeline-inner');
  const timeline = document.querySelector('.program-section .timeline');
  const events = document.querySelectorAll('.program-section .timeline .event');

  if (programWrap && programInner && timeline && events.length) {
    const resize = () => {
      // timeline.scrollHeight = total stacked height of events
      const eventsHeight = timeline.scrollHeight;
      const viewport = window.innerHeight;
      // set minHeight so sticky lasts while we scroll through entire timeline content
      programWrap.style.minHeight = `${Math.max(viewport + eventsHeight, viewport * 1.15)}px`;
      // keep inner sticky block filling viewport (minus top)
      const stickyTop = 24; // same value as CSS top of .timeline-inner
      programInner.style.height = `${Math.max(viewport - stickyTop - 12, 320)}px`;
    };

    // stagger animations: set custom CSS delay variable
    events.forEach((ev, idx) => {
      ev.style.setProperty('--delay', `${idx * 120}ms`);
    });

    // IntersectionObserver per singoli eventi (stagger + dissolve)
    if ('IntersectionObserver' in window) {
      const evObs = new IntersectionObserver((entries, o) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            o.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

      events.forEach(e => evObs.observe(e));
    } else {
      // fallback
      events.forEach(e => e.classList.add('visible'));
    }

    // initialize + recalc on resize
    resize();
    window.addEventListener('resize', resize);
  }
});
*/