const strengthBar = document.getElementById("strength-bar");
const msg = document.getElementById("msg");
const passwordInput = document.getElementById("password");

// Prevent spaces from being typed
passwordInput.addEventListener("keydown", function (e) {
    if (e.key === " " || e.code === "Space") {
        e.preventDefault();
    }
});

// Prevent spaces from being pasted
passwordInput.addEventListener("paste", function (e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const textWithoutSpaces = pastedText.replace(/\s/g, '');
    document.execCommand('insertText', false, textWithoutSpaces);
});

function strengthChecker() {
    const password = passwordInput.value;

    let score = 0;

    // Length check (3 points possible)
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;  // NEW: Bonus for very long passwords

    // Character checks (4 points)
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Extra complexity bonus (1 point)
    if (/[^A-Za-z0-9]/.test(password) && password.replace(/[^A-Za-z0-9]/g, '').length >= 2) {
        score++; // Bonus if multiple special characters
    }

    // Clear previous bar
    strengthBar.innerHTML = "";

    // Determine strength level (0–4) based on 8 max points
    let level = 0;
    if (score >= 2) level = 1;  // Very Weak
    if (score >= 4) level = 2;  // Weak  
    if (score >= 6) level = 3;  // Good
    if (score >= 8) level = 4;  // Strong

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