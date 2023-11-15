function getRandomColor() {
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

  const blob = document.querySelector('.blob') as HTMLElement;
  const initialTop = 220;
  const leftMovementThreshold = 150;
  const maxLeftMovement = -395;
  const showTextThreshold = 500;
  let prevScrollY = 0;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollDelta = scrollY - prevScrollY;
    const newTop = Math.max(initialTop, initialTop + scrollDelta * 0.1) + 'px';
    blob.style.top = newTop;

    if (scrollY >= leftMovementThreshold) {
      const leftMovement = Math.min(maxLeftMovement, (scrollY - leftMovementThreshold) * 0.1);
      blob.style.transform = `translate(${leftMovement}px, ${scrollY * 0.1}px)`;

      blobText?.style.setProperty('opacity', scrollY >= showTextThreshold ? '1' : '0');
    } else {
      blob.style.transform = 'translate(0px, 0px)';
      blobText?.style.setProperty('opacity', '0');
    }

    prevScrollY = scrollY;
  });

  const section1Link = document.querySelector('.main-nav-link.about-link') as HTMLAnchorElement | null;

  if (section1Link) {
    section1Link.addEventListener('click', function (event) {
      event.preventDefault();

      // Scroll to Y position 500
      window.scrollTo({
        top: showTextThreshold,
        behavior: 'smooth', //auto
      });
    });
  }
});
