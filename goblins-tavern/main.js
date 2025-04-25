document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeButton");
  const recoBtn = document.getElementById("recoButton");
  const loginBtn = document.getElementById("loginButton");
  const discoverBtn = document.getElementById("discoverButton");
  const gameSection = document.getElementById("gameSection");
  const logoutBtn = document.getElementById("logoutButton");
  const superGame = document.getElementById("super-games");

  if (homeBtn) homeBtn.addEventListener("click", () => window.location.href = "home.html");
  if (recoBtn) recoBtn.addEventListener("click", () => window.location.href = "recommandations.html");
  if (loginBtn) loginBtn.addEventListener("click", () => window.location.href = "login.html");
  if (logoutBtn) logoutBtn.addEventListener("click", () => window.location.href = "home.html");
  if (superGame) superGame.addEventListener("click", () => window.location.href = "recommandations.html");
  if (discoverBtn && gameSection) {
    discoverBtn.addEventListener("click", () => gameSection.scrollIntoView({ behavior: "smooth" }));
  }

  const form = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;

      if (
        (username === "admin1" || username === "SuperAdmin") &&
        password === "1234"
      ) {
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
  }

  const searchBtn = document.getElementById("searchBtn");
  const resultsContainer = document.getElementById("resultsContainer");
  const searchForm = document.getElementById("categoryForm");
  const resetBtn = document.getElementById("resetBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
      const year = document.getElementById("pref1").value;
      const minPlayers = document.getElementById("pref2").value;
      const playtime = document.getElementById("pref3").value;
      const maxPlayers = document.getElementById("pref4").value;

      const keywords = [];
      const kw1 = document.getElementById("keywords1");
      const kw3 = document.getElementById("keywords3");

      if (kw1 && kw1.value.trim() !== "") keywords.push(kw1.value.trim());
      if (kw3 && kw3.value.trim() !== "") keywords.push(kw3.value.trim());

      const searchData = { year, minPlayers, maxPlayers, playtime, keywords };

      try {
        const response = await fetch("http://localhost:3000/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchData)
        });

        const results = await response.json();

        if (response.ok && resultsContainer) {
          resultsContainer.innerHTML = "";

          if (results.length > 0) {
            results.forEach(game => {
              const card = document.createElement("div");
              card.classList.add("game-card");

              const imageUrl = game.img && game.img.startsWith("http")
                ? game.img
                : "../img/placeholder.jpg";

              card.innerHTML = `
                <img src="${imageUrl}" alt="${game.name}" class="game-image">
                <div class="game-info">
                  <h3>${game.name}</h3>
                  <p><strong>Published:</strong> ${game.yearpublished || "?"}</p>
                  <p><strong>Players:</strong> ${game.minplayers} – ${game.maxplayers}</p>
                  <p><strong>Time:</strong> ${game.playingtime} min</p>
                </div>
              `;
              resultsContainer.appendChild(card);
            });

          } else {
            resultsContainer.innerHTML = "<p style='color:white'>No results found.</p>";
          }
        } else {
          resultsContainer.innerHTML = `<p>Error: ${results.error}</p>`;
        }

      } catch (error) {
        console.error("Search error:", error);
        if (resultsContainer) {
          resultsContainer.innerHTML = "<p>Server error. Please try again later.</p>";
        }
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchForm) searchForm.reset();
      if (resultsContainer) resultsContainer.innerHTML = "";
    });
  }
});
