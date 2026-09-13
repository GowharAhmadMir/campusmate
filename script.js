// Navigation

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");

navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageName = this.dataset.page;

        // Hide all pages

        pages.forEach(page => {
            page.classList.add("hidden");
        });

        // Show selected page

        const selectedPage =
            document.getElementById(pageName);

        selectedPage.classList.remove("hidden");


        // Remove active class

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        // Add active class

        this.classList.add("active");


        // Change heading

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

        pageTitle.textContent =
            titles[pageName];

    });

});


// Study Button

function startStudy() {

    alert(
        "Great! 📚 Your study session has started."
    );

}


// Subject

function addSubject() {

    alert(
        "Subject creation will be added soon! 📚"
    );

}


// Note

function addNote() {

    alert(
        "Note editor will be added soon! 📝"
    );

}


// Assignment

function addAssignment() {

    alert(
        "Assignment form will be added soon! ✅"
    );

}


// Expense

function addExpense() {

    alert(
        "Expense form will be added soon! 💰"
    );

}


// Focus Timer

let timeLeft = 25 * 60;

let timerInterval = null;


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    document.getElementById(
        "timerDisplay"
    ).textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimer();

        } else {

            clearInterval(timerInterval);

            timerInterval = null;

            alert(
                "🎉 Focus session complete!"
            );

        }

    }, 1000);

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();

}


updateTimer();


// Current Date

const dateElement =
    document.getElementById("currentDate");

const today = new Date();

dateElement.textContent =
    today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    );
