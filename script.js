const display = document.getElementById("display");
const preview = document.getElementById("preview");
const themeToggle = document.getElementById("theme-toggle");
const errorMessage = document.getElementById("error-message");

// Theme toggle logic
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  document.querySelector(".calculator").classList.toggle("dark", dark);
  document.getElementById("display").classList.toggle("dark", dark);
  document.getElementById("preview").classList.toggle("dark", dark);
  document.querySelectorAll(".btn").forEach(btn => btn.classList.toggle("dark", dark));
  themeToggle.textContent = dark ? "☀️" : "🌙";
}

// Load theme from localStorage
const darkMode = localStorage.getItem("darkMode") === "true";
setTheme(darkMode);

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  document.querySelector(".calculator").classList.toggle("dark", isDark);
  document.getElementById("display").classList.toggle("dark", isDark);
  document.getElementById("preview").classList.toggle("dark", isDark);
  document.querySelectorAll(".btn").forEach(btn => btn.classList.toggle("dark", isDark));
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark);
});

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.style.display = "block";
}
function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

function append(char) {
  clearError();
  if (display.value.length >= 20) {
    showError("Max length reached");
    return;
  }
  display.value += char;
  updatePreview();
}

function clearDisplay() {
  display.value = "";
  preview.textContent = "= 0";
  clearError();
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  updatePreview();
  clearError();
}

function calculate() {
  try {
    const result = eval(display.value);
    if (result === Infinity || result === -Infinity) {
      throw new Error("Division by zero");
    }
    display.value = result;
    preview.textContent = `= ${display.value}`;
    clearError();
  } catch {
    display.value = "";
    preview.textContent = "Invalid expression";
    showError("Invalid expression");
  }
}

function updatePreview() {
  try {
    if (display.value) {
      const result = eval(display.value);
      preview.textContent = `= ${result}`;
    } else {
      preview.textContent = "= 0";
    }
    clearError();
  } catch {
    preview.textContent = "Invalid";
    showError("Invalid expression");
  }
}

// Enhanced Keyboard Support
// Only allow input if not on a button or input
window.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "BUTTON" || document.activeElement.tagName === "INPUT") return;
  const key = e.key;
  if ("0123456789+-*/.".includes(key)) {
    append(key);
    e.preventDefault();
  } else if (key === "Enter" || key === "=") {
    calculate();
    e.preventDefault();
  } else if (key === "Backspace") {
    deleteLast();
    e.preventDefault();
  } else if (key === "Escape") {
    clearDisplay();
    e.preventDefault();
  }
});
