// ==========================================
// CAMPUSMATE - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// DATA
// ==========================================

let subjects = JSON.parse(
    localStorage.getItem("campusSubjects")
) || [
    {
        id: 1,
        name: "Web Development",
        progress: 85,
        icon: "🌐"
    },
    {
        id: 2,
        name: "Database Management",
        progress: 70,
        icon: "🗄️"
    },
    {
        id: 3,
        name: "Operating Systems",
        progress: 60,
        icon: "💻"
    }
];


let notes = JSON.parse(
    localStorage.getItem("campusNotes")
) || [
    {
        id: 1,
        title: "JavaScript Basics",
        content:
            "Variables, functions, arrays and objects.",
        date: "Today"
    },
    {
        id: 2,
        title: "SQL Commands",
        content:
            "SELECT, INSERT, UPDATE and DELETE.",
        date: "Yesterday"
    },
    {
        id: 3,
        title: "CSS Flexbox",
        content:
            "Flexbox properties and responsive layouts.",
        date: "3 days ago"
    }
];


let assignments = JSON.parse(
    localStorage.getItem("campusAssignments")
) || [
    {
        id: 1,
        title: "Database ER Diagram",
        subject: "Database Management",
        due: "Tomorrow",
        completed: false
    },
    {
        id: 2,
        title: "Portfolio Website",
        subject: "Web Development",
        due: "3 days",
        completed: false
    },
    {
        id: 3,
        title: "OS Process Scheduling",
        subject: "Operating Systems",
        due: "5 days",
        completed: false
    }
];


let expenses = JSON.parse(
    localStorage.getItem("campusExpenses")
) || [
    {
        id: 1,
        name: "Food",
        amount: 180,
        icon: "🍔",
        date: "Today"
    },
    {
        id: 2,
        name: "Transport",
        amount: 60,
        icon: "🚌",
        date: "Yesterday"
    },
    {
        id: 3,
        name: "Books",
        amount: 450,
        icon: "📚",
        date: "Sep 10"
    }
];


// ==========================================
// NAVIGATION
// ==========================================

const navLinks =
    document.querySelectorAll(".nav-link");

const pages =
    document.querySelectorAll(".page");

const pageTitle =
    document.getElementById("pageTitle");


const titles = {

    dashboard:
        "Good afternoon, Student 👋",

    subjects:
        "My Subjects 📚",

    notes:
        "My Notes 📝",

    assignments:
        "My Assignments ✅",

    timer:
        "Focus Timer ⏱️",

    expenses:
        "My Expenses 💰",

    settings:
        "Settings ⚙️"

};


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const pageName =
                this.dataset.page;

            openPage(pageName);

        }
    );

});


function openPage(pageName) {

    // Hide pages

    pages.forEach(page => {

        page.classList.add("hidden");

    });


    // Show selected page

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.remove(
            "hidden"
        );

    }


    // Active navigation

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.dataset.page === pageName
        ) {

            link.classList.add("active");

        }

    });


    // Change heading

    if (pageTitle && titles[pageName]) {

        pageTitle.textContent =
            titles[pageName];

    }


    // Render page data

    if (pageName === "subjects") {

        renderSubjects();

    }

    if (pageName === "notes") {

        renderNotes();

    }

    if (pageName === "assignments") {

        renderAssignments();

    }

    if (pageName === "expenses") {

        renderExpenses();

    }

}


// ==========================================
// CURRENT DATE
// ==========================================

const dateElement =
    document.getElementById(
        "currentDate"
    );


function updateDate() {

    const today =
        new Date();

    dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );

}


updateDate();


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const subjectCount =
        document.getElementById(
            "subjectCount"
        );

    const assignmentCount =
        document.getElementById(
            "assignmentCount"
        );

    const progressCount =
        document.getElementById(
            "progressCount"
        );


    if (subjectCount) {

        subjectCount.textContent =
            subjects.length;

    }


    if (assignmentCount) {

        assignmentCount.textContent =
            assignments.filter(
                assignment =>
                    !assignment.completed
            ).length;

    }


    if (progressCount) {

        if (subjects.length === 0) {

            progressCount.textContent =
                "0%";

        } else {

            const total =
                subjects.reduce(
                    (sum, subject) =>
                        sum + subject.progress,
                    0
                );

            const average =
                Math.round(
                    total / subjects.length
                );

            progressCount.textContent =
                `${average}%`;

        }

    }


    renderDashboardAssignments();

}


function renderDashboardAssignments() {

    const container =
        document.getElementById(
            "dashboardAssignments"
        );

    if (!container) {

        return;

    }


    const pending =
        assignments.filter(
            assignment =>
                !assignment.completed
        );


    if (pending.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                🎉 No pending assignments!
            </div>
        `;

        return;

    }


    container.innerHTML =
        pending
            .slice(0, 3)
            .map(
                assignment => `

                <div class="assignment">

                    <div>

                        <h3>
                            ${escapeHTML(
                                assignment.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                assignment.subject
                            )}
                        </p>

                    </div>

                    <span class="due">
                        ${escapeHTML(
                            assignment.due
                        )}
                    </span>

                </div>

            `
            )
            .join("");

}


// ==========================================
// STUDY BUTTON
// ==========================================

function startStudy() {

    openPage("timer");

    startTimer();

}


// ==========================================
// SUBJECTS
// ==========================================

function renderSubjects() {

    const subjectList =
        document.getElementById(
            "subjectList"
        );

    if (!subjectList) {

        return;

    }


    if (subjects.length === 0) {

        subjectList.innerHTML = `
            <div class="empty-state">
                📚 No subjects yet.
                Add your first subject!
            </div>
        `;

        return;

    }


    subjectList.innerHTML =
        subjects
            .map(
                subject => `

                <div class="subject-card">

                    <button
                        class="delete-subject"
                        onclick="deleteSubject(
                            ${subject.id}
                        )"
                    >
                        ×
                    </button>

                    <span>
                        ${subject.icon}
                    </span>

                    <h3>
                        ${escapeHTML(
                            subject.name
                        )}
                    </h3>

                    <p>
                        Progress:
                        ${subject.progress}%
                    </p>

                    <div class="progress">

                        <div
                            style="
                                width:
                                ${subject.progress}%;
                            "
                        ></div>

                    </div>

                </div>

            `
            )
            .join("");

}


function addSubject() {

    removeExistingForm(
        "subjectForm"
    );


    const form =
        document.createElement(
            "div"
        );

    form.className =
        "subject-form";

    form.id =
        "subjectForm";


    form.innerHTML = `

        <h3>
            ➕ Add New Subject
        </h3>

        <div class="form-group">

            <label>
                Subject Name
            </label>

            <input
                type="text"
                id="subjectName"
                placeholder="e.g. JavaScript"
            >

        </div>


        <div class="form-group">

            <label>
                Progress
            </label>

            <input
                type="number"
                id="subjectProgress"
                placeholder="0 - 100"
                min="0"
                max="100"
            >

        </div>


        <div class="form-group">

            <label>
                Icon
            </label>

            <select id="subjectIcon">

                <option value="📚">
                    📚 Books
                </option>

                <option value="💻">
                    💻 Computer
                </option>

                <option value="🌐">
                    🌐 Web
                </option>

                <option value="🧮">
                    🧮 Mathematics
                </option>

                <option value="🔬">
                    🔬 Science
                </option>

                <option value="⚡">
                    ⚡ Programming
                </option>

            </select>

        </div>


        <div class="form-buttons">

            <button
                class="save-btn"
                onclick="saveSubject()"
            >
                Save Subject
            </button>

            <button
                class="cancel-btn"
                onclick="cancelSubject()"
            >
                Cancel
            </button>

        </div>

    `;


    document
        .getElementById("subjects")
        .prepend(form);


    document
        .getElementById("subjectName")
        .focus();

}


function saveSubject() {

    const name =
        document.getElementById(
            "subjectName"
        ).value.trim();


    const progress =
        Number(
            document.getElementById(
                "subjectProgress"
            ).value
        );


    const icon =
        document.getElementById(
            "subjectIcon"
        ).value;


    if (!name) {

        alert(
            "Please enter a subject name."
        );

        return;

    }


    if (
        Number.isNaN(progress) ||
        progress < 0 ||
        progress > 100
    ) {

        alert(
            "Progress must be between 0 and 100."
        );

        return;

    }


    subjects.push({

        id: Date.now(),

        name: name,

        progress: progress,

        icon: icon

    });


    saveSubjects();

    renderSubjects();

    updateDashboard();

    cancelSubject();

}


function deleteSubject(id) {

    const confirmed =
        confirm(
            "Delete this subject?"
        );


    if (!confirmed) {

        return;

    }


    subjects =
        subjects.filter(
            subject =>
                subject.id !== id
        );


    saveSubjects();

    renderSubjects();

    updateDashboard();

}


function saveSubjects() {

    localStorage.setItem(
        "campusSubjects",
        JSON.stringify(subjects)
    );

}


function cancelSubject() {

    const form =
        document.getElementById(
            "subjectForm"
        );

    if (form) {

        form.remove();

    }

}


// ==========================================
// NOTES
// ==========================================

function renderNotes(
    searchTerm = ""
) {

    const notesList =
        document.getElementById(
            "notesList"
        );

    if (!notesList) {

        return;

    }


    const search =
        searchTerm
            .toLowerCase()
            .trim();


    const filteredNotes =
        notes.filter(note =>

            note.title
                .toLowerCase()
                .includes(search)

            ||

            note.content
                .toLowerCase()
                .includes(search)

        );


    if (filteredNotes.length === 0) {

        notesList.innerHTML = `
            <div class="empty-state">
                📝 No notes found.
            </div>
        `;

        return;

    }


    notesList.innerHTML =
        filteredNotes
            .map(
                note => `

                <div class="note-card">

                    <div class="note-actions">

                        <button
                            onclick="editNote(
                                ${note.id}
                            )"
                            title="Edit"
                        >
                            ✏️
                        </button>

                        <button
                            onclick="deleteNote(
                                ${note.id}
                            )"
                            title="Delete"
                        >
                            🗑️
                        </button>

                    </div>

                    <h3>
                        ${escapeHTML(
                            note.title
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            note.content
                        )}
                    </p>

                    <small>
                        Updated ${escapeHTML(
                            note.date
                        )}
                    </small>

                </div>

            `
            )
            .join("");

}


function addNote() {

    showNoteForm();

}


function showNoteForm(
    note = null
) {

    removeExistingForm(
        "noteForm"
    );


    const form =
        document.createElement(
            "div"
        );

    form.className =
        "note-form";

    form.id =
        "noteForm";


    const isEditing =
        note !== null;


    form.innerHTML = `

        <h3>
            ${isEditing
                ? "✏️ Edit Note"
                : "📝 Create New Note"}
        </h3>


        <div class="form-group">

            <label>
                Title
            </label>

            <input
                type="text"
                id="noteTitle"
                placeholder="Note title"
                value="${isEditing
                    ? escapeAttribute(
                        note.title
                    )
                    : ""}"
            >

        </div>


        <div class="form-group">

            <label>
                Content
            </label>

            <textarea
                id="noteContent"
                placeholder="Write your note..."
            >${isEditing
                ? escapeHTML(
                    note.content
                )
                : ""}</textarea>

        </div>


        <div class="form-buttons">

            <button
                class="save-btn"
                onclick="${
                    isEditing
                        ? `updateNote(${note.id})`
                        : "saveNote()"
                }"
            >
                ${isEditing
                    ? "Update Note"
                    : "Save Note"}
            </button>

            <button
                class="cancel-btn"
                onclick="cancelNote()"
            >
                Cancel
            </button>

        </div>

    `;


    document
        .getElementById("notes")
        .prepend(form);


    document
        .getElementById("noteTitle")
        .focus();

}


function saveNote() {

    const title =
        document.getElementById(
            "noteTitle"
        ).value.trim();


    const content =
        document.getElementById(
            "noteContent"
        ).value.trim();


    if (!title || !content) {

        alert(
            "Please enter both title and content."
        );

        return;

    }


    notes.unshift({

        id: Date.now(),

        title: title,

        content: content,

        date: "Just now"

    });


    saveNotes();

    renderNotes();

    cancelNote();

}


function editNote(id) {

    const note =
        notes.find(
            item => item.id === id
        );


    if (!note) {

        return;

    }


    showNoteForm(note);

}


function updateNote(id) {

    const title =
        document.getElementById(
            "noteTitle"
        ).value.trim();


    const content =
        document.getElementById(
            "noteContent"
        ).value.trim();


    if (!title || !content) {

        alert(
            "Please enter both title and content."
        );

        return;

    }


    const note =
        notes.find(
            item => item.id === id
        );


    if (!note) {

        return;

    }


    note.title =
        title;

    note.content =
        content;

    note.date =
        "Just now";


    saveNotes();

    renderNotes();

    cancelNote();

}


function deleteNote(id) {

    const confirmed =
        confirm(
            "Delete this note?"
        );


    if (!confirmed) {

        return;

    }


    notes =
        notes.filter(
            note =>
                note.id !== id
        );


    saveNotes();

    renderNotes();

}


function saveNotes() {

    localStorage.setItem(
        "campusNotes",
        JSON.stringify(notes)
    );

}


function cancelNote() {

    const form =
        document.getElementById(
            "noteForm"
        );

    if (form) {

        form.remove();

    }

}


// Note search

const noteSearch =
    document.getElementById(
        "noteSearch"
    );


if (noteSearch) {

    noteSearch.addEventListener(
        "input",
        function () {

            renderNotes(
                this.value
            );

        }
    );

}


// ==========================================
// ASSIGNMENTS
// ==========================================

function renderAssignments() {

    const assignmentList =
        document.getElementById(
            "assignmentList"
        );

    if (!assignmentList) {

        return;

    }


    if (assignments.length === 0) {

        assignmentList.innerHTML = `
            <div class="empty-state">
                🎉 No assignments!
            </div>
        `;

        return;

    }


    assignmentList.innerHTML =
        assignments
            .map(
                assignment => `

                <div class="assignment">

                    <div>

                        <h3
                            style="
                                ${
                                    assignment.completed
                                        ? "text-decoration: line-through;"
                                        : ""
                                }
                            "
                        >
                            ${escapeHTML(
                                assignment.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                assignment.subject
                            )}
                        </p>

                    </div>


                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:10px;
                        "
                    >

                        <button
                            onclick="toggleAssignment(
                                ${assignment.id}
                            )"
                            style="
                                border:none;
                                background:#eef2ff;
                                color:#4f46e5;
                                padding:7px 10px;
                                border-radius:7px;
                                cursor:pointer;
                            "
                        >
                            ${
                                assignment.completed
                                    ? "↩️"
                                    : "✓"
                            }
                        </button>


                        ${
                            assignment.completed
                                ? `<span
                                    style="
                                        color:#16a34a;
                                        font-size:12px;
                                    "
                                   >
                                    Completed
                                   </span>`
                                : `<span class="due">
                                    ${escapeHTML(
                                        assignment.due
                                    )}
                                   </span>`
                        }


                        <button
                            onclick="deleteAssignment(
                                ${assignment.id}
                            )"
                            style="
                                border:none;
                                background:#fee2e2;
                                color:#ef4444;
                                padding:7px 10px;
                                border-radius:7px;
                                cursor:pointer;
                            "
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `
            )
            .join("");


    updateDashboard();

}


function addAssignment() {

    removeExistingForm(
        "assignmentForm"
    );


    const form =
        document.createElement(
            "div"
        );

    form.className =
        "assignment-form";

    form.id =
        "assignmentForm";


    form.innerHTML = `

        <h3>
            ➕ Add Assignment
        </h3>


        <div class="form-group">

            <label>
                Assignment Name
            </label>

            <input
                type="text"
                id="assignmentTitle"
                placeholder="e.g. React Portfolio"
            >

        </div>


        <div class="form-group">

            <label>
                Subject
            </label>

            <input
                type="text"
                id="assignmentSubject"
                placeholder="e.g. Web Development"
            >

        </div>


        <div class="form-group">

            <label>
                Due Date
            </label>

            <input
                type="text"
                id="assignmentDue"
                placeholder="e.g. Tomorrow"
            >

        </div>


        <div class="form-buttons">

            <button
                class="save-btn"
                onclick="saveAssignment()"
            >
                Save Assignment
            </button>

            <button
                class="cancel-btn"
                onclick="cancelAssignment()"
            >
                Cancel
            </button>

        </div>

    `;


    document
        .getElementById("assignments")
        .prepend(form);


    document
        .getElementById(
            "assignmentTitle"
        )
        .focus();

}


function saveAssignment() {

    const title =
        document.getElementById(
            "assignmentTitle"
        ).value.trim();


    const subject =
        document.getElementById(
            "assignmentSubject"
        ).value.trim();


    const due =
        document.getElementById(
            "assignmentDue"
        ).value.trim();


    if (!title || !subject || !due) {

        alert(
            "Please fill in all fields."
        );

        return;

    }


    assignments.push({

        id: Date.now(),

        title: title,

        subject: subject,

        due: due,

        completed: false

    });


    saveAssignments();

    renderAssignments();

    cancelAssignment();

}


function toggleAssignment(id) {

    const assignment =
        assignments.find(
            item => item.id === id
        );


    if (!assignment) {

        return;

    }


    assignment.completed =
        !assignment.completed;


    saveAssignments();

    renderAssignments();

}


function deleteAssignment(id) {

    const confirmed =
        confirm(
            "Delete this assignment?"
        );


    if (!confirmed) {

        return;

    }


    assignments =
        assignments.filter(
            assignment =>
                assignment.id !== id
        );


    saveAssignments();

    renderAssignments();

}


function saveAssignments() {

    localStorage.setItem(
        "campusAssignments",
        JSON.stringify(assignments)
    );

}


function cancelAssignment() {

    const form =
        document.getElementById(
            "assignmentForm"
        );

    if (form) {

        form.remove();

    }

}


// ==========================================
// FOCUS TIMER
// ==========================================

let timeLeft =
    25 * 60;


let timerInterval =
    null;


function updateTimer() {

    const display =
        document.getElementById(
            "timerDisplay"
        );


    if (!display) {

        return;

    }


    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    display.textContent =
        `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(
            2,
            "0"
        )}`;

}


function startTimer() {

    if (timerInterval !== null) {

        return;

    }


    timerInterval =
        setInterval(
            () => {

                if (timeLeft > 0) {

                    timeLeft--;

                    updateTimer();

                } else {

                    clearInterval(
                        timerInterval
                    );

                    timerInterval =
                        null;

                    alert(
                        "🎉 Focus session complete!"
                    );

                }

            },
            1000
        );

}


function pauseTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval =
        null;

}


function resetTimer() {

    clearInterval(
        timerInterval
    );

    timerInterval =
        null;

    timeLeft =
        25 * 60;

    updateTimer();

}


updateTimer();


// ==========================================
// EXPENSES
// ==========================================

function renderExpenses() {

    const expenseList =
        document.getElementById(
            "expenseList"
        );


    const expenseTotal =
        document.getElementById(
            "expenseTotal"
        );


    if (!expenseList) {

        return;

    }


    const total =
        expenses.reduce(
            (sum, expense) =>
                sum + Number(
                    expense.amount
                ),
            0
        );


    if (expenseTotal) {

        expenseTotal.textContent =
            `₹${total.toLocaleString(
                "en-IN"
            )}`;

    }


    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <div class="empty-state">
                💰 No expenses yet.
            </div>
        `;

        return;

    }


    expenseList.innerHTML =
        expenses
            .map(
                expense => `

                <div class="assignment">

                    <div>

                        <h3>
                            ${expense.icon}
                            ${escapeHTML(
                                expense.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                expense.date
                            )}
                        </p>

                    </div>


                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:12px;
                        "
                    >

                        <strong>
                            ₹${Number(
                                expense.amount
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                        <button
                            onclick="deleteExpense(
                                ${expense.id}
                            )"
                            style="
                                border:none;
                                background:#fee2e2;
                                color:#ef4444;
                                padding:7px 10px;
                                border-radius:7px;
                                cursor:pointer;
                            "
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


function addExpense() {

    removeExistingForm(
        "expenseForm"
    );


    const form =
        document.createElement(
            "div"
        );

    form.className =
        "expense-form";

    form.id =
        "expenseForm";


    form.innerHTML = `

        <h3>
            ➕ Add Expense
        </h3>


        <div class="form-group">

            <label>
                Expense Name
            </label>

            <input
                type="text"
                id="expenseName"
                placeholder="e.g. Lunch"
            >

        </div>


        <div class="form-group">

            <label>
                Amount
            </label>

            <input
                type="number"
                id="expenseAmount"
                placeholder="e.g. 150"
                min="0"
            >

        </div>


        <div class="form-group">

            <label>
                Category
            </label>

            <select id="expenseIcon">

                <option value="🍔">
                    🍔 Food
                </option>

                <option value="🚌">
                    🚌 Transport
                </option>

                <option value="📚">
                    📚 Books
                </option>

                <option value="🎮">
                    🎮 Entertainment
                </option>

                <option value="🛍️">
                    🛍️ Shopping
                </option>

                <option value="📦">
                    📦 Other
                </option>

            </select>

        </div>


        <div class="form-buttons">

            <button
                class="save-btn"
                onclick="saveExpense()"
            >
                Save Expense
            </button>

            <button
                class="cancel-btn"
                onclick="cancelExpense()"
            >
                Cancel
            </button>

        </div>

    `;


    document
        .getElementById("expenses")
        .prepend(form);


    document
        .getElementById(
            "expenseName"
        )
        .focus();

}


function saveExpense() {

    const name =
        document.getElementById(
            "expenseName"
        ).value.trim();


    const amount =
        Number(
            document.getElementById(
                "expenseAmount"
            ).value
        );


    const icon =
        document.getElementById(
            "expenseIcon"
        ).value;


    if (!name) {

        alert(
            "Please enter an expense name."
        );

        return;

    }


    if (
        Number.isNaN(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid amount."
        );

        return;

    }


    expenses.unshift({

        id: Date.now(),

        name: name,

        amount: amount,

        icon: icon,

        date: "Today"

    });


    saveExpenses();

    renderExpenses();

    cancelExpense();

}


function deleteExpense(id) {

    const confirmed =
        confirm(
            "Delete this expense?"
        );


    if (!confirmed) {

        return;

    }


    expenses =
        expenses.filter(
            expense =>
                expense.id !== id
        );


    saveExpenses();

    renderExpenses();

}


function saveExpenses() {

    localStorage.setItem(
        "campusExpenses",
        JSON.stringify(expenses)
    );

}


function cancelExpense() {

    const form =
        document.getElementById(
            "expenseForm"
        );

    if (form) {

        form.remove();

    }

}


// ==========================================
// DARK MODE
// ==========================================

const darkMode =
    document.getElementById(
        "darkMode"
    );


const savedDarkMode =
    localStorage.getItem(
        "campusDarkMode"
    );


if (
    savedDarkMode === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );

    if (darkMode) {

        darkMode.checked =
            true;

    }

}


if (darkMode) {

    darkMode.addEventListener(
        "change",
        function () {

            document.body.classList.toggle(
                "dark-mode",
                this.checked
            );


            localStorage.setItem(
                "campusDarkMode",
                this.checked
            );

        }
    );

}


// ==========================================
// HELPER FUNCTIONS
// ==========================================

function removeExistingForm(
    formId
) {

    const existing =
        document.getElementById(
            formId
        );

    if (existing) {

        existing.remove();

    }

}


function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


// ==========================================
// INITIALIZE APP
// ==========================================

renderSubjects();

renderNotes();

renderAssignments();

renderExpenses();

updateDashboard();

updateTimer();
