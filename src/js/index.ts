const aboutSection = document.getElementById('aboutSection');
const projectsSection = document.getElementById('projectsSection');
const cvSection = document.getElementById('cvSection');

function getRandomColor(): string {
  const greenComponent = Math.floor(Math.random() * 156) + 100;
  const blueComponent = Math.floor(Math.random() * 156) + 100;

  return `rgb(0, ${greenComponent}, ${blueComponent})`;
}

document.addEventListener('DOMContentLoaded', function () {
  const blobPath = document.getElementById('blobPath') as SVGPathElement | null;
  const blobText = document.querySelector('.hero-left-blob-text') as HTMLElement | null;
  const headingPrimary = document.querySelector('.heading-primary') as HTMLElement | null;

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

  const blob = document.querySelector('.blob') as HTMLElement;
  // const initialTop = 220;
  const leftMovementThreshold = 150;
  let prevScrollY = 0;

  let movementFactor = 0.05; // control amount of blob movement

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollDelta = scrollY - prevScrollY;
    // const newTop = Math.max(initialTop, initialTop + scrollDelta * movementFactor) + 'px';
    // blob.style.top = newTop;

    if (scrollY >= leftMovementThreshold) {
      const narrowScreenBreakpoint = 1660;
      const mediumScreenBreakpoint = 1860;
      const wideScreenBreakpoint = 2050;
      const extraWideScreenBreakpoint = 2560;

      let maxLeftMovement;

      if (window.innerWidth <= narrowScreenBreakpoint) {
        maxLeftMovement = -275;
      } else if (window.innerWidth <= mediumScreenBreakpoint) {
        maxLeftMovement = -300;
      } else if (window.innerWidth <= wideScreenBreakpoint) {
        maxLeftMovement = -500;
      } else if (window.innerWidth <= extraWideScreenBreakpoint) {
        maxLeftMovement = -575;
      } else {
        maxLeftMovement = -600;
      }

      const leftMovement = Math.min(maxLeftMovement, (scrollY - leftMovementThreshold) * movementFactor);
      blob.style.transform = `translate(${leftMovement}px, ${scrollY * movementFactor}px)`;
    } else {
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
    } else if (window.innerWidth <= mediumScreenBreakpoint) {
      movementFactor = 0.04;
    } else if (window.innerWidth <= wideScreenBreakpoint) {
      movementFactor = 0.05;
    } else if (window.innerWidth <= extraWideScreenBreakpoint) {
      movementFactor = 0.06;
    } else {
      movementFactor = 0.07; // Default movement factor for larger screens
    }
  });

  // SCROLL TO SECTION
  function addScrollListener(sectionDiv: string, section: HTMLElement | null, block: ScrollLogicalPosition) {
    const element = document.querySelector(sectionDiv) as HTMLAnchorElement | null;
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

// SHOW SECTION ON SIDE
// document.addEventListener('DOMContentLoaded', function () {
//   const blobPath = document.getElementById('blobPath') as SVGPathElement | null;
//   const blobText = document.querySelector('.hero-left-blob-text') as HTMLElement | null;

//   const aboutSection = document.getElementById('aboutSection');
//   const projectsSection = document.getElementById('projectsSection');
//   const cvSection = document.getElementById('cvSection');

//   const sectionNames = ['About', 'Projects', 'CV'];
//   let currentSectionIndex = 0;

//   function updateBlobText() {
//     if (blobText) {
//       blobText.textContent = sectionNames[currentSectionIndex];
//     }
//   }

//   function determineCurrentSection(scrollY: number) {
//     const sectionOffsets = [
//       aboutSection?.offsetTop || 0,
//       projectsSection?.offsetTop || 0,
//       cvSection?.offsetTop || 0,
//     ];

//     for (let i = sectionOffsets.length - 1; i >= 0; i--) {
//       if (scrollY >= sectionOffsets[i]) {
//         currentSectionIndex = i;
//         break;
//       }
//     }

//     updateBlobText();
//   }

//   function updateBlobTextBasedOnSection() {
//     const scrollY = window.scrollY || window.pageYOffset;
//     determineCurrentSection(scrollY);
//   }

//   window.addEventListener('scroll', updateBlobTextBasedOnSection);
// });
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
  } else if (scrollY >= 1600 && scrollY < 2500) {
    updateSectionName('Projects', 700, 50, 1);
  } else if (scrollY >= 2900 && scrollY < 3300) {
    updateSectionName('CV', 700, 50, 1);
  } else {
    updateSectionName('', 0, 0, 0);
  }
});

function updateSectionName(name: string, top: number, left: number, opacity: number) {
  const sectionNameElement = document.querySelector('.section-name-text') as HTMLElement;

  if (sectionNameElement) {
    sectionNameElement.textContent = name;
    sectionNameElement.style.top = `${top}px`;
    sectionNameElement.style.left = `${left}px`;
    sectionNameElement.style.opacity = opacity.toString();
  }
}

// GENERATE PROJECTS
interface ProjectTextGroup {
  title: string;
  description: string;
  codeLink: string;
  demoLink: string;
  order: number[];
}

interface ProjectImgGroup {
  imagePath: string;
  order: number[];
}

interface Project {
  textGroup: ProjectTextGroup;
  imgGroup: ProjectImgGroup;
}

const projects: Project[] = [
  // order = [Z pattern, mobile]
  {
    textGroup: {
      title: 'SwiftShift Movers',
      description: '1Lorem ipsum, dolor sit amet...',
      codeLink: 'https://github.com/BncPntk/SwiftShift-Movers',
      demoLink: 'https://bncpntk-swiftshift-movers.netlify.app/',
      order: [1, 1],
    },
    imgGroup: {
      imagePath: '/images/frame_easy-grocery.png',
      order: [2, 2],
    },
  },
  {
    textGroup: {
      title: 'Project 2',
      description: '2Lorem ipsum, dolor sit amet...',
      codeLink: '#',
      demoLink: '#',
      order: [4, 3],
    },
    imgGroup: {
      imagePath: '/images/frame_easy-grocery.png',
      order: [3, 4],
    },
  },
  {
    textGroup: {
      title: 'Project 3',
      description: '3Lorem ipsum, dolor sit amet...',
      codeLink: '#',
      demoLink: '#',
      order: [5, 5],
    },
    imgGroup: {
      imagePath: '/images/frame_easy-grocery.png',
      order: [6, 6],
    },
  },
];

function generateProjectHTML(project: Project, index: number) {
  const textOrderClass = `order-${project.textGroup.order[0]} order-mobile-${project.textGroup.order[1]}`;
  const imgOrderClass = `order-${project.imgGroup.order[0]} order-mobile-${project.imgGroup.order[1]}`;

  return `
    <!-- PROJECT ${index} -->
    <div class="project-text-box ${textOrderClass}" style="order: ${project.textGroup.order[0]};">
      <h3 class="heading-tertiary">${project.textGroup.title}</h3>
      <p class="project-description">${project.textGroup.description}</p>
      <div class="project-icons">
        <div>
          <a href="${project.textGroup.codeLink}" class="project-icon" target="_blank">
            <span>Code</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40px" height="40px">
              <!-- Code SVG Path -->
            </svg>
          </a>
        </div>
        <div>
          <a href="${project.textGroup.demoLink}" class="project-icon" target="_blank">
            <span>Live demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 64 64">
              <!-- Live Demo SVG Path -->
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="project-img-box ${imgOrderClass}" style="order: ${project.imgGroup.order[0]};">
      <img src="${
        project.imgGroup.imagePath || '/src/images/frame_easy-grocery.png'
      }" class="project-img" alt="${project.textGroup.title || 'Project'}" />
    </div>
  `;
}

function generateAllProjectsHTML(projects: Project[]) {
  let html = '';

  projects.forEach((project, index) => {
    const projectHTML = generateProjectHTML(project, index + 1);
    html += projectHTML;
  });

  return html;
}

function insertProjectsHTML(html: string) {
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = html;
  }
}

const allProjectsHTML = generateAllProjectsHTML(projects);

insertProjectsHTML(allProjectsHTML);
