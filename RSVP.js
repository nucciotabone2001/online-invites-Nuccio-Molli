/* =====================================================
   YES / NO PRESENZA
===================================================== */
const yesNoButtons = document.querySelectorAll(".yesno-btn");
const presenceInput = document.getElementById("presence-value");
const extraFields = document.getElementById("rsvp-extra-fields");
const noMessage = document.getElementById("no-message");
const submitBtn = document.getElementById("submit-btn");

yesNoButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    yesNoButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    const value = btn.dataset.value;
    presenceInput.value = value;

    if (value === "No") {
      extraFields.classList.add("hidden");
      noMessage.classList.remove("hidden");
    } else {
      extraFields.classList.remove("hidden");
      noMessage.classList.add("hidden");
    }

    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  });
});


/* =====================================================
   ALLERGIE OSPITE PRINCIPALE
===================================================== */
const allergyYes = document.getElementById("allergy-yes");
const allergyNo = document.getElementById("allergy-no");
const mainAllergyText = document.getElementById("main-allergy-text");

allergyYes.addEventListener("change", () => {
  mainAllergyText.classList.remove("hidden");
});

allergyNo.addEventListener("change", () => {
  mainAllergyText.classList.add("hidden");
  mainAllergyText.value = "";
});


/* =====================================================
   OSPITI EXTRA DINAMICI
===================================================== */
const guestCount = document.getElementById("guest-count");
const guestFields = document.getElementById("guest-fields");
const allExtraNames = document.getElementById("all-extra-names");
const allExtraAllergies = document.getElementById("all-extra-allergies");

guestCount.addEventListener("input", generateGuestFields);

function generateGuestFields() {
  const count = parseInt(guestCount.value) || 0;
  guestFields.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("guest-block");

    wrapper.innerHTML = `
      <h4>Ospite aggiuntivo ${i}</h4>

      <input type="text" class="guest-name" placeholder="Nome e cognome">

      <label class="checkbox-line">
        <input type="checkbox" class="guest-allergy-check">
        <span>Ha allergie o intolleranze?</span>
      </label>

      <textarea class="guest-allergy-text hidden" placeholder="Indica quali"></textarea>
    `;

    guestFields.appendChild(wrapper);
  }

  document.querySelectorAll(".guest-allergy-check").forEach((check, index) => {
    check.addEventListener("change", () => {
      const text = document.querySelectorAll(".guest-allergy-text")[index];
      text.classList.toggle("hidden", !check.checked);
      if (!check.checked) text.value = "";
    });
  });
}


/* =====================================================
   SUBMIT SICURO → PREPARA I DATI, POI INVIA
===================================================== */
const form = document.getElementById("rsvp-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 🔴 BLOCCA SUBMIT NATIVO

  // Raccogli nomi ospiti extra
  const names = [...document.querySelectorAll(".guest-name")]
    .map(i => i.value.trim())
    .filter(Boolean)
    .join("\n");

  // Raccogli allergie ospiti extra
  const allergies = [...document.querySelectorAll(".guest-allergy-text")]
    .map(i => i.value.trim())
    .filter(Boolean)
    .join("\n");

  allExtraNames.value = names;
  allExtraAllergies.value = allergies;

  // LOG LOCALE DEL TENTATIVO (salvavita)
  try {
    localStorage.setItem(
      "rsvp_" + Date.now(),
      JSON.stringify({
        nome: document.querySelector("input[name='entry.NOME']")?.value || "sconosciuto",
        presenza: presenceInput.value,
        time: new Date().toISOString()
      })
    );
  } catch (err) {
    // se localStorage è pieno o disabilitato, ignora
  }

  // Blocca doppio submit
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.innerText = "Invio in corso...";

  form.submit(); 
  // Piccolo delay per Safari / mobile (stabilità)
  setTimeout(() => {
    window.location.href = "thankyou.html"; // REDIRECT IMMEDIATO (evita doppio submit)
  }, 800);
});
