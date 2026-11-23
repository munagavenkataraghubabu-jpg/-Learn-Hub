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

// -------------------------------------------------------------
// GOOGLE AUTHENTICATION INTEGRATION
// -------------------------------------------------------------

// Login with Google Profile
function loginWithGoogle(profile) {
    if (!profile || !profile.email) {
        return { success: false, message: "Invalid Google profile data." };
    }

    const emailLower = profile.email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || "[]");
    let existingUser = users.find(u => u.email.toLowerCase() === emailLower);

    if (!existingUser) {
        // Register new Google Student as 100% fresh account
        existingUser = {
            name: profile.name || "Google Student",
            email: emailLower,
            password: "GOOGLE_OAUTH_ACCOUNT",
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            avatar: profile.avatar || "🌐",
            provider: "google"
        };
        users.push(existingUser);
        localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

        // Initialize fresh isolated storage keys
        const safeEmail = emailLower.replace(/[^a-z0-9]/g, '_');
        localStorage.setItem(`${AUTH_KEYS.ENROLLED}_${safeEmail}`, JSON.stringify([]));
        localStorage.setItem(`${AUTH_KEYS.PROGRESS}_${safeEmail}`, JSON.stringify({}));
        localStorage.setItem(`${AUTH_KEYS.WISHLIST}_${safeEmail}`, JSON.stringify([]));
    }

    const sessionData = {
        name: existingUser.name,
        email: existingUser.email,
        joinedDate: existingUser.joinedDate || "Recent",
        avatar: profile.avatar || existingUser.avatar || "🌐",
        provider: "google"
    };

    localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(sessionData));
    return { success: true, user: sessionData };
}

// Official Google SVG G Logo
const GOOGLE_SVG_ICON = `
<svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.347 2.825.957 4.039l3.007-2.332z"/>
  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
</svg>`;

// Trigger Google Sign-In Flow
function triggerGoogleSignIn(onSuccessCallback) {
    // If Google Identity Services library is loaded and has active client
    if (window.google && window.google.accounts && window.google.accounts.id && window._googleClientId) {
        try {
            google.accounts.id.prompt();
            return;
        } catch (e) {}
    }
    // Launch Authentic Google Sign-In Account Chooser Modal
    showGoogleAuthModal(onSuccessCallback);
}

// Google Identity Services Credential Handler (JWT)
function handleGoogleCredentialResponse(response) {
    try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const payload = JSON.parse(jsonPayload);
        const res = loginWithGoogle({
            name: payload.name || "Google User",
            email: payload.email,
            avatar: payload.picture || "🌐"
        });

        if (res.success) {
            if (typeof showToast === "function") {
                showToast(`Signed in with Google as ${res.user.name}!`, "success");
            }
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    } catch (err) {
        console.error("Error processing Google credential:", err);
    }
}

// Inject and Show Authentic Google Sign-In Modal
function showGoogleAuthModal(onSuccessCallback) {
    let modalEl = document.getElementById("googleAuthModal");
    if (!modalEl) {
        modalEl = document.createElement("div");
        modalEl.id = "googleAuthModal";
        modalEl.className = "modal fade";
        modalEl.tabIndex = -1;
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.innerHTML = `
            <div class="modal-dialog modal-dialog-centered google-modal-dialog">
                <div class="modal-content google-modal-content">
                    <div id="googleProgressBar" class="google-progress-bar"></div>
                    <div class="modal-body p-4">
                        
                        <!-- Google Brand Header -->
                        <div class="text-center mb-3">
                            <div class="mb-2">${GOOGLE_SVG_ICON}</div>
                            <h2 class="h5 fw-semibold text-dark mb-1">Sign in with Google</h2>
                            <p class="text-secondary small mb-0">Choose an account to continue to <strong>LearnHub</strong></p>
                        </div>

                        <!-- Account List -->
                        <div id="googleAccountList" class="border rounded-3 p-1 mb-3 bg-white">
                            
                            <!-- Primary Detected Account -->
                            <div class="google-account-item" onclick="selectGoogleAccount('Munaga Venkata Raghu Babu', 'munagavenkataraghubabu@gmail.com', 'M')">
                                <div class="google-avatar bg-primary">M</div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <div class="fw-semibold text-dark small text-truncate">Munaga Venkata Raghu Babu</div>
                                    <div class="text-muted small text-truncate">munagavenkataraghubabu@gmail.com</div>
                                </div>
                            </div>

                            <!-- Secondary Demo Account -->
                            <div class="google-account-item" onclick="selectGoogleAccount('Alex Morgan', 'alex.morgan.student@gmail.com', 'A')">
                                <div class="google-avatar bg-success">A</div>
                                <div class="flex-grow-1 overflow-hidden">
                                    <div class="fw-semibold text-dark small text-truncate">Alex Morgan (Student)</div>
                                    <div class="text-muted small text-truncate">alex.morgan.student@gmail.com</div>
                                </div>
                            </div>

                            <!-- Custom Account Option -->
                            <div class="google-account-item" onclick="toggleGoogleCustomInput(true)">
                                <div class="google-avatar bg-secondary bg-opacity-25 text-dark"><i class="bi bi-person-plus-fill"></i></div>
                                <div class="flex-grow-1">
                                    <div class="fw-semibold text-dark small">Use another Google account</div>
                                </div>
                            </div>

                        </div>

                        <!-- Custom Google Account Input View (Hidden by default) -->
                        <div id="googleCustomInputView" class="d-none border rounded-3 p-3 mb-3 bg-light">
                            <h3 class="small fw-bold text-dark mb-2">Enter your Google Account</h3>
                            <div class="mb-2">
                                <input type="text" id="customGoogleName" class="form-control form-control-sm" placeholder="Your Full Name" value="Student">
                            </div>
                            <div class="mb-3">
                                <input type="email" id="customGoogleEmail" class="form-control form-control-sm" placeholder="yourname@gmail.com" required>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <button type="button" class="btn btn-link btn-sm text-secondary text-decoration-none p-0" onclick="toggleGoogleCustomInput(false)">&larr; Back to accounts</button>
                                <button type="button" class="btn btn-primary btn-sm px-3" onclick="submitCustomGoogleAccount()">Next</button>
                            </div>
                        </div>

                        <div class="google-footer-text text-center">
                            To continue, Google will share your name, email address, and profile picture with LearnHub. Review LearnHub's <a href="about.html" class="text-decoration-none">Privacy Policy</a> and <a href="about.html" class="text-decoration-none">Terms of Service</a>.
                        </div>

                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    }

    window._googleAuthCallback = onSuccessCallback;
    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}

// Toggle Custom Google Input View
function toggleGoogleCustomInput(show) {
    const list = document.getElementById("googleAccountList");
    const custom = document.getElementById("googleCustomInputView");
    if (show) {
        list.classList.add("d-none");
        custom.classList.remove("d-none");
        document.getElementById("customGoogleEmail").focus();
    } else {
        list.classList.remove("d-none");
        custom.classList.add("d-none");
    }
}

// Submit custom Google account entered by user
function submitCustomGoogleAccount() {
    const name = document.getElementById("customGoogleName").value.trim() || "Google Student";
    const email = document.getElementById("customGoogleEmail").value.trim();

    if (!email || !email.includes("@")) {
        alert("Please enter a valid Google email address.");
        return;
    }

    const firstLetter = name.charAt(0).toUpperCase() || "G";
    selectGoogleAccount(name, email, firstLetter);
}

// Select Google account and authenticate
function selectGoogleAccount(name, email, avatarInitial) {
    const progressBar = document.getElementById("googleProgressBar");
    if (progressBar) progressBar.classList.add("active");

    setTimeout(() => {
        const res = loginWithGoogle({
            name: name,
            email: email,
            avatar: avatarInitial || "G"
        });

        const modalEl = document.getElementById("googleAuthModal");
        if (modalEl) {
            const bsModal = bootstrap.Modal.getInstance(modalEl);
            if (bsModal) bsModal.hide();
        }

        if (res.success) {
            if (typeof showToast === "function") {
                showToast(`Signed in with Google as ${res.user.name}!`, "success");
            }
            if (typeof window._googleAuthCallback === "function") {
                window._googleAuthCallback(res.user);
            } else {
                // If on standalone login/signup page, redirect to index.html
                const currentPath = window.location.pathname.split("/").pop();
                if (currentPath === "login.html" || currentPath === "signup.html") {
                    window.location.href = "index.html";
                } else {
                    window.location.reload();
                }
            }
        }
    }, 450);
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

// Global Navbar Auth UI updater (for courses.html, about.html, contact.html, tailwind.html, etc.)
function updateNavbarAuthUI() {
    const navAuth = document.getElementById("navbarAuthActions");
    if (!navAuth) return;

    if (isLoggedIn()) {
        const user = getCurrentUser() || { name: "Student", email: "" };
        const initial = (user.name && user.name.charAt(0).toUpperCase()) || "S";
        const firstName = user.name ? user.name.split(" ")[0] : "Student";
        navAuth.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style="width: 34px; height: 34px; font-size: 0.85rem;">
                    ${initial}
                </span>
                <span class="small fw-semibold text-dark me-1 d-none d-sm-inline">${firstName}</span>
                <button class="btn btn-outline-danger btn-sm py-1 px-2" onclick="logoutUser()" title="Sign Out">
                    <i class="bi bi-box-arrow-right me-1"></i>Sign Out
                </button>
            </div>
        `;
    } else {
        navAuth.innerHTML = `
            <button type="button" class="btn btn-sm btn-outline-secondary me-2 d-flex align-items-center gap-1 shadow-sm" onclick="triggerGoogleSignIn(() => window.location.reload())">
                ${GOOGLE_SVG_ICON} <span class="d-none d-sm-inline">Google Sign In</span>
            </button>
            <a href="login.html" class="btn btn-outline-primary btn-sm px-3 fw-semibold me-2">Login</a>
            <a href="signup.html" class="btn btn-theme-primary btn-sm px-3 fw-semibold">Sign Up</a>
        `;
    }
}
