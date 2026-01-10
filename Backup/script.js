// script.js

// === Theme Toggle Functionality ===
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

/**
 * Sets the theme for the entire application.
 * @param {string} theme - 'light-theme' or 'dark-theme'
 */
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);

  // Update the toggle icon (Sun for light, Moon for dark)
  if (themeIcon) {
    themeIcon.className =
      theme === "light-theme" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Initialize theme from localStorage or default to 'dark-theme'
const savedTheme = localStorage.getItem("theme") || "dark-theme";
setTheme(savedTheme);

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    // Determine the new theme based on current body class
    const currentTheme = document.body.className;
    const newTheme =
      currentTheme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
  });
}

// === Contact Form Functionality (Full Original Logic) ===
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = this.querySelector(".submit-btn");
    const originalText = btn.innerHTML;

    // Change button to "Sending..." state
    btn.innerHTML =
      '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    const serviceID = "service_l9exnck";
    const templateID = "template_bt6vul2";

    // Get form values
    const formData = new FormData(this);
    let userPhone = formData.get("user_phone") || "";

    /**
     * Formats phone number string into (XXX) XXX-XXXX format
     */
    function formatPhoneNumber(phone) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length === 10) {
        return `(${digits.substr(0, 3)}) ${digits.substr(3, 3)}-${digits.substr(
          6
        )}`;
      }
      return digits.length === 0 ? "" : digits;
    }

    const formattedPhone = formatPhoneNumber(userPhone);

    const templateParams = {
      user_name: formData.get("user_name"),
      _replyto: formData.get("_replyto"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      user_phone: formattedPhone,
    };

    // Send the email via emailjs
    emailjs
      .send(serviceID, templateID, templateParams)
      .then(() => {
        btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
        btn.style.background = "#0dff1f";

        alert("Message sent successfully!");

        setTimeout(() => {
          this.reset();
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      })
      .catch((err) => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.disabled = false;
        alert("Failed to send message. Error: " + JSON.stringify(err));
      });
  });
}

// === Hamburger Menu Functionality (Full Original Logic) ===
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a navigation link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside of the menu area
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}
