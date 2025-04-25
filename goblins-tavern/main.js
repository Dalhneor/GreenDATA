document.addEventListener("DOMContentLoaded", () => {
    const homeBtn = document.getElementById("homeButton");
    const recoBtn = document.getElementById("recoButton");
    const loginBtn = document.getElementById("loginButton");
    const discoverBtn = document.getElementById("discoverButton");
    const gameSection = document.getElementById("gameSection");
    const logoutBtn = document.getElementById("logoutButton");
    const superGame = document.getElementById("super-games");
  
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
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          window.location.href = "home.html";
        });
      }
      if (superGame) {
        superGame.addEventListener("click", () => {
          window.location.href = "recommandations.html";
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
  
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        //dropdown
        const selects = document.querySelectorAll(".preferences-form select");
        const selectedOptions = Array.from(selects).map(select => select.value);
  
        
        const keywords = [
          document.getElementById("keywords1").value,
          document.getElementById("keywords2").value,
          document.getElementById("keywords3").value
        ];
  
        //display ou filter bref à voir
        const resultsContainer = document.getElementById("resultsContainer");
        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <h3>You selected:</h3>
            <ul>
              ${selectedOptions.map(opt => `<li>Category: ${opt}</li>`).join("")}
              ${keywords.map((kw, i) => kw ? `<li>Keyword ${i + 1}: ${kw}</li>` : "").join("")}
            </ul>
          `;
        } else {
          console.log("Selected categories:", selectedOptions);
          console.log("Entered keywords:", keywords);
        }
      });
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("manageForm");
    const submitBtn = document.getElementById("submitBtn");
  
    submitBtn.addEventListener("click", () => {
      const formData = new FormData(form);
  
      const data = {
        boardGameId: formData.get("BD_ID"),
        title: formData.get("Title"),
        description: formData.get("Description"),
        releaseDate: formData.get("ReleaseDate"),
        minPlayers: formData.get("MinP"),
        maxPlayers: formData.get("MaxP"),
        playingTime: formData.get("TimeP"),
        minAge: formData.get("Minage"),
        owned: formData.get("Owned"),
        designer: formData.get("Designer"),
        wanting: formData.get("Wanting"),
        artworkUrl: formData.get("ArtworkUrl"),
        publisher: formData.get("Publisher"),
        category: formData.get("Category"),
        gameMechanics: formData.get("MecaG"),
        ratingId: formData.get("IDR"),
        userRating: formData.get("UserR"),
        averageRating: formData.get("AvgR"),
        gameExtensionId: formData.get("Ex_IDG"),
        extensionName: formData.get("ExName"),
        keywords: [] // Optional array to store extra tags/keywords if needed
      };
      
  
      const keywordsRaw = `${data.title} ${data.category} ${data.description}`;
      data.keywords = keywordsRaw
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2); 
  
      console.log("Prepared Data for SQL:", data);
      
      // On peu balancer dans du json après
  });
});