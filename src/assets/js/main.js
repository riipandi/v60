import Alpine from "alpinejs";

// Internal Modules
import "./modules/nav";
import "./modules/theme";

// Instantiate Alpine.js
window.Alpine = Alpine;

Alpine.start();

function printSignature() {
  const HANDSHAKE = String.fromCodePoint(0x1f60d);
  console.log(
    `%cWelcome to v60 Eleventy!%c\n
Does this page need fixes or improvements? ${HANDSHAKE} We like your curiosity!
Help us improve by contributing to: https://github.com/riipandi/v60
`,
    "padding-top: 0.5em; font-size: 2em;",
    "padding-bottom: 0.5em;",
  );
}

printSignature();
