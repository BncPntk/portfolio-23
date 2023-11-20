"use strict";
const aboutSection = document.getElementById('aboutSection');
const projectsSection = document.getElementById('projectsSection');
const cvSection = document.getElementById('cvSection');
function getRandomColor() {
    const greenComponent = Math.floor(Math.random() * 156) + 100;
    const blueComponent = Math.floor(Math.random() * 156) + 100;
    return `rgb(0, ${greenComponent}, ${blueComponent})`;
}
document.addEventListener('DOMContentLoaded', function () {
    const blobPath = document.getElementById('blobPath');
    const blobText = document.querySelector('.hero-left-blob-text');
    const headingPrimary = document.querySelector('.heading-primary');
    if (blobPath && headingPrimary) {
        function getRandomGradientId() {
            return `newGradient-${Date.now()}`;
        }
        function handleClick() {
            const randomColor1 = getRandomColor();
            const randomColor2 = getRandomColor();
            const gradientId = getRandomGradientId();
            const newGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            newGradient.setAttribute('id', gradientId);
            newGradient.setAttribute('gradientTransform', 'rotate(45)');
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', randomColor1);
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', randomColor2);
            newGradient.appendChild(stop1);
            newGradient.appendChild(stop2);
            const defs = document.querySelector('defs');
            defs?.appendChild(newGradient);
            blobPath?.setAttribute('fill', `url(#${gradientId})`);
            // Update heading primary color
            if (headingPrimary)
                headingPrimary.style.cssText = `background: -webkit-linear-gradient(120deg, ${randomColor1}, ${randomColor2});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;`;
        }
        blobPath.addEventListener('click', handleClick);
    }
    const aboutSection = document.getElementById('aboutSection');
    const projectsSection = document.getElementById('projectsSection');
    const cvSection = document.getElementById('cvSection');
    const blob = document.querySelector('.blob');
    // const initialTop = 220;
    const leftMovementThreshold = 150;
    let prevScrollY = 0;
    let movementFactor = 0.05; // control amount of blob movement
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollDelta = scrollY - prevScrollY;
        if (scrollY >= leftMovementThreshold) {
            const narrowScreenBreakpoint = 1660;
            const mediumScreenBreakpoint = 1860;
            const wideScreenBreakpoint = 2050;
            const extraWideScreenBreakpoint = 2560;
            let maxLeftMovement;
            if (window.innerWidth <= narrowScreenBreakpoint) {
                maxLeftMovement = -275;
            }
            else if (window.innerWidth <= mediumScreenBreakpoint) {
                maxLeftMovement = -300;
            }
            else if (window.innerWidth <= wideScreenBreakpoint) {
                maxLeftMovement = -500;
            }
            else if (window.innerWidth <= extraWideScreenBreakpoint) {
                maxLeftMovement = -575;
            }
            else {
                maxLeftMovement = -600;
            }
            const leftMovement = Math.min(maxLeftMovement, (scrollY - leftMovementThreshold) * movementFactor);
            blob.style.transform = `translate(${leftMovement}px, ${scrollY * movementFactor}px)`;
        }
        else {
            blob.style.transform = 'translate(0px, 0px)';
        }
        prevScrollY = scrollY;
    });
    window.addEventListener('resize', function () {
        const narrowScreenBreakpoint = 1660;
        const mediumScreenBreakpoint = 1860;
        const wideScreenBreakpoint = 2050;
        const extraWideScreenBreakpoint = 2560;
        if (window.innerWidth <= narrowScreenBreakpoint) {
            movementFactor = 0.03;
        }
        else if (window.innerWidth <= mediumScreenBreakpoint) {
            movementFactor = 0.04;
        }
        else if (window.innerWidth <= wideScreenBreakpoint) {
            movementFactor = 0.05;
        }
        else if (window.innerWidth <= extraWideScreenBreakpoint) {
            movementFactor = 0.06;
        }
        else {
            movementFactor = 0.07; // default for larger screens
        }
    });
    // SCROLL TO SECTION
    function addScrollListener(sectionDiv, section, block) {
        const element = document.querySelector(sectionDiv);
        if (element) {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                section?.scrollIntoView({ behavior: 'smooth', block });
            });
        }
    }
    addScrollListener('.main-nav-link.about-link', aboutSection, 'start');
    addScrollListener('.main-nav-link.projects-link', projectsSection, 'start');
    addScrollListener('.main-nav-link.cv-link', cvSection, 'start');
});
function logScrollY() {
    const scrollY = window.scrollY || window.pageYOffset;
    console.log('Scroll Y:', scrollY);
}
// 680 - 1200 about
// 1200 -  2400 projects
// 2600 -  3500 c
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY >= 680 && scrollY < 1200) {
        updateSectionName('About', 700, 50, 1);
    }
    else if (scrollY >= 1600 && scrollY < 2500) {
        updateSectionName('Projects', 700, 50, 1);
    }
    else if (scrollY >= 2900 && scrollY < 3300) {
        updateSectionName('CV', 700, 50, 1);
    }
    else {
        updateSectionName('', 0, 0, 0);
    }
});
function updateSectionName(name, top, left, opacity) {
    const sectionNameElement = document.querySelector('.section-name-text');
    if (sectionNameElement) {
        sectionNameElement.textContent = name;
        sectionNameElement.style.top = `${top}px`;
        sectionNameElement.style.left = `${left}px`;
        sectionNameElement.style.opacity = opacity.toString();
    }
}
const projects = [
    // order = [Z pattern, mobile]
    {
        textGroup: {
            title: 'SwiftShift Movers',
            description: "This is a fictional moving team's online platform for hassle-free appointment scheduling, mainly built to practice Tailwind CSS.",
            codeLink: 'https://github.com/BncPntk/SwiftShift-Movers',
            demoLink: 'https://bncpntk-swiftshift-movers.netlify.app/',
            stacks: ['react', 'tailwind'],
            order: [1, 1],
        },
        imgGroup: {
            imagePath: '/images/frame_swiftshift.png',
            order: [2, 2],
        },
    },
    {
        textGroup: {
            title: 'EasyGrocery',
            description: 'EasyGrocery is a user-friendly React-based shopping list app designed to simplify your grocery shopping experience.',
            codeLink: 'https://github.com/BncPntk/EasyGrocery',
            demoLink: 'https://bncpntk-easy-grocery.netlify.app/',
            stacks: ['react', 'css'],
            order: [4, 3],
        },
        imgGroup: {
            imagePath: '/images/frame_easy-grocery.png',
            // imagePath: '/src/images/frame_easy-grocery.png',
            order: [3, 4],
        },
    },
];
function generateProjectHTML(project, index) {
    const textOrderClass = `order-${project.textGroup.order[0]} order-mobile-${project.textGroup.order[1]}`;
    const imgOrderClass = `order-${project.imgGroup.order[0]} order-mobile-${project.imgGroup.order[1]}`;
    const stacksHTML = project.textGroup.stacks
        ? `<div class="project-stacks">${project.textGroup.stacks
            .map((stack, stackIndex) => {
            const iconPath = `/images/icons/${stack}.svg`;
            return `<span><img src="${iconPath}" alt="${stack}" class="stack-icon" /></span>`;
        })
            .join('')}</div>`
        : '';
    return `
    <!-- PROJECT ${index} -->
    <div class="project-text-box ${textOrderClass}" style="order: ${project.textGroup.order[0]};">
      <h3 class="heading-tertiary">${project.textGroup.title}</h3>
      <p class="project-description">${project.textGroup.description}</p>
      ${stacksHTML}
      <div class="project-icons">
        <div>
          <a href="${project.textGroup.codeLink}" class="project-icon" target="_blank">
            <span>Code</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40px" height="40px">
                    <path
                      d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
                    />
                  </svg>
          </a>
        </div>
        <div>
          <a href="${project.textGroup.demoLink}" class="project-icon" target="_blank">
            <span>Live demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 64 64">
                    <path
                      d="M50,32c1.104,0,2,0.896,2,2v12c0,3.309-2.691,6-6,6H18c-3.309,0-6-2.691-6-6V18c0-3.309,2.691-6,6-6h12c1.104,0,2,0.896,2,2
	s-0.896,2-2,2H18c-1.103,0-2,0.897-2,2v28c0,1.103,0.897,2,2,2h28c1.103,0,2-0.897,2-2V34C48,32.896,48.896,32,50,32z"
                    />
                    <path
                      id="overlay_12_"
                      d="M52,10c1.104,0,2,0.896,2,2v12c0,1.104-0.896,2-2,2s-2-0.896-2-2v-7.172L33.414,33.414
	C33.023,33.805,32.512,34,32,34s-1.023-0.195-1.414-0.586c-0.781-0.781-0.781-2.047,0-2.828L47.172,14H40c-1.104,0-2-0.896-2-2
	s0.896-2,2-2H52z"
                    />
                  </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="project-img-box ${imgOrderClass}" style="order: ${project.imgGroup.order[0]};">
      <img src="${project.imgGroup.imagePath || '/src/images/frame_easy-grocery.png'}" class="project-img" alt="${project.textGroup.title || 'Project'}" />
    </div>
  `;
}
function generateAllProjectsHTML(projects) {
    let html = '';
    projects.forEach((project, index) => {
        const projectHTML = generateProjectHTML(project, index + 1);
        html += projectHTML;
    });
    return html;
}
function insertProjectsHTML(html) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = html;
    }
}
const allProjectsHTML = generateAllProjectsHTML(projects);
insertProjectsHTML(allProjectsHTML);
