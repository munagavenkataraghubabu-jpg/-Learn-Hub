/**
 * LearnHub - Demo Authentication Module
 * Manages client-side demo user accounts, sessions, route protection, and navbar UI.
 * NOTE: This is client-side demo authentication for learning portfolios and uses LocalStorage.
 */

// Auto-seed default student if none exists
(function initDefaultUser() {
    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existingUsers) {
        const defaultUsers = [
            {
                name: "Alex Morgan",
                email: "alex@learnhub.edu",
                password: "password123",
                joinedDate: "October 2026",
                avatar: "🎓"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }
})();

// Get logged in user object or null
function getCurrentUser() {
    try {
        const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Demo Login
function loginUser(email, password, remember = true) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);

    if (user) {
        const sessionData = {
            name: user.name,
            email: user.email,
            joinedDate: user.joinedDate || "Recent",
            avatar: user.avatar || "🎓"
        };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionData));
        return { success: true, user: sessionData };
    } else {
        return { success: false, message: "Invalid email or password. Hint: alex@learnhub.edu / password123" };
    }
}

// Demo Registration
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    const emailLower = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === emailLower)) {
        return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
        name: name.trim(),
        email: emailLower,
        password: password,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: "🎓"
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return { success: true, message: "Registration successful! Please login." };
}

// Logout
function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = "login.html";
}

// Route Protection: Redirect to login.html if not authenticated
function requireAuth() {
    if (!isLoggedIn()) {
        const currentPath = window.location.pathname.split("/").pop();
        window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}`;
    }
}

// Setup Password Visibility Toggle
function setupPasswordToggle(inputSelector, toggleButtonSelector) {
    const input = document.querySelector(inputSelector);
    const btn = document.querySelector(toggleButtonSelector);
    if (!input || !btn) return;

    btn.addEventListener("click", () => {
        const isPassword = input.getAttribute("type") === "password";
        input.setAttribute("type", isPassword ? "text" : "password");
        const icon = btn.querySelector("i");
        if (icon) {
            icon.classList.toggle("bi-eye", !isPassword);
            icon.classList.toggle("bi-eye-slash", isPassword);
        }
    });
}

// Update Navbar dynamically based on Auth State
function updateNavbarAuthUI() {
    const authContainer = document.querySelector("#navbarAuthActions");
    if (!authContainer) return;

    const user = getCurrentUser();
    if (user) {
        authContainer.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2 py-1 px-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 28px; height: 28px; font-size: 0.8rem;">
                        ${user.name.charAt(0)}
                    </span>
                    <span class="d-none d-md-inline fw-semibold">${user.name.split(" ")[0]}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                    <li class="px-3 py-2 border-bottom">
                        <small class="text-muted d-block">Signed in as</small>
                        <strong class="text-dark">${user.email}</strong>
                    </li>
                    <li><a class="dropdown-item py-2" href="dashboard.html"><i class="bi bi-speedometer2 me-2 text-primary"></i>Dashboard</a></li>
                    <li><a class="dropdown-item py-2" href="courses.html"><i class="bi bi-book me-2 text-primary"></i>Browse Courses</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item py-2 text-danger" id="logoutBtn" onclick="logoutUser()"><i class="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                </ul>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <a href="login.html" class="btn btn-outline-primary px-3 fw-semibold">Login</a>
                <a href="signup.html" class="btn btn-theme-primary px-3 fw-semibold">Sign Up</a>
            </div>
        `;
    }
}
