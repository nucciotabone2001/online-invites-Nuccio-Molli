/* ------------------------------
   BOTTONI SI / NO
------------------------------ */
const yesNoButtons = document.querySelectorAll(".yesno-btn");
const presenceInput = document.getElementById("presence-value");
const extraFields = document.getElementById("rsvp-extra-fields");
const noMessage = document.getElementById("no-message");
const submitBtn = document.getElementById("submit-btn");

yesNoButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Rimuovi selezione da tutti
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

    // Il submit DEVE essere sempre attivo
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  });
});

/* ------------------------------
   ALLERGIE OSPITE PRINCIPALE
------------------------------ */
const mainAllergyCheck = document.getElementById("main-allergy-check");
const mainAllergyText = document.getElementById("main-allergy-text");
const mainAllergyValue = document.getElementById("main-allergy-value");

mainAllergyCheck.addEventListener("change", () => {
  if (mainAllergyCheck.checked) {
    mainAllergyValue.value = "Si";
    mainAllergyText.classList.remove("hidden");
  } else {
    mainAllergyValue.value = "No";
    mainAllergyText.classList.add("hidden");
  }
});

/* ------------------------------
   OSPITI EXTRA DINAMICI
------------------------------ */
const guestCount = document.getElementById("guest-count");
const guestFields = document.getElementById("guest-fields");
const allExtraNames = document.getElementById("all-extra-names");
const allExtraAllergies = document.getElementById("all-extra-allergies");

guestCount.addEventListener("input", generateGuestFields);

function generateGuestFields() {
  const count = parseInt(guestCount.value);
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

  // Allergie dinamiche
  document.querySelectorAll(".guest-allergy-check").forEach((check, index) => {
    check.addEventListener("change", () => {
      const text = document.querySelectorAll(".guest-allergy-text")[index];
      text.classList.toggle("hidden", !check.checked);
    });
  });
}

/* ------------------------------
   PRIMA DELL'INVIO → COMPILA I CAMPI NASCOSTI
------------------------------ */
document.getElementById("rsvp-form").addEventListener("submit", () => {
  const names = [...document.querySelectorAll(".guest-name")].map(i => i.value.trim()).join("\n");
  const allergies = [...document.querySelectorAll(".guest-allergy-text")].map(i => i.value.trim()).join("\n");

  allExtraNames.value = names;
  allExtraAllergies.value = allergies;
});
