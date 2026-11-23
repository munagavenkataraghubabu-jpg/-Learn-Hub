/**
 * LearnHub - Student Dashboard Controller
 * Populates student profile, enrolled courses, progress tracking, wishlist, and learning statistics.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Check authentication: redirect if guest
    requireAuth();

    // Populate student information
    populateDashboardData();
});

function populateDashboardData() {
    const user = getCurrentUser();
    if (!user) return;

    // 1. Welcome Message & Profile
    const studentNameEl = document.getElementById("studentName");
    if (studentNameEl) studentNameEl.textContent = user.name;

    const studentEmailEl = document.getElementById("studentEmail");
    if (studentEmailEl) studentEmailEl.textContent = user.email;

    const studentJoinedEl = document.getElementById("studentJoined");
    if (studentJoinedEl) studentJoinedEl.textContent = `Member since ${user.joinedDate || '2026'}`;

    // 2. Enrolled Courses
    const enrolledIds = getEnrolledCourseIds();
    const enrolledCourses = enrolledIds.map(id => getCourseById(id)).filter(Boolean);

    // Calculate overall stats
    let totalLessonsCompleted = 0;
    let completedCoursesCount = 0;

    enrolledCourses.forEach(c => {
        const p = calculateCourseProgress(c.id);
        if (p === 100) completedCoursesCount++;
        const map = getCompletedLessonsMap();
        const done = map[c.id.toString()] || [];
        totalLessonsCompleted += done.length;
    });

    const statEnrolledEl = document.getElementById("statEnrolledCount");
    if (statEnrolledEl) statEnrolledEl.textContent = enrolledCourses.length;

    const statCompletedEl = document.getElementById("statCompletedCount");
    if (statCompletedEl) statCompletedEl.textContent = completedCoursesCount;

    const statLessonsEl = document.getElementById("statLessonsCompleted");
    if (statLessonsEl) statLessonsEl.textContent = totalLessonsCompleted;

    // 3. Render Enrolled Courses Grid
    const enrolledContainer = document.getElementById("enrolledCoursesGrid");
    if (enrolledContainer) {
        if (enrolledCourses.length === 0) {
            enrolledContainer.innerHTML = `
                <div class="col-12 text-center py-5 bg-white rounded-3 border">
                    <i class="bi bi-mortarboard fs-1 text-muted d-block mb-2"></i>
                    <h5 class="fw-bold">No enrolled courses yet</h5>
                    <p class="text-muted small">Explore our catalog and start learning today!</p>
                    <a href="courses.html" class="btn btn-primary btn-sm px-4">Browse Courses</a>
                </div>
            `;
        } else {
            enrolledContainer.innerHTML = enrolledCourses.map(course => {
                const progress = calculateCourseProgress(course.id);
                const isFinished = progress === 100;

                return `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                            <div class="course-card-img-wrapper" style="height: 150px;">
                                <img src="${course.image}" alt="${course.title}">
                                <span class="badge ${course.badgeColor} absolute-badge">${course.badge}</span>
                            </div>
                            <div class="card-body p-4 d-flex flex-column">
                                <h5 class="card-title fw-bold mb-2 text-dark">${course.title}</h5>
                                <p class="card-text text-secondary small flex-grow-1">${course.instructor}</p>
                                
                                <div class="my-3">
                                    <div class="d-flex justify-content-between small text-muted mb-1">
                                        <span>Completion</span>
                                        <strong class="${isFinished ? 'text-success' : 'text-primary'}">${progress}%</strong>
                                    </div>
                                    <div class="progress-bar-custom">
                                        <div class="progress-fill ${isFinished ? 'bg-success' : ''}" style="width: ${progress}%"></div>
                                    </div>
                                </div>

                                <div class="d-flex gap-2 pt-2 border-top">
                                    <a href="learn.html?courseId=${course.id}" class="btn ${isFinished ? 'btn-outline-success' : 'btn-theme-primary'} btn-sm w-100 fw-semibold">
                                        <i class="bi ${isFinished ? 'bi-arrow-repeat' : 'bi-play-circle'} me-1"></i>${isFinished ? 'Review Lessons' : 'Continue Study'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
        }
    }

    // 4. Render Wishlist / Saved Courses
    const wishlistIds = getWishlistCourseIds();
    const wishlistCourses = wishlistIds.map(id => getCourseById(id)).filter(Boolean);
    const wishlistContainer = document.getElementById("wishlistContainer");
    
    if (wishlistContainer) {
        if (wishlistCourses.length === 0) {
            wishlistContainer.innerHTML = `<p class="text-muted small">No saved courses in your wishlist.</p>`;
        } else {
            wishlistContainer.innerHTML = wishlistCourses.map(c => `
                <div class="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${c.image}" alt="${c.title}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;">
                        <div>
                            <h6 class="mb-0 fw-semibold text-dark">${c.title}</h6>
                            <small class="text-muted">${c.duration} • ${c.level}</small>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <a href="course-details.html?id=${c.id}" class="btn btn-outline-primary btn-sm">View</a>
                        <button class="btn btn-outline-danger btn-sm" onclick="removeWishlistItem(${c.id})"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            `).join("");
        }
    }
}

function removeWishlistItem(id) {
    toggleWishlist(id);
    populateDashboardData();
    showToast("Removed from wishlist.");
}
