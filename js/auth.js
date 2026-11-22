/**
 * LearnHub - Demo Authentication Module
 * Manages client-side demo user accounts, user-scoped storage, and fresh onboarding states.
 */

const AUTH_KEYS = {
    CURRENT_USER: "learnhub_current_user",
    USERS: "learnhub_registered_users",
    ENROLLED: "learnhub_enrolled_courses",
    PROGRESS: "learnhub_course_progress",
    WISHLIST: "learnhub_wishlist_courses"
};

// Auto-seed default student if none exists
(function initDefaultUser() {
    try {
        const existingUsers = localStorage.getItem(AUTH_KEYS.USERS);
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
            localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(defaultUsers));
        }
    } catch (e) {}
})();

// Get logged in user object or null
function getCurrentUser() {
    try {
        const user = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
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
    const users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || "[]");
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);

    if (user) {
        const sessionData = {
            name: user.name,
            email: user.email,
            joinedDate: user.joinedDate || "Recent",
            avatar: user.avatar || "🎓"
        };
        localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(sessionData));
        return { success: true, user: sessionData };
    } else {
        return { success: false, message: "Invalid email or password. Hint: alex@learnhub.edu / password123" };
    }
}

// Demo Registration - Guaranteed to always start 100% FRESH
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || "[]");
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
    localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

    // Explicitly initialize 100% Fresh State for the new student
    const safeEmail = emailLower.replace(/[^a-z0-9]/g, '_');
    localStorage.setItem(`${AUTH_KEYS.ENROLLED}_${safeEmail}`, JSON.stringify([]));
    localStorage.setItem(`${AUTH_KEYS.PROGRESS}_${safeEmail}`, JSON.stringify({}));
    localStorage.setItem(`${AUTH_KEYS.WISHLIST}_${safeEmail}`, JSON.stringify([]));

    return { success: true, message: "Registration successful! You have a fresh new account." };
}

// Logout
function logoutUser() {
    localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
    window.location.reload();
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
