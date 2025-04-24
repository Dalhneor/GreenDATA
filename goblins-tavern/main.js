document.addEventListener("DOMContentLoaded", () => {
    const homeBtn = document.getElementById("homeButton");
    const recoBtn = document.getElementById("recoButton");
    const loginBtn = document.getElementById("loginButton");
    const discoverBtn = document.getElementById("discoverButton");
    const gameSection = document.getElementById("gameSection");
  
    // HOME button - go to homepage
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        window.location.href = "home.html";
      });
    }
  
    // RECOMMENDATIONS button
    if (recoBtn) {
      recoBtn.addEventListener("click", () => {
        window.location.href = "recommandations.html";
      });
    }
  
    // LOGIN button
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
  
    // DISCOVER HERE button scrolls to game section
    if (discoverBtn && gameSection) {
      discoverBtn.addEventListener("click", () => {
        gameSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
  