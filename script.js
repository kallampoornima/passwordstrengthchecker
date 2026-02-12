const strengthBar = document.getElementById("strength-bar");
const msg = document.getElementById("msg");
const passwordInput = document.getElementById("password");

function strengthChecker() {
    const password = passwordInput.value;

    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character checks
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Clear previous bar
    strengthBar.innerHTML = "";

    // Determine strength level (0–4)
    let level = Math.min(4, Math.floor(score / 2));

    for (let i = 0; i < level; i++) {
        let span = document.createElement("span");
        span.classList.add("strength");
        strengthBar.appendChild(span);
    }

    updateUI(level);
}

function updateUI(level) {
    const colors = ["#ff3e36", "#ff691f", "#ffda36", "#0be881"];
    const messages = [
        "Very Weak",
        "Weak",
        "Good",
        "Strong"
    ];

    const spans = document.querySelectorAll(".strength");

    spans.forEach(span => {
        span.style.background = colors[level - 1];
    });

    msg.textContent = level > 0 ? `Password Strength: ${messages[level - 1]}` : "";
}

function toggle() {
    const password = document.getElementById("password");
    const eye = document.getElementById("toggle");

    if (password.type === "password") {
        password.type = "text";
        eye.style.color = "#0be881";
    } else {
        password.type = "password";
        eye.style.color = "#808080";
    }
}
