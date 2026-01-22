document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selector = btn.getAttribute("data-copy");
    const text = document.querySelector(selector).innerText.trim();

    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = "Copiato!";
      setTimeout(() => btn.innerText = "Copia", 1500);
    });
  });
});
