const loginForm = document.getElementById("login-form");
const recipeForm = document.getElementById("recipe-form");
const loginSection = document.getElementById("login-section");
const recipeSection = document.getElementById("recipe-section");
const recipeList = document.getElementById("recipe-list");
const logoutBtn = document.getElementById("logout-btn");
const msg = document.getElementById("msg");

let token = "";

// ===== LOGIN =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      token = data.token;
      msg.textContent = "";
      loginForm.reset();
      loginSection.style.display = "none";
      recipeSection.style.display = "block";
      fetchRecipes();
    } else {
      msg.textContent = data.error || "Login failed";
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "Login failed";
  }
});

// ===== FETCH RECIPES =====
async function fetchRecipes() {
  try {
    const res = await fetch("http://localhost:5000/api/recipes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recipes = await res.json();
    recipeList.innerHTML = "";
    recipes.forEach((recipe) => {
      const li = document.createElement("li");
      li.textContent = `${recipe.name} - ${recipe.source}`;
      recipeList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

// ===== ADD RECIPE =====
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("recipe-name").value;
  const source = document.getElementById("recipe-source").value;

  try {
    const res = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, source }),
    });

    if (res.ok) {
      recipeForm.reset();
      fetchRecipes();
    } else {
      msg.textContent = "Failed to add recipe";
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "Failed to add recipe";
  }
});

// ===== LOGOUT =====
logoutBtn.addEventListener("click", () => {
  token = "";
  recipeSection.style.display = "none";
  loginSection.style.display = "block";
  msg.textContent = "";
});
