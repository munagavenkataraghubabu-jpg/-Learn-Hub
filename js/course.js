/**
 * LearnHub - Course Listing & Course Details Controller
 * Handles course card rendering, real-time filtering, search, wishlist toggling, and enrollment.
 */

// Generate HTML markup for a single course card
function createCourseCardHTML(course) {
    const isEnr = isEnrolled(course.id);
    const isFav = isWishlisted(course.id);

    return `
        <div class="col">
            <div class="course-card relative-card">
                <span class="badge ${course.badgeColor} absolute-badge">${course.badge}</span>
                <div class="course-card-img-wrapper">
                    <img src="${course.image}" alt="${course.title}" loading="lazy">
                </div>
                <div class="course-card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-light text-dark border"><i class="bi bi-clock me-1 text-primary"></i>${course.duration}</span>
                        <span class="badge bg-light text-secondary border">${course.level}</span>
                    </div>
                    <h3 class="h5 fw-bold mb-2 text-dark">${course.title}</h3>
                    <p class="text-secondary small mb-3 flex-grow-1">${course.description}</p>
                    
                    <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-muted small"><i class="bi bi-person-circle me-1"></i>${course.instructor}</span>
                        </div>
                        <span class="fw-bold text-primary">${course.price}</span>
                    </div>
                </div>
                <div class="course-card-footer">
                    <button class="btn-wishlist ${isFav ? 'active' : ''}" onclick="handleWishlistClick(${course.id}, this)" title="Add to Wishlist" aria-label="Add to Wishlist">
                        <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <div class="d-flex gap-2">
                        <a href="course-details.html?id=${course.id}" class="btn btn-outline-secondary btn-sm px-3 fw-semibold">Details</a>
                        ${isEnr ? 
                            `<a href="learn.html?courseId=${course.id}" class="btn btn-success btn-sm px-3 fw-semibold"><i class="bi bi-play-circle me-1"></i>Resume</a>` : 
                            `<button class="btn btn-theme-primary btn-sm px-3 fw-semibold" onclick="handleEnrollClick(${course.id})">Enroll Now</button>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Course List inside container
function renderCoursesGrid(courses, containerId = "coursesGrid") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!courses || courses.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
                <h4 class="fw-bold text-dark">No courses match your criteria</h4>
                <p class="text-secondary">Try searching with a different keyword or resetting your filter.</p>
                <button class="btn btn-outline-primary btn-sm mt-2" onclick="resetFilters()">Reset All Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = courses.map(createCourseCardHTML).join("");
}

// Handle Wishlist Toggle
function handleWishlistClick(courseId, btnElement) {
    const active = toggleWishlist(courseId);
    if (btnElement) {
        btnElement.classList.toggle("active", active);
        const icon = btnElement.querySelector("i");
        if (icon) {
            icon.className = active ? "bi bi-heart-fill" : "bi bi-heart";
        }
    }
    showToast(active ? "Added to your wishlist!" : "Removed from wishlist.");
}

// Handle Direct Enrollment Click
function handleEnrollClick(courseId) {
    if (!isLoggedIn()) {
        showToast("Please login to enroll in courses.", "danger");
        setTimeout(() => {
            window.location.href = `login.html?redirect=courses.html`;
        }, 1200);
        return;
    }

    enrollInCourse(courseId);
    showToast("Congratulations! You are now enrolled.", "success");
    // Re-render grid if present
    const activeFilter = document.querySelector(".filter-pill.active")?.dataset.category || "all";
    const searchQuery = document.getElementById("courseSearchInput")?.value || "";
    renderCoursesGrid(filterCourses(activeFilter, searchQuery));
}

// Setup Courses Page Listeners (courses.html)
function initCoursesPage() {
    const searchInput = document.getElementById("courseSearchInput");
    const filterPills = document.querySelectorAll(".filter-pill");

    let currentCategory = "all";
    let currentSearch = "";

    function applyFilters() {
        const filtered = filterCourses(currentCategory, currentSearch);
        renderCoursesGrid(filtered);
        const countSpan = document.getElementById("resultsCount");
        if (countSpan) countSpan.textContent = `Showing ${filtered.length} courses`;
    }

    // Category pill clicks
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentCategory = pill.dataset.category || "all";
            applyFilters();
        });
    });

    // Real-time search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value;
            applyFilters();
        });
    }

    // Initial render
    applyFilters();
}

function resetFilters() {
    const searchInput = document.getElementById("courseSearchInput");
    if (searchInput) searchInput.value = "";
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    const allPill = document.querySelector(".filter-pill[data-category='all']");
    if (allPill) allPill.classList.add("active");
    renderCoursesGrid(getAllCourses());
}

// Setup Course Details Page (course-details.html)
function initCourseDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id") || 1;
    const course = getCourseById(courseId);

    if (!course) {
        document.getElementById("courseDetailsContainer").innerHTML = `
            <div class="text-center py-5">
                <h2>Course Not Found</h2>
                <a href="courses.html" class="btn btn-primary mt-3">Back to Courses</a>
            </div>
        `;
        return;
    }

    const isEnr = isEnrolled(course.id);
    const progress = calculateCourseProgress(course.id);

    // Update Page Titles and Breadcrumbs
    document.title = `${course.title} | LearnHub`;
    const titleEl = document.getElementById("detailTitle");
    if (titleEl) titleEl.textContent = course.title;

    const descEl = document.getElementById("detailDescription");
    if (descEl) descEl.textContent = course.description;

    const badgeEl = document.getElementById("detailBadge");
    if (badgeEl) {
        badgeEl.textContent = course.badge;
        badgeEl.className = `badge ${course.badgeColor} fs-6 px-3 py-2`;
    }

    const durationEl = document.getElementById("detailDuration");
    if (durationEl) durationEl.textContent = course.duration;

    const levelEl = document.getElementById("detailLevel");
    if (levelEl) levelEl.textContent = course.level;

    const instructorEl = document.getElementById("detailInstructor");
    if (instructorEl) instructorEl.textContent = course.instructor;

    const instructorTitleEl = document.getElementById("detailInstructorTitle");
    if (instructorTitleEl) instructorTitleEl.textContent = course.instructorTitle;

    const priceEl = document.getElementById("detailPrice");
    if (priceEl) priceEl.textContent = course.price;

    const imgEl = document.getElementById("detailImage");
    if (imgEl) imgEl.src = course.image;

    // Render Learning Objectives
    const objContainer = document.getElementById("detailObjectives");
    if (objContainer && course.objectives) {
        objContainer.innerHTML = course.objectives.map(obj => `
            <li class="d-flex align-items-start gap-2 mb-2">
                <i class="bi bi-check-circle-fill text-success fs-5"></i>
                <span class="text-secondary">${obj}</span>
            </li>
        `).join("");
    }

    // Render Curriculum Lessons
    const lessonsContainer = document.getElementById("detailCurriculum");
    if (lessonsContainer && course.lessons) {
        lessonsContainer.innerHTML = course.lessons.map((lesson, idx) => `
            <div class="accordion-item border mb-2 rounded-3 overflow-hidden">
                <h2 class="accordion-header" id="heading${lesson.id}">
                    <button class="accordion-button collapsed py-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${lesson.id}">
                        <div class="d-flex justify-content-between align-items-center w-100 me-3">
                            <span class="fw-semibold"><i class="bi bi-play-circle text-primary me-2"></i>${lesson.title}</span>
                            <span class="badge bg-light text-muted border">${lesson.duration}</span>
                        </div>
                    </button>
                </h2>
                <div id="collapse${lesson.id}" class="accordion-collapse collapse" data-bs-parent="#detailCurriculum">
                    <div class="accordion-body text-secondary small bg-light">
                        ${lesson.summary}
                    </div>
                </div>
            </div>
        `).join("");
    }

    // Render Action Button
    const actionContainer = document.getElementById("detailActionBtnContainer");
    if (actionContainer) {
        if (isEnr) {
            actionContainer.innerHTML = `
                <div class="mb-3">
                    <div class="d-flex justify-content-between small text-muted mb-1">
                        <span>Course Progress</span>
                        <strong class="text-dark">${progress}%</strong>
                    </div>
                    <div class="progress-bar-custom mb-3">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                <a href="learn.html?courseId=${course.id}" class="btn btn-success w-100 py-3 fw-bold fs-6 mb-2">
                    <i class="bi bi-play-fill fs-5 me-1"></i>Continue Learning
                </a>
            `;
        } else {
            actionContainer.innerHTML = `
                <button class="btn btn-theme-primary w-100 py-3 fw-bold fs-6 mb-2" onclick="handleDetailEnroll(${course.id})">
                    <i class="bi bi-check2-circle fs-5 me-1"></i>Enroll in This Course
                </button>
            `;
        }
    }
}

function handleDetailEnroll(courseId) {
    if (!isLoggedIn()) {
        showToast("Please login first to enroll.", "danger");
        setTimeout(() => {
            window.location.href = `login.html?redirect=course-details.html?id=${courseId}`;
        }, 1200);
        return;
    }
    enrollInCourse(courseId);
    showToast("Enrollment confirmed! Redirecting to study desk...", "success");
    setTimeout(() => {
        window.location.href = `learn.html?courseId=${courseId}`;
    }, 1000);
}
