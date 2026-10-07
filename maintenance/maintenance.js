/* =========================================================
   PROJECT MAINTENANCE SYSTEM
========================================================= */


/* =========================================================
   PROJECTS
========================================================= */

const projects = {
    "Restaurant Management App": {
        name: "Restaurant Management App"
    },

    "Global Affairs Dashboard": {
        name: "Global Affairs Dashboard"
    },

    "Facial Recognition System": {
        name: "Facial Recognition System"
    },

    "Smart Personal Assistant": {
        name: "Smart Personal Assistant"
    },

    "Gesture Controlled System": {
        name: "Gesture Controlled System"
    }
};


/* =========================================================
   MAINTENANCE ANIMATIONS
========================================================= */

const maintenanceStates = [
    {
        id: "crane",
        progress: 25,
        title: "Construction in Progress",
        message: "The project is currently under construction. Our crane is working on it!",
        image: "images/crane.png"
    },

    {
        id: "vacation",
        progress: 20,
        title: "Developer Went on Vacation",
        message: "The developer has temporarily escaped reality. Work will resume soon!",
        image: "images/vacation.png"
    },

    {
        id: "builder",
        progress: 15,
        title: "Builder Is Working Hard",
        message: "Someone is still working on it... one hammer at a time!",
        image: "images/builder.png"
    },

    {
        id: "paused",
        progress: 10,
        title: "Project Temporarily Paused",
        message: "This project is temporarily paused due to external policy constraints!",
        image: "images/paused.png"
    },

    {
        id: "forgotten",
        progress: 0,
        title: "Developer Forgot This Project",
        message: "The developer completely forgot about this project. Contact immediately!",
        image: "images/forgotten.png"
    }
];


/* =========================================================
   GET PROJECT FROM URL
========================================================= */

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("project");
const currentProject = projects[projectId] || projects["Restaurant Management App"];


/* =========================================================
   HTML ELEMENTS
========================================================= */

const projectName = document.getElementById("project-name");
const maintenanceMessage = document.getElementById("maintenance-message");
const animationContainer = document.getElementById("animation-container");
const progressSection = document.getElementById("progress-section");
const progressValue = document.getElementById("progress-value");
const progressFill = document.getElementById("progress-fill");


/* =========================================================
   SHOW PROJECT NAME
========================================================= */

projectName.textContent = currentProject.name;


/* =========================================================
   DETERMINISTIC RANDOM NUMBER GENERATOR
========================================================= */

function seededRandom(seed) {
    let value = seed;
    return function () {
        value |= 0;
        value = value + 0x6D2B79F5 | 0;

        let t = Math.imul(
            value ^ value >>> 15,
            1 | value
        );

        t = t + Math.imul(
            t ^ t >>> 7,
            61 | t
        ) ^ t;

        return (
            (t ^ t >>> 14) >>> 0
        ) / 4294967296;
    };
}


/* =========================================================
   SHUFFLE FUNCTION
========================================================= */

function shuffle(array, random) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] =
            [result[j], result[i]];
    }
    return result;
}


/* =========================================================
   CREATE HOURLY ANIMATION ASSIGNMENT
========================================================= */

function createHourlyAssignment() {
    const currentHour =
        Math.floor(Date.now() / (1000 * 60 * 60));
    const random =
        seededRandom(currentHour);
    return shuffle(
        maintenanceStates,
        random
    );
}


/* =========================================================
   GET CURRENT PROJECT'S ANIMATION
========================================================= */

function getProjectIndex() {
    const projectIds = Object.keys(projects);
    const index =
        projectIds.indexOf(projectId);
    return index === -1 ? 0 : index;
}

const animationAssignment = createHourlyAssignment();
const projectIndex = getProjectIndex();
const selectedState = animationAssignment[projectIndex];


/* =========================================================
   UPDATE PROJECT MESSAGE
========================================================= */

maintenanceMessage.textContent = selectedState.message;


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {
    if (selectedState.progress === null) {
        progressSection.style.display = "none";
        return;
    }

    progressSection.style.display = "block";
    progressValue.textContent = `${selectedState.progress}%`;
    progressFill.style.width = "0%";

    setTimeout(() => {
        progressFill.style.width = `${selectedState.progress}%`;
    }, 300);
}

updateProgress();


/* =========================================================
   ANIMATION SCENES
========================================================= */

function renderAnimation(type) {
    const state = maintenanceStates.find(
        state => state.id === type
    );

    if (!state) return;

    animationContainer.innerHTML = `
        <div class="scene">
            <img
                src="${state.image}"
                alt="${state.title}"
            >
        </div>
    `;

    // Project title below animation box
    const existingTitle = document.querySelector(".scene-title");

    if (existingTitle) {
        existingTitle.remove();
    }

    const title = document.createElement("div");
    title.className = "scene-title";
    title.textContent = state.title;

    animationContainer.insertAdjacentElement("afterend", title);
}



/* =========================================================
   RENDER SELECTED ANIMATION
========================================================= */
renderAnimation(selectedState.id);



/* =========================================================
   HOURLY REFRESH
========================================================= */

function scheduleHourlyRefresh() {
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(
        now.getHours() + 1,
        0,
        0,
        0
    );

    const timeUntilNextHour =
        nextHour.getTime() - now.getTime();
    setTimeout(() => {
        window.location.reload();
    }, timeUntilNextHour + 100);
}

scheduleHourlyRefresh();