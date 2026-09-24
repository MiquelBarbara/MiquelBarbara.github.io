const languageButtons = document.querySelectorAll("[data-language]");
const translatableElements = document.querySelectorAll("[data-en][data-es]");
const pageTitle = document.querySelector("title");
const description = document.querySelector('meta[name="description"]');

const pageCopy = {
  en: {
    title: "Miquel Barbarà | Game Developer",
    description: "Miquel Barbarà is a game developer working across game design and programming, from gameplay systems and player feedback to C++, C# and Unity."
  },
  es: {
    title: "Miquel Barbarà | Desarrollador de videojuegos",
    description: "Miquel Barbarà es desarrollador de videojuegos y trabaja entre diseño y programación, desde los sistemas de juego y las pruebas con jugadores hasta C++, C# y Unity."
  }
};

function setLanguage(language) {
  const selectedLanguage = language === "es" ? "es" : "en";

  document.documentElement.lang = selectedLanguage;
  document.title = pageCopy[selectedLanguage].title;
  description.content = pageCopy[selectedLanguage].description;

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[selectedLanguage];
  });

  document.querySelectorAll(`[data-${selectedLanguage}-aria-label]`).forEach((element) => {
    element.setAttribute("aria-label", element.dataset[`${selectedLanguage}AriaLabel`]);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("portfolio-language", selectedLanguage);
  } catch {
    // The language switch still works when browser storage is unavailable.
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let savedLanguage = "en";
try {
  savedLanguage = localStorage.getItem("portfolio-language") || "en";
} catch {
  // Use English when browser storage is unavailable.
}
setLanguage(savedLanguage);

document.getElementById("year").textContent = new Date().getFullYear();
