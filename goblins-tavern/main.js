document.addEventListener("DOMContentLoaded", () => {
    const homeBtn = document.getElementById("homeButton");
    const recoBtn = document.getElementById("recoButton");
    const loginBtn = document.getElementById("loginButton");
    const discoverBtn = document.getElementById("discoverButton");
    const gameSection = document.getElementById("gameSection");
  
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        window.location.href = "home.html";
      });
    }
    if (recoBtn) {
      recoBtn.addEventListener("click", () => {
        window.location.href = "recommandations.html";
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
    if (discoverBtn && gameSection) {
      discoverBtn.addEventListener("click", () => {
        gameSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
  

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = form.username.value.trim();
      const password = form.password.value;
      
      if (username === "admin1" && password === "1234") {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "white";
        setTimeout(() => {
          window.location.href = "manage.html"; 
        }, 1000);
      } else if (username === "SuperAdmin" && password === "1234") {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "white";
        setTimeout(() => {
          window.location.href = "manage.html"; 
        }, 1000);
      } else {
        loginMessage.textContent = "Wrong username or password";
        loginMessage.style.color = "red";
      }
    });
  });
  