# LearnHub – Student Learning Portal (LMS)

LearnHub is a modern LMS that enables students to access courses, lessons, and academic resources through a simple digital platform. It supports self-paced learning, progress tracking, classroom activities, and student support, helping learners build knowledge, skills, and confidence effectively online.

Built with **HTML5, CSS3, Bootstrap 5, JavaScript (ES6), CSS Flexbox, CSS Grid, and Tailwind CSS**.

---

## 🎓 The Learning Portal Interface

The platform is designed as an interactive Learning Management System (LMS) with app navigation tabs:

1. **Dashboard:**
   - Active Unit Resume card with live progress bar
   - Metrics: Enrolled Courses, Completed Courses, Lessons Done, 5-Day Study Streak 🔥
   - Weekly Study Hours visual activity chart (built with CSS Flexbox)
   - Enrolled course progress cards and saved wishlist
2. **My Courses:**
   - Full student view of all active enrollments with progress bars and quick resume buttons
3. **Course Catalog (10 Courses):**
   - Live search input and category filter pills (`All`, `HTML`, `CSS`, `Bootstrap`, `JavaScript`, `Tailwind`)
   - Interactive Syllabus Details preview modal
4. **Study Desk / Classroom:**
   - Course switcher dropdown
   - Split-screen workspace (Lesson player on left, interactive curriculum checklist on right)
   - Live **"Mark as Completed"** button with real-time progress bar recalculation
   - Persistent `LocalStorage` synchronization
5. **Tailwind & Bootstrap Lab:**
   - Side-by-side component-first vs. utility-first interactive comparison workbench
6. **Faculty & About:**
   - Lead educators, curriculum roadmap, and topics checklist
7. **Student Support:**
   - Inquiry form with live validation and LocalStorage persistence

---

## 🚀 How to Run Locally

1. Open your terminal in this folder and start the server:
   ```powershell
   node server.js
   ```
2. Visit **`http://localhost:3000/`** in your browser.
3. Or simply double-click **`start.bat`** for instant one-click launch!
