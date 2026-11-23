/**
 * LearnHub - Interactive Learning Desk Controller
 * Controls lesson rendering, dynamic video/content, next/previous navigation,
 * mark-completed toggle, progress updates, and LocalStorage synchronization.
 */

let activeCourse = null;
let activeLessonIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Route protection: requires login
    requireAuth();

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get("courseId") || 1, 10);
    const lessonId = parseInt(params.get("lessonId") || 1, 10);

    // Make sure student is enrolled (auto-enroll for demo convenience if needed)
    if (!isEnrolled(courseId)) {
        enrollInCourse(courseId);
    }

    activeCourse = getCourseById(courseId);
    if (!activeCourse) {
        window.location.href = "courses.html";
        return;
    }

    // Find initial lesson index
    const foundIndex = activeCourse.lessons.findIndex(l => l.id === lessonId);
    activeLessonIndex = foundIndex !== -1 ? foundIndex : 0;

    initLearningDesk();
});

function initLearningDesk() {
    // 1. Update Course Title & Breadcrumbs
    const titleEl = document.getElementById("learnCourseTitle");
    if (titleEl) titleEl.textContent = activeCourse.title;

    document.title = `Learning: ${activeCourse.title} | LearnHub`;

    // 2. Render Lesson Sidebar
    renderLessonSidebar();

    // 3. Render Active Lesson
    renderActiveLesson();

    // 4. Update Course Progress Bar
    updateLearningProgressBar();
}

// Render Sidebar List of Lessons
function renderLessonSidebar() {
    const sidebarEl = document.getElementById("lessonSidebarList");
    if (!sidebarEl) return;

    sidebarEl.innerHTML = activeCourse.lessons.map((lesson, index) => {
        const isCurrent = index === activeLessonIndex;
        const isDone = isLessonCompleted(activeCourse.id, lesson.id);

        return `
            <div class="lesson-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}" onclick="selectLesson(${index})">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi ${isDone ? 'bi-check-circle-fill text-success' : 'bi-circle text-muted'} lesson-check"></i>
                    <span class="small">${lesson.title}</span>
                </div>
                <span class="badge bg-light text-muted border" style="font-size: 0.75rem;">${lesson.duration}</span>
            </div>
        `;
    }).join("");
}

// Select lesson by index
function selectLesson(index) {
    if (index >= 0 && index < activeCourse.lessons.length) {
        activeLessonIndex = index;
        renderLessonSidebar();
        renderActiveLesson();
    }
}

// Render Active Lesson Content
function renderActiveLesson() {
    const lesson = activeCourse.lessons[activeLessonIndex];
    if (!lesson) return;

    // Lesson Header
    const currentTitleEl = document.getElementById("currentLessonTitle");
    if (currentTitleEl) currentTitleEl.textContent = lesson.title;

    const currentDurationEl = document.getElementById("currentLessonDuration");
    if (currentDurationEl) currentDurationEl.textContent = lesson.duration;

    // Body content
    const contentEl = document.getElementById("lessonContentBody");
    if (contentEl) {
        contentEl.innerHTML = lesson.content || `<p>${lesson.summary}</p>`;
    }

    // Mark completed button state
    const isDone = isLessonCompleted(activeCourse.id, lesson.id);
    const markBtn = document.getElementById("markCompletedBtn");
    if (markBtn) {
        if (isDone) {
            markBtn.className = "btn btn-outline-success fw-semibold";
            markBtn.innerHTML = `<i class="bi bi-check2-all me-1"></i>Completed`;
        } else {
            markBtn.className = "btn btn-success fw-semibold";
            markBtn.innerHTML = `<i class="bi bi-check-lg me-1"></i>Mark as Completed`;
        }
    }

    // Previous and Next button states
    const prevBtn = document.getElementById("prevLessonBtn");
    const nextBtn = document.getElementById("nextLessonBtn");

    if (prevBtn) {
        prevBtn.disabled = activeLessonIndex === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = activeLessonIndex === activeCourse.lessons.length - 1;
    }
}

// Toggle Mark Lesson Completed
function toggleCurrentLessonCompleted() {
    const lesson = activeCourse.lessons[activeLessonIndex];
    if (!lesson) return;

    markLessonComplete(activeCourse.id, lesson.id);
    showToast(`Marked "${lesson.title}" as completed!`, "success");

    renderLessonSidebar();
    renderActiveLesson();
    updateLearningProgressBar();
}

// Next Lesson Handler
function navigateNextLesson() {
    if (activeLessonIndex < activeCourse.lessons.length - 1) {
        selectLesson(activeLessonIndex + 1);
    }
}

// Previous Lesson Handler
function navigatePrevLesson() {
    if (activeLessonIndex > 0) {
        selectLesson(activeLessonIndex - 1);
    }
}

// Update Progress Bar
function updateLearningProgressBar() {
    const progress = calculateCourseProgress(activeCourse.id);
    const fillEl = document.getElementById("learnProgressFill");
    const textEl = document.getElementById("learnProgressText");

    if (fillEl) fillEl.style.width = `${progress}%`;
    if (textEl) textEl.textContent = `${progress}% Complete`;
}
