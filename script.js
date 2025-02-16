'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const navContainerWithImg = document.querySelector('.nav');
const navigationContainer = document.querySelector('.nav__links');
const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationsContainer = document.querySelector('.operations');
const leftSlider = document.querySelector('.slider__btn--left');
const rightSlider = document.querySelector('.slider__btn--right');
const slideContainer = document.querySelector('.slider');
const allSlides = document.querySelectorAll('.slide');
const allLazyLoadedImages = document.querySelectorAll('.lazy-img');
const allSections = document.querySelectorAll('.section');

let activeSlideNumber = 1;

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (event) {
  event.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const createCookieUI = () => {
  const message = document.createElement('div');
  message.classList.add('cookie-message');
  message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
  return message;
};

header.append(createCookieUI());

const closeCookieButton = document.querySelector('.btn--close-cookie');
const cookieMessage = document.querySelector('.cookie-message');

closeCookieButton.addEventListener('click', () => {
  cookieMessage.parentElement.removeChild(cookieMessage);
});

navigationContainer.addEventListener('click', (event) => {
  event.preventDefault();
  const targetLinkSection = event.target.getAttribute('href');
  if (targetLinkSection)
    document.querySelector(`${targetLinkSection}`).scrollIntoView({ behavior: 'smooth' });
});

const addAndRemoveActiveStyle = (el, i, selectedTabNumber, className) => {
  if (i !== selectedTabNumber && el.classList.contains(className)) {
    el.classList.remove(className);
  }
  if (i === selectedTabNumber) {
    el.classList.add(className);
  }
};

operationsTabContainer.addEventListener('click', (event) => {
  const closestButton = event.target.closest('.btn');
  const selectedTabString = closestButton.dataset.tab;
  if (!selectedTabString) return;

  const selectedTabNumber = Number(selectedTabString);

  [...operationsContainer.children].forEach((el, i) =>
    addAndRemoveActiveStyle(el, i, selectedTabNumber, 'operations__content--active')
  );

  [...operationsTabContainer.children].forEach((el, i) =>
    addAndRemoveActiveStyle(el, i, selectedTabNumber - 1, 'operations__tab--active')
  );
});

const leftClickHandler = activeNumber => (activeNumber === 1 ? 3 : activeNumber - 1);
const rightClickHandler = activeNumber => (activeNumber === 3 ? 1 : activeNumber + 1);

allSlides.forEach(slide => (slide.style.display = 'none'));

document.querySelector(`.slide--${activeSlideNumber}`).style.display = 'block';

leftSlider.addEventListener('click', () => {
  slideContainer.querySelector(`.slide--${activeSlideNumber}`).style.display = 'none';
  activeSlideNumber = leftClickHandler(activeSlideNumber);
  slideContainer.querySelector(`.slide--${activeSlideNumber}`).style.display = 'block';
});

rightSlider.addEventListener('click', () => {
  slideContainer.querySelector(`.slide--${activeSlideNumber}`).style.display = 'none';
  activeSlideNumber = rightClickHandler(activeSlideNumber);
  slideContainer.querySelector(`.slide--${activeSlideNumber}`).style.display = 'block';
});


const IntersectionObserverCallBack = (entries) => {

  const entry = entries[0]
  if (!entry.isIntersecting) navContainerWithImg.classList.add('sticky');
  else {
    navContainerWithImg.classList.remove('sticky');
  }
}

const IntersectionObserverOptions = {
  root: null,
  Threshold: 0
}



const intersectionObserver = new IntersectionObserver(IntersectionObserverCallBack, IntersectionObserverOptions)
intersectionObserver.observe(header);

const IntersectionObserverCallBackImg = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const lazySrc = target.src
      target.src = lazySrc.split('/')[0] + `${target.dataset.src}`
      target.classList.remove('lazy-img')
      observer.unobserve(target)
    }

  })
}

const IntersectionObserverOptionsImg = {
  root: null,
  threshold: 0.2
}


const intersectionObserverImg = new IntersectionObserver(IntersectionObserverCallBackImg, IntersectionObserverOptionsImg)
allLazyLoadedImages.forEach(img => intersectionObserverImg.observe(img))





const IntersectionObserverCallBackSections = (entries, observer) => {
  console.log("IntersectionObserverCallBackSections")
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden')
      observer.unobserve(entry.target)
    }


  })
}

const IntersectionObserverOptionSections = {
  root: null,
  threshold: 0.1
}


const intersectionObserverSections = new IntersectionObserver(IntersectionObserverCallBackSections, IntersectionObserverOptionSections)
allSections.forEach(section => intersectionObserverSections.observe(section))