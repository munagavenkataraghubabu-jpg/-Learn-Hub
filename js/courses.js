/**
 * LearnHub - Central Course Data Repository
 * Contains 10 courses with complete curriculums, lesson metadata, and LocalStorage helpers.
 */

const COURSES_DATA = [
    {
        id: 1,
        title: "Introduction to HTML",
        category: "html",
        badge: "HTML5",
        badgeColor: "bg-danger",
        description: "Master the foundational markup language of the web. Learn elements, tags, document structure, semantic markup, forms, and multimedia integration.",
        instructor: "Dr. Sarah Mitchell",
        instructorTitle: "Senior Web Architect & Educator",
        duration: "4 Hours",
        level: "Beginner",
        price: "Free",
        rating: 4.9,
        reviewsCount: 1420,
        enrolledCount: 8450,
        image: "assets/images/html-course.svg",
        objectives: [
            "Understand HTML document skeleton and syntax",
            "Use semantic tags (<header>, <nav>, <main>, <article>, <footer>)",
            "Build accessible forms with proper inputs and validation",
            "Embed images, audio, video, and hyperlinks seamlessly",
            "Follow W3C web accessibility guidelines (a11y)"
        ],
        lessons: [
            {
                id: 1,
                title: "1. Welcome & Web Fundamentals",
                duration: "15 min",
                summary: "How browsers parse HTML, the client-server relationship, and setting up VS Code.",
                content: `<h3>Welcome to HTML Fundamentals</h3>
                <p>HTML (HyperText Markup Language) is the structural backbone of every website on the Internet. It tells the browser what content to display and how that content is hierarchically organized.</p>
                <div class="alert alert-info"><strong>Key Takeaway:</strong> HTML provides the meaning and structure, CSS provides the visual presentation, and JavaScript powers interactive behavior.</div>
                <h4>Basic Document Structure</h4>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>`
            },
            {
                id: 2,
                title: "2. Headings, Paragraphs & Text Formatting",
                duration: "25 min",
                summary: "Structuring text content using h1 through h6 tags, paragraphs, and typographic semantics.",
                content: `<h3>Text Semantics & Hierarchy</h3>
                <p>Never choose a heading tag based on how big you want the text to look. Choose headings based on document hierarchy: <code>&lt;h1&gt;</code> represents the primary page title, followed by <code>&lt;h2&gt;</code> for sections, down to <code>&lt;h6&gt;</code>.</p>
                <h4>Formatting Tags</h4>
                <ul>
                    <li><code>&lt;strong&gt;</code>: Indicates serious importance or urgency (typically bold).</li>
                    <li><code>&lt;em&gt;</code>: Indicates stress emphasis that changes verbal meaning (typically italicized).</li>
                    <li><code>&lt;p&gt;</code>: Structural paragraph blocks.</li>
                </ul>`
            },
            {
                id: 3,
                title: "3. Hyperlinks & Navigation Structures",
                duration: "30 min",
                summary: "Deep dive into absolute, relative, and in-page anchor links with target attributes.",
                content: `<h3>Hyperlinks: The Web's Glue</h3>
                <p>The anchor element <code>&lt;a&gt;</code> connects users to external destinations, local files, and page jump anchors.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;!-- External link opening in a new tab securely --&gt;
&lt;a href="https://learnhub.org" target="_blank" rel="noopener noreferrer"&gt;Visit LearnHub&lt;/a&gt;

&lt;!-- In-page jump link --&gt;
&lt;a href="#curriculum"&gt;Jump to Course Curriculum&lt;/a&gt;</code></pre>`
            },
            {
                id: 4,
                title: "4. HTML5 Semantic Elements",
                duration: "35 min",
                summary: "Replacing generic divs with header, nav, main, section, article, aside, and footer.",
                content: `<h3>Why Semantic HTML Matters</h3>
                <p>Semantic tags describe their meaning to both developer and browser. They dramatically improve SEO, browser rendering, and screen-reader accessibility for visually impaired learners.</p>
                <div class="row g-3 my-3">
                    <div class="col-md-6"><div class="p-3 border rounded bg-light"><strong>&lt;header&gt;</strong>: Introductory content or site masthead</div></div>
                    <div class="col-md-6"><div class="p-3 border rounded bg-light"><strong>&lt;nav&gt;</strong>: Major navigation links</div></div>
                    <div class="col-md-6"><div class="p-3 border rounded bg-light"><strong>&lt;main&gt;</strong>: Dominant unique content of the body</div></div>
                    <div class="col-md-6"><div class="p-3 border rounded bg-light"><strong>&lt;footer&gt;</strong>: Author info, copyright, sitemap</div></div>
                </div>`
            },
            {
                id: 5,
                title: "5. Forms, Inputs & Accessibility",
                duration: "40 min",
                summary: "Constructing accessible forms with text inputs, emails, passwords, radio, and buttons.",
                content: `<h3>Building Accessible Forms</h3>
                <p>Every interactive input requires an associated <code>&lt;label&gt;</code> tag with matching <code>for</code> and <code>id</code> attributes.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;form action="/submit" method="post"&gt;
  &lt;label for="userEmail"&gt;Email Address:&lt;/label&gt;
  &lt;input type="email" id="userEmail" name="email" required placeholder="you@domain.com"&gt;
  &lt;button type="submit"&gt;Join LearnHub&lt;/button&gt;
&lt;/form&gt;</code></pre>`
            }
        ]
    },
    {
        id: 2,
        title: "Introduction to CSS",
        category: "css",
        badge: "CSS3",
        badgeColor: "bg-primary",
        description: "Transform raw HTML into visually stunning interfaces. Master selectors, specificity, inheritance, color theory, typography, and box model mechanics.",
        instructor: "Marcus Vance",
        instructorTitle: "UI/UX Designer & CSS Enthusiast",
        duration: "5.5 Hours",
        level: "Beginner",
        price: "$19",
        rating: 4.8,
        reviewsCount: 980,
        enrolledCount: 6200,
        image: "assets/images/css-course.svg",
        objectives: [
            "Write clean external stylesheets and understand the CSS cascade",
            "Master element, class, ID, descendant, and pseudo-class selectors",
            "Calculate CSS specificity and eliminate styling bugs",
            "Leverage the CSS Box Model (Margin, Border, Padding, Content)",
            "Style modern typography, linear & radial gradients, and borders"
        ],
        lessons: [
            {
                id: 1,
                title: "1. CSS Syntax & Stylesheet Integration",
                duration: "20 min",
                summary: "Inline, Internal, and External CSS styling paradigms.",
                content: `<h3>CSS Syntax & How Browsers Apply Rules</h3>
                <p>A CSS rule consists of a <strong>selector</strong> and a <strong>declaration block</strong> containing key-value pairs.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>/* Selector { Property: Value; } */
h1 {
  color: #3b82f6;
  font-size: 2.5rem;
  font-family: 'Inter', sans-serif;
}</code></pre>`
            },
            {
                id: 2,
                title: "2. The CSS Box Model Deep Dive",
                duration: "30 min",
                summary: "Understanding Content, Padding, Border, Margin, and box-sizing: border-box.",
                content: `<h3>The Box Model: Core to Every Layout</h3>
                <p>Every element in CSS is a rectangular box made of four concentric layers:</p>
                <ol>
                    <li><strong>Content:</strong> The text, images, or child elements.</li>
                    <li><strong>Padding:</strong> Transparent buffer inside the border.</li>
                    <li><strong>Border:</strong> Outlining line wrapping padding and content.</li>
                    <li><strong>Margin:</strong> Space clearing the outside perimeter of the border.</li>
                </ol>
                <div class="alert alert-warning">Always use <code>box-sizing: border-box;</code> universally so padding doesn't balloon element width!</div>`
            },
            {
                id: 3,
                title: "3. CSS Specificity & Cascade Rules",
                duration: "35 min",
                summary: "Calculating selector weights: Inline (1000) > ID (100) > Class (10) > Element (1).",
                content: `<h3>Mastering Specificity</h3>
                <p>When multiple CSS rules conflict on the same element, specificity decides the winner:</p>
                <ul>
                    <li><code>#primary-btn</code> has weight (0,1,0,0)</li>
                    <li><code>.btn.btn-active</code> has weight (0,0,2,0)</li>
                    <li><code>button</code> has weight (0,0,0,1)</li>
                </ul>`
            },
            {
                id: 4,
                title: "4. Colors, Gradients & Shadows",
                duration: "25 min",
                summary: "Working with HEX, RGB, HSL, linear-gradient, and box-shadow.",
                content: `<h3>Rich Aesthetics with Gradients & Shadows</h3>
                <p>Gradients blend multiple colors smoothly across directional vectors or radial origins.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>.card-gradient {
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.3);
}</code></pre>`
            }
        ]
    },
    {
        id: 3,
        title: "Bootstrap for Beginners",
        category: "bootstrap",
        badge: "Bootstrap 5",
        badgeColor: "bg-purple",
        description: "Speed up your web development workflow with the world's most popular responsive front-end framework. Learn containers, the 12-column grid, navbar, cards, and modal components.",
        instructor: "Elena Rostova",
        instructorTitle: "Lead Frontend Engineer at DevCloud",
        duration: "6 Hours",
        level: "Beginner",
        price: "$29",
        rating: 4.9,
        reviewsCount: 1650,
        enrolledCount: 9100,
        image: "assets/images/bootstrap-course.svg",
        objectives: [
            "Link Bootstrap 5 via CDN and utilize utility classes",
            "Master the 12-column responsive grid system (col-12, col-md-6, col-lg-4)",
            "Build responsive navbars with mobile hamburger toggles",
            "Use Bootstrap cards, buttons, badges, modals, and alerts",
            "Customize spacing with m-* and p-* box model helpers"
        ],
        lessons: [
            {
                id: 1,
                title: "1. Bootstrap 5 Setup & Core Architecture",
                duration: "20 min",
                summary: "Linking CSS and JS bundles, viewport requirements, and container types.",
                content: `<h3>Getting Started with Bootstrap 5</h3>
                <p>Bootstrap 5 provides ready-to-use HTML, CSS, and JS components without requiring jQuery. Containers are the most basic layout element in Bootstrap.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;!-- Bootstrap 5 CDN Link --&gt;
&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</code></pre>`
            },
            {
                id: 2,
                title: "2. The 12-Column Grid System",
                duration: "35 min",
                summary: "Rows, columns, gutters, and responsive breakpoints (sm, md, lg, xl, xxl).",
                content: `<h3>Understanding the 12-Column Grid</h3>
                <p>Bootstrap divides every row into 12 proportional columns. You assign how many columns an element spans across device viewports:</p>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;div class="row g-4"&gt;
  &lt;div class="col-12 col-md-6 col-lg-4"&gt;Card 1&lt;/div&gt;
  &lt;div class="col-12 col-md-6 col-lg-4"&gt;Card 2&lt;/div&gt;
  &lt;div class="col-12 col-md-12 col-lg-4"&gt;Card 3&lt;/div&gt;
&lt;/div&gt;</code></pre>`
            },
            {
                id: 3,
                title: "3. Responsive Navbar & Components",
                duration: "40 min",
                summary: "Navbar toggler, dropdowns, cards, badges, and utility buttons.",
                content: `<h3>Building Navigation with Bootstrap</h3>
                <p>The <code>.navbar-expand-*</code> class dictates at which breakpoint the navigation expands into a horizontal desktop bar or collapses into a mobile hamburger menu.</p>`
            }
        ]
    },
    {
        id: 4,
        title: "Responsive Web Design",
        category: "css",
        badge: "RWD",
        badgeColor: "bg-success",
        description: "Design websites that look and perform impeccably on smartphones, tablets, laptops, and 4K desktop screens. Learn fluid viewports, media queries, and mobile-first methodologies.",
        instructor: "Alex Chen",
        instructorTitle: "Senior Responsive Design Consultant",
        duration: "5 Hours",
        level: "Intermediate",
        price: "Free",
        rating: 4.9,
        reviewsCount: 820,
        enrolledCount: 5400,
        image: "assets/images/responsive-course.svg",
        objectives: [
            "Configure mobile viewports with meta viewport tags",
            "Write custom CSS media queries for phone, tablet, and desktop",
            "Implement fluid typography using clamp(), rem, and vw units",
            "Create responsive images with max-width: 100% and srcset",
            "Audit websites for responsive viewport compliance"
        ],
        lessons: [
            {
                id: 1,
                title: "1. The Mobile-First Mindset",
                duration: "25 min",
                summary: "Why designing for mobile first creates cleaner, faster web experiences.",
                content: `<h3>Mobile-First Responsive Web Design</h3>
                <p>Mobile-first design means writing base styles for small screens without media queries, then progressively layering complexity using <code>min-width</code> queries as the screen expands.</p>`
            },
            {
                id: 2,
                title: "2. CSS Media Queries Masterclass",
                duration: "35 min",
                summary: "Standard breakpoint conventions (576px, 768px, 992px, 1200px).",
                content: `<h3>Crafting Media Queries</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>/* Base Mobile: 1 column */
.course-grid { display: flex; flex-direction: column; }

/* Tablet (min-width: 768px) */
@media (min-width: 768px) {
  .course-grid { flex-direction: row; flex-wrap: wrap; }
}</code></pre>`
            }
        ]
    },
    {
        id: 5,
        title: "CSS Flexbox",
        category: "css",
        badge: "Flexbox",
        badgeColor: "bg-info text-dark",
        description: "Master 1-dimensional layouts. Align, distribute, and space interface components effortlessly without floats or clearfixes.",
        instructor: "David Miller",
        instructorTitle: "Author of Modern CSS Mastery",
        duration: "4.5 Hours",
        level: "Beginner",
        price: "$25",
        rating: 4.8,
        reviewsCount: 1100,
        enrolledCount: 7800,
        image: "assets/images/flexbox-course.svg",
        objectives: [
            "Understand Main Axis vs Cross Axis alignment",
            "Use justify-content, align-items, and align-content",
            "Control item expansion with flex-grow, flex-shrink, and flex-basis",
            "Create responsive wrap layouts with gap property",
            "Build real navigation bars, card rows, and centering solutions"
        ],
        lessons: [
            {
                id: 1,
                title: "1. The Flex Container & Axes",
                duration: "20 min",
                summary: "display: flex, flex-direction: row vs column, and axis fundamentals.",
                content: `<h3>Flex Container Basics</h3>
                <p>Declaring <code>display: flex</code> transforms the parent into a flex container and all direct children into flex items. Items align along the primary main axis.</p>`
            },
            {
                id: 2,
                title: "2. Alignment & Spacing: justify-content & align-items",
                duration: "30 min",
                summary: "Center, space-between, space-around, space-evenly, and gap.",
                content: `<h3>Centering Made Trivial</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>.hero-center {
  display: flex;
  justify-content: center; /* Main axis center */
  align-items: center;     /* Cross axis center */
  gap: 1.5rem;
}</code></pre>`
            },
            {
                id: 3,
                title: "3. Flex Item Sizing: grow, shrink, and basis",
                duration: "35 min",
                summary: "flex: 1 1 auto, flex-grow ratios, and responsive wrapping.",
                content: `<h3>Flexbox Sizing Mechanics</h3>
                <p><code>flex-grow: 1</code> instructs an item to consume leftover space, while <code>flex-grow: 2</code> consumes double the leftover space relative to its siblings.</p>`
            }
        ]
    },
    {
        id: 6,
        title: "CSS Grid",
        category: "css",
        badge: "CSS Grid",
        badgeColor: "bg-dark",
        description: "Harness the power of 2-dimensional layouts in CSS. Construct complex magazine, dashboard, and gallery layouts with columns and rows simultaneously.",
        instructor: "Rachel Green",
        instructorTitle: "Frontend Architect & W3C Contributor",
        duration: "6 Hours",
        level: "Intermediate",
        price: "$35",
        rating: 4.9,
        reviewsCount: 1340,
        enrolledCount: 6900,
        image: "assets/images/grid-course.svg",
        objectives: [
            "Master grid-template-columns, grid-template-rows, and the fr unit",
            "Use repeat() and minmax() for ultra-flexible auto-fit layouts",
            "Position items with grid-column, grid-row, and span",
            "Design full application layouts using grid-template-areas",
            "Compare when to use CSS Grid vs CSS Flexbox"
        ],
        lessons: [
            {
                id: 1,
                title: "1. Grid Container & Fractional Units (fr)",
                duration: "25 min",
                summary: "Defining columns, rows, and gaps using modern fr units.",
                content: `<h3>The Power of 2D Layouts</h3>
                <p>Unlike Flexbox which operates in 1 dimension at a time, CSS Grid positions items along rows AND columns at the exact same moment.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>.dashboard {
  display: grid;
  grid-template-columns: 260px 1fr 1fr;
  gap: 1.5rem;
}</code></pre>`
            },
            {
                id: 2,
                title: "2. Responsive Grids with minmax & auto-fit",
                duration: "30 min",
                summary: "Building fully responsive grids without writing a single media query.",
                content: `<h3>Zero-Media-Query Responsive Grids</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>.course-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}</code></pre>`
            },
            {
                id: 3,
                title: "3. Layout Composition with grid-template-areas",
                duration: "40 min",
                summary: "Naming visual regions: 'header header' 'sidebar main' 'footer footer'.",
                content: `<h3>Visual Layouts with Named Areas</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>.app-shell {
  display: grid;
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer";
  grid-template-columns: 240px 1fr;
}</code></pre>`
            }
        ]
    },
    {
        id: 7,
        title: "JavaScript Fundamentals",
        category: "javascript",
        badge: "JavaScript",
        badgeColor: "bg-warning text-dark",
        description: "Bring web pages to life with client-side interactivity. Learn modern ES6 syntax, variables, DOM manipulation, events, functions, arrays, and LocalStorage.",
        instructor: "Samira Patel",
        instructorTitle: "Principal JavaScript Engineer",
        duration: "8 Hours",
        level: "Beginner",
        price: "$39",
        rating: 4.9,
        reviewsCount: 2100,
        enrolledCount: 11500,
        image: "assets/images/javascript-course.svg",
        objectives: [
            "Write clean ES6+ JavaScript (const, let, arrow functions, template literals)",
            "Manipulate the DOM dynamically using querySelector and innerHTML",
            "Handle user events (clicks, submits, input changes)",
            "Store and retrieve data persistently using window.localStorage",
            "Validate frontend forms and render dynamic UI cards"
        ],
        lessons: [
            {
                id: 1,
                title: "1. JavaScript Variables, Types & Syntax",
                duration: "30 min",
                summary: "let vs const, strings, numbers, booleans, and objects.",
                content: `<h3>Modern JavaScript Syntax</h3>
                <p>JavaScript runs natively in every modern web browser. It allows you to manipulate elements, respond to user actions, and store state locally.</p>`
            },
            {
                id: 2,
                title: "2. DOM Manipulation & Event Listeners",
                duration: "45 min",
                summary: "Selecting elements, adding event listeners, and updating classes.",
                content: `<h3>Interacting with the Web Page</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>const enrollBtn = document.querySelector("#enrollBtn");
enrollBtn.addEventListener("click", () => {
  alert("Enrollment successful!");
});</code></pre>`
            },
            {
                id: 3,
                title: "3. LocalStorage Data Persistence",
                duration: "35 min",
                summary: "Saving, reading, and serializing JSON objects across browser sessions.",
                content: `<h3>Persistent Client-Side Storage</h3>
                <p>LocalStorage saves key-value string pairs directly inside the user's browser, persisting even after the page is refreshed.</p>
                <pre class="bg-dark text-light p-3 rounded"><code>// Storing user data
localStorage.setItem("user", JSON.stringify({ name: "Alex", progress: 85 }));

// Reading user data
const user = JSON.parse(localStorage.getItem("user"));</code></pre>`
            }
        ]
    },
    {
        id: 8,
        title: "Tailwind CSS",
        category: "tailwind",
        badge: "Tailwind CSS",
        badgeColor: "bg-teal",
        description: "Speed up UI development without writing raw CSS rules. Master utility-first design tokens, responsive breakpoints, flex, grid, and hover transitions.",
        instructor: "Liam O'Connor",
        instructorTitle: "Design System Lead & Tailwind Evangelist",
        duration: "5 Hours",
        level: "Intermediate",
        price: "$29",
        rating: 4.8,
        reviewsCount: 750,
        enrolledCount: 4800,
        image: "assets/images/tailwind-course.svg",
        objectives: [
            "Understand the utility-first CSS design philosophy",
            "Build responsive layouts using sm:, md:, lg:, and xl: prefixes",
            "Style modern typography, colors, shadows, and borders",
            "Compose flexbox and grid components without custom CSS classes",
            "Implement smooth hover and focus transitions"
        ],
        lessons: [
            {
                id: 1,
                title: "1. The Utility-First Philosophy",
                duration: "25 min",
                summary: "Why utility classes speed up development and eliminate CSS bloat.",
                content: `<h3>Why Tailwind CSS?</h3>
                <p>Rather than authoring opinionated semantic class names like <code>.user-card</code>, Tailwind provides tiny atomic utility classes like <code>bg-white p-6 rounded-xl shadow-md</code>.</p>`
            },
            {
                id: 2,
                title: "2. Responsive Prefixes: sm, md, lg",
                duration: "30 min",
                summary: "Mobile-first responsive design using Tailwind's breakpoint prefixes.",
                content: `<h3>Mobile-First in Tailwind</h3>
                <pre class="bg-dark text-light p-3 rounded"><code>&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"&gt;
  &lt;!-- 1 col on mobile, 2 on tablet, 4 on desktop --&gt;
&lt;/div&gt;</code></pre>`
            }
        ]
    },
    {
        id: 9,
        title: "Frontend Development",
        category: "frontend",
        badge: "Full Frontend",
        badgeColor: "bg-indigo",
        description: "Synthesize HTML5, CSS3, Bootstrap 5, Flexbox, and JavaScript into full production-grade web applications with seamless client-side state.",
        instructor: "Dr. Sarah Mitchell",
        instructorTitle: "Senior Web Architect & Educator",
        duration: "10 Hours",
        level: "Intermediate",
        price: "$49",
        rating: 5.0,
        reviewsCount: 3100,
        enrolledCount: 14200,
        image: "assets/images/frontend-course.svg",
        objectives: [
            "Architect cohesive multi-page web applications with persistent state",
            "Bridge UI frameworks with vanilla JavaScript interactivity",
            "Implement client-side authentication and route protection",
            "Calculate course completion metrics and student analytics",
            "Deploy responsive, high-performance web applications"
        ],
        lessons: [
            {
                id: 1,
                title: "1. Application Architecture & Multi-Page State",
                duration: "40 min",
                summary: "Structuring multi-page SPAs and traditional websites with LocalStorage.",
                content: `<h3>Multi-Page Web Architecture</h3>
                <p>A great frontend application shares consistent navigation, centralized data stores, and synchronized state across distinct HTML documents.</p>`
            },
            {
                id: 2,
                title: "2. State Management with LocalStorage",
                duration: "45 min",
                summary: "Synchronizing enrolled courses, completed lessons, and user accounts.",
                content: `<h3>Client-Side State Synchronization</h3>
                <p>Learn how LearnHub saves enrolled courses, lesson progress, and wishlist data into a single source of truth in LocalStorage.</p>`
            }
        ]
    },
    {
        id: 10,
        title: "Web Design Fundamentals",
        category: "css",
        badge: "UI/UX Design",
        badgeColor: "bg-secondary",
        description: "Learn essential visual design principles: typographic hierarchy, color contrast, whitespace, visual weight, and accessible user experience patterns.",
        instructor: "Marcus Vance",
        instructorTitle: "UI/UX Designer & CSS Enthusiast",
        duration: "4 Hours",
        level: "Beginner",
        price: "Free",
        rating: 4.7,
        reviewsCount: 650,
        enrolledCount: 4900,
        image: "assets/images/webdesign-course.svg",
        objectives: [
            "Apply the 60-30-10 color rule for balanced visual interfaces",
            "Establish clear typographic scales with proper line heights",
            "Leverage negative whitespace to reduce cognitive load",
            "Design intuitive affordances and accessible buttons",
            "Create accessible color contrasts conforming to WCAG AA"
        ],
        lessons: [
            {
                id: 1,
                title: "1. Typography, Scale & Readability",
                duration: "25 min",
                summary: "Font pairings, typographic scales, line heights, and letter spacing.",
                content: `<h3>Typography: 90% of Web Design</h3>
                <p>Good typography guides the user's eye effortlessly. Use high-contrast headings, readable body text (16px+), and adequate line height (1.5 - 1.7).</p>`
            },
            {
                id: 2,
                title: "2. Color Theory & Visual Hierarchy",
                duration: "30 min",
                summary: "The 60-30-10 rule, primary brand accents, and accessible contrast ratios.",
                content: `<h3>Color Theory for Developers</h3>
                <p>Use 60% dominant neutral background, 30% structural secondary, and 10% high-contrast accent color for calls to action.</p>`
            }
        ]
    }
];

// =============================================================================
// LOCALSTORAGE HELPER FUNCTIONS
// =============================================================================

const STORAGE_KEYS = {
    ENROLLED: "learnhub_enrolled_courses",
    PROGRESS: "learnhub_course_progress",
    WISHLIST: "learnhub_wishlist_courses",
    CURRENT_USER: "learnhub_current_user",
    USERS: "learnhub_registered_users",
    CONTACT_MESSAGES: "learnhub_contact_messages"
};

// Return all courses
function getAllCourses() {
    return COURSES_DATA;
}

// Return single course by ID
function getCourseById(id) {
    const numId = parseInt(id, 10);
    return COURSES_DATA.find(course => course.id === numId) || null;
}

// Return filtered courses by category and search keyword
function filterCourses(category = "all", searchQuery = "") {
    return COURSES_DATA.filter(course => {
        const matchesCategory = (category === "all" || course.category.toLowerCase() === category.toLowerCase());
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = query === "" || 
            course.title.toLowerCase().includes(query) || 
            course.description.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });
}

// Get array of enrolled course IDs
function getEnrolledCourseIds() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.ENROLLED);
        return stored ? JSON.parse(stored) : [1, 3]; // Default seed with courses 1 & 3 for demo
    } catch (e) {
        return [1, 3];
    }
}

// Enroll in course
function enrollInCourse(courseId) {
    const id = parseInt(courseId, 10);
    const enrolled = getEnrolledCourseIds();
    if (!enrolled.includes(id)) {
        enrolled.push(id);
        localStorage.setItem(STORAGE_KEYS.ENROLLED, JSON.stringify(enrolled));
    }
    return true;
}

// Check if user is enrolled
function isEnrolled(courseId) {
    const id = parseInt(courseId, 10);
    return getEnrolledCourseIds().includes(id);
}

// Get Wishlist course IDs
function getWishlistCourseIds() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        return stored ? JSON.parse(stored) : [2, 7]; // Default seed with courses 2 & 7
    } catch (e) {
        return [2, 7];
    }
}

// Toggle Wishlist
function toggleWishlist(courseId) {
    const id = parseInt(courseId, 10);
    let wishlist = getWishlistCourseIds();
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    return wishlist.includes(id);
}

function isWishlisted(courseId) {
    const id = parseInt(courseId, 10);
    return getWishlistCourseIds().includes(id);
}

// Get completed lessons map: { courseId: [lessonId1, lessonId2] }
function getCompletedLessonsMap() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return stored ? JSON.parse(stored) : { "1": [1, 2], "3": [1] }; // Default demo progress
    } catch (e) {
        return { "1": [1, 2], "3": [1] };
    }
}

// Mark lesson completed
function markLessonComplete(courseId, lessonId) {
    const cId = courseId.toString();
    const lId = parseInt(lessonId, 10);
    const map = getCompletedLessonsMap();
    if (!map[cId]) {
        map[cId] = [];
    }
    if (!map[cId].includes(lId)) {
        map[cId].push(lId);
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(map));
    }
    return map[cId];
}

// Check if lesson is completed
function isLessonCompleted(courseId, lessonId) {
    const cId = courseId.toString();
    const lId = parseInt(lessonId, 10);
    const map = getCompletedLessonsMap();
    return map[cId] ? map[cId].includes(lId) : false;
}

// Calculate course completion percentage (0 - 100)
function calculateCourseProgress(courseId) {
    const course = getCourseById(courseId);
    if (!course || !course.lessons || course.lessons.length === 0) return 0;
    const map = getCompletedLessonsMap();
    const completedList = map[courseId.toString()] || [];
    return Math.round((completedList.length / course.lessons.length) * 100);
}
