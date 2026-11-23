/**
 * LearnHub - Main Application Controller
 * Handles global toast notifications, active navigation highlights, and shared utilities.
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Update navigation auth state
    if (typeof updateNavbarAuthUI === "function") {
        updateNavbarAuthUI();
    }

    // 2. Set active nav link according to current page URL
    highlightActiveNavLink();

    // 3. Setup toast container
    createToastContainer();
});

// Highlight active navbar link
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active", "fw-bold", "text-primary");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
        }
    });
}

// Show animated Toast Notification
function showToast(message, type = "success") {
    let toast = document.querySelector(".learnhub-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "learnhub-toast";
        document.body.appendChild(toast);
    }

    const icon = type === "success" ? "bi-check-circle-fill text-success" : 
                 type === "danger" ? "bi-exclamation-triangle-fill text-danger" : 
                 "bi-info-circle-fill text-primary";

    toast.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <i class="bi ${icon} fs-4"></i>
            <div>
                <strong class="d-block mb-1 text-dark" style="font-size: 0.9rem;">${type === "success" ? "Success!" : "Notice"}</strong>
                <span class="text-secondary" style="font-size: 0.85rem;">${message}</span>
            </div>
        </div>
    `;

    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function createToastContainer() {
    if (!document.querySelector(".learnhub-toast")) {
        const toast = document.createElement("div");
        toast.className = "learnhub-toast";
        document.body.appendChild(toast);
    }
}
