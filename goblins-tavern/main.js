
document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("discoverButton").addEventListener("click", () => {
        document.getElementById("gameSection")?.scrollIntoView({ behavior: 'smooth' });
      });
    
document.getElementById("homeButton").addEventListener("click", () => {
    window.location.href = "home.html";
      });
    
document.getElementById("recoButton").addEventListener("click", () => {
        window.location.href = "recommandations.html";
      });
    
document.getElementById("loginButton").addEventListener("click", () => {
        window.location.href = "login.html";
      });
    });
