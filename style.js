// Get the link element for the CSS file
const cssLink = document.getElementById('orientationcss');

// Function to change the CSS file based on screen orientation
function changeCssFile() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    cssLink.href = "portrait.css";
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    cssLink.href = "landscape.css";
  }
}

// Add an event listener to detect screen orientation changes
window.addEventListener("resize", changeCssFile);

// Call the function initially to set the CSS file based on the current screen orientation
changeCssFile();
