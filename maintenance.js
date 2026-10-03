/* =========================================================
   PROJECT MAINTENANCE SYSTEM
========================================================= */


/* =========================================================
   PROJECTS
========================================================= */

const projects = {
    "Restaurant Management Page": {
        name: "Restaurant Management Page"
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
        progress: 30,
        title: "Construction in Progress",
        message: "The project is currently under construction. Our crane is working on it!",
    },

    {
        id: "vacation",
        progress: 20,
        title: "Developer Went on Vacation",
        message: "The developer has temporarily escaped reality. Work will resume soon!",
    },

    {
        id: "builder",
        progress: 40,
        title: "Builder Is Working",
        message: "Someone is still working on it... one hammer at a time.",
    },

    {
        id: "paused",
        progress: 10,
        title: "Project Temporarily Paused",
        message: "This project is temporarily paused due to external policy constraints.",
    },

    {
        id: "forgotten",
        progress: 0,
        title: "Developer Forgot This Project",
        message: "The developer completely forgot about this project. Contact immediately!",
    }
];


/* =========================================================
   GET PROJECT FROM URL
========================================================= */

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("project");
const currentProject = projects[projectId] || projects["Restaurant Management Page"];


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
    animationContainer.innerHTML = "";
    /* =====================================================
       CRANE
    ===================================================== */
    if (type === "crane") {
        animationContainer.innerHTML = `
            <div class="scene crane-scene">
                <div class="crane">
                    <div class="crane-tower"></div>
                    <div class="crane-arm">
                        <div class="crane-cable"></div>
                        <div class="crane-hook">
                            ⚒
                        </div>
                    </div>
                </div>

                <div class="building">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div class="construction-ground"></div>
                <div class="scene-label">
                    🏗️ Construction in Progress
                </div>
            </div>
        `;
    }


    /* =====================================================
       DEVELOPER VACATION
    ===================================================== */

    else if (type === "vacation") {
        animationContainer.innerHTML = `
            <div class="scene vacation-scene">
                <div class="sun">
                    ☀️
                </div>
                <div class="palm-tree">
                    🌴
                </div>
                <div class="developer-vacation">
                    🧑‍💻
                </div>
                <div class="vacation-chair">
                    🏖️
                </div>
                <div class="vacation-drink">
                    ☕
                </div>
                <div class="scene-label">
                    🏖️ Developer is on Vacation
                </div>
            </div>
        `;
    }


    /* =====================================================
       BUILDER
    ===================================================== */

    else if (type === "builder") {
        animationContainer.innerHTML = `
            <div class="scene builder-scene">
                <div class="builder-character">
                    👷
                </div>
                <div class="hammer">
                    🔨
                </div>
                <div class="wall">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="dust dust-one">
                    •
                </div>
                <div class="dust dust-two">
                    •
                </div>
                <div class="dust dust-three">
                    •
                </div>
                <div class="scene-label">
                    🔨 Builder is Working
                </div>
            </div>
        `;
    }


    /* =====================================================
       PROJECT PAUSED
    ===================================================== */

    else if (type === "paused") {
        animationContainer.innerHTML = `
            <div class="scene paused-scene">
                <div class="pause-icon">
                    ⏸
                </div>
                <div class="warning-icon">
                    ⚠️
                </div>
                <div class="paused-building">
                    🏗️
                </div>
                <div class="scene-label">
                    ⚖️ External Policy Constraints
                </div>
            </div>
        `;
    }


    /* =====================================================
       FORGOTTEN PROJECT
    ===================================================== */

    else if (type === "forgotten") {
        animationContainer.innerHTML = `
            <div class="scene forgotten-scene">
                <div class="forgotten-laptop left-laptop">
                    😴
                </div>
                <div class="sleeping-developer">
                    🧑‍💻
                </div>
                <div class="sleep-z">
                    Z
                </div>
                <div class="sleep-z z-two">
                    Z
                </div>
                <div class="sleep-z z-three">
                    Z
                </div>
                <div class="forgotten-laptop">
                    💻
                </div>
                <div class="scene-label">
                    😴 Project Completely Forgotten
                </div>
            </div>
        `;
    }
}


/* =========================================================
   RENDER SELECTED ANIMATION
========================================================= */

renderAnimation(selectedState.id);


/* =========================================================
   ADD ANIMATION CSS
========================================================= */

const animationStyles = document.createElement("style");
animationStyles.textContent = `

/* =========================================================
   COMMON SCENE
========================================================= */

.scene {
    position: relative;
    width: 100%;
    height: 100%;

    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
}


/* =========================================================
   CRANE
========================================================= */

.crane-scene {
    background:
        linear-gradient(
            to bottom,
            #202a3a 0%,
            #323946 65%,
            #242a32 65%,
            #242a32 100%
        );
}

.crane {
    position: absolute;
    left: 15%;
    bottom: 15%;
    width: 5rem;
    height: 18rem;
}

.crane-tower {
    position: absolute;
    width: 2rem;
    height: 18rem;
    left: 0;
    background: var(--main-color);
    box-shadow: 0 0 1rem rgba(0, 238, 255, 0.4);
}

.crane-arm {
    position: absolute;
    width: 30rem;
    height: 1rem;
    top: 0;
    left: 0;
    background: var(--main-color);
    transform-origin: left center;
    animation: craneMove 4s ease-in-out infinite alternate;
}

.crane-cable {
    position: absolute;
    width: 0.3rem;
    height: 10rem;
    background: #ddd;
    left: 20rem;
    top: 1rem;
}

.crane-hook {
    position: absolute;
    left: 18.8rem;
    top: 10rem;
    font-size: 2rem;
    animation: hookMove 2s ease-in-out infinite;
}

.building {
    position: absolute;
    bottom: 15%;
    right: 10%;
    width: 18rem;
    height: 14rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    background: #555;
    padding: 0.8rem;
}

.building div {
    background: #202631;
}

.construction-ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 15%;
    background: #171b22;
}

@keyframes craneMove {
    from {
        transform: rotate(-3deg);
    }
    to {
        transform: rotate(4deg);
    }
}

@keyframes hookMove {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(2rem);
    }
}


/* =========================================================
   VACATION
========================================================= */

.vacation-scene {
    background:
        linear-gradient(
            to bottom,
            #26384b,
            #323946 60%,
            #1c2630 60%
        );
}

.sun {
    position: absolute;
    top: 3rem;
    right: 5rem;
    font-size: 4rem;
    animation: sunPulse 2s infinite alternate;
}

.palm-tree {
    position: absolute;
    left: 15%;
    bottom: 18%;
    font-size: 10rem;
    animation: palmMove 3s ease-in-out infinite alternate;
}

.developer-vacation {
    font-size: 7rem;
    transform: rotate(8deg);
    animation: vacationMove 3s ease-in-out infinite alternate;
}

.vacation-chair {
    position: absolute;
    bottom: 16%;
    right: 20%;
    font-size: 7rem;
}

.vacation-drink {
    position: absolute;
    bottom: 18%;
    right: 8%;
    font-size: 4rem;
    animation: drinkMove 2s infinite alternate;
}

@keyframes sunPulse {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}

@keyframes palmMove {
    from {
        transform: rotate(-3deg);
    }
    to {
        transform: rotate(3deg);
    }
}

@keyframes vacationMove {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-1rem);
    }
}

@keyframes drinkMove {
    from {
        transform: rotate(-5deg);
    }
    to {
        transform: rotate(5deg);
    }
}


/* =========================================================
   BUILDER
========================================================= */

.builder-scene {
    background:
        linear-gradient(
            to bottom,
            #303847 0%,
            #323946 65%,
            #242a32 65%
        );
}

.builder-character {
    position: absolute;
    bottom: 18%;
    left: 25%;
    font-size: 8rem;
    animation: builderMove 1s infinite alternate;
}

.hammer {
    position: absolute;
    left: 37%;
    bottom: 37%;
    font-size: 5rem;
    transform-origin: bottom right;
    animation: hammerHit 0.8s infinite;
}

.wall {
    position: absolute;
    right: 15%;
    bottom: 18%;
    width: 20rem;
    height: 12rem;
    background: #777;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
}

.wall div {
    background: #3b414b;
}

.dust {
    position: absolute;
    font-size: 3rem;
    opacity: 0;
    animation: dustRise 1s infinite;
}

.dust-one {
    left: 47%;
    bottom: 45%;
}

.dust-two {
    left: 52%;
    bottom: 42%;
    animation-delay: 0.2s;
}

.dust-three {
    left: 57%;
    bottom: 40%;
    animation-delay: 0.4s;
}

@keyframes hammerHit {
    0% {
        transform: rotate(-35deg);
    }
    50% {
        transform: rotate(35deg);
    }
    100% {
        transform: rotate(-35deg);
    }
}

@keyframes builderMove {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-0.5rem);
    }
}

@keyframes dustRise {
    0% {
        opacity: 0;
        transform: translateY(0) scale(0.5);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateY(-3rem) scale(1.2);
    }
}


/* =========================================================
   PAUSED
========================================================= */

.paused-scene {
    background:
        radial-gradient(
            circle,
            #323946,
            #1f242d
        );
}

.pause-icon {
    font-size: 10rem;
    color: var(--main-color);
    animation: pausePulse 2s infinite;
}

.warning-icon {
    position: absolute;
    top: 4rem;
    right: 6rem;
    font-size: 5rem;
    animation: warningBlink 1s infinite;
}

.paused-building {
    position: absolute;
    bottom: 3rem;
    left: 6rem;
    font-size: 7rem;
    opacity: 0.5;
}

.paused-text {
    position: absolute;
    bottom: 3rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: #aaa;
}

@keyframes pausePulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes warningBlink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
}


/* =========================================================
   FORGOTTEN PROJECT
========================================================= */

.forgotten-scene {
    background:
        linear-gradient(
            to bottom,
            #282d37,
            #1f242d
        );
}

.sleeping-developer {
    font-size: 8rem;
    animation: sleeping 3s infinite ease-in-out;
}

.forgotten-laptop {
    position: absolute;
    bottom: 18%;
    right: 22%;
    font-size: 7rem;
    opacity: 0.7;
    animation: laptopBlink 2s infinite;
}

.left-laptop {
    right: auto;
    bottom: 18%;
    left: 18%;
}

.sleep-z {
    position: absolute;
    right: 35%;
    top: 25%;
    font-size: 3rem;
    font-weight: 700;
    color: var(--main-color);
    animation: zFloat 2s infinite;
}

.z-two {
    animation-delay: 0.5s;
}

.z-three {
    animation-delay: 1s;
}

@keyframes sleeping {
    0%, 100% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg);
    }
}

@keyframes laptopBlink {
    0%, 100% {
        opacity: 0.4;
    }
    50% {
        opacity: 1;
    }
}

@keyframes zFloat {
    0% {
        opacity: 0;
        transform: translateY(1rem);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateY(-3rem);
    }
}


/* =========================================================
   SCENE LABEL
========================================================= */

.scene-label {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    padding: 0.8rem 1.5rem;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(0, 238, 255, 0.2);
    border-radius: 2rem;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    white-space: nowrap;
}


/* =========================================================
   MOBILE ANIMATION ADJUSTMENTS
========================================================= */

@media (max-width: 600px) {
    .crane-arm {
        width: 20rem;
    }
    .crane-cable {
        left: 14rem;
    }
    .crane-hook {
        left: 12.8rem;
    }
    .building {
        width: 13rem;
        height: 10rem;
    }
    .palm-tree {
        font-size: 7rem;
        left: 5%;
    }
    .developer-vacation {
        font-size: 5rem;
    }
    .vacation-chair {
        font-size: 5rem;
    }
    .builder-character {
        font-size: 6rem;
    }
    .hammer {
        left: 35%;
        font-size: 4rem;
    }
    .wall {
        width: 14rem;
        height: 9rem;
    }
    .sleeping-developer {
        font-size: 6rem;
    }
    .forgotten-laptop {
        font-size: 5rem;
        right: 12%;
    }
    .scene-label {
        font-size: 1rem;
        bottom: 1rem;
    }
}
`;


/* Add animation CSS to page */

document.head.appendChild(animationStyles);


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