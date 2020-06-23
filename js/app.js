/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

// Global Variables
const navElements = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');

// build the nav
navElements.forEach( el => {

  const navListElement = `<li class="menu__item" data-link=${el.id}> <a href="#${el.id}" class="menu__link">${el.dataset.nav}</li>`;
  navList.insertAdjacentHTML('beforeend', navListElement);

})

// Scroll to section on link click
navList.addEventListener('click', e => {

  e.preventDefault();
  const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
  const elementScroll = document.getElementById(parent.dataset.link);
  elementScroll.scrollIntoView({block: 'end', behavior: 'smooth'});

})

// Set an active class to the Section
const callback = items => {

  items.forEach(item => {
    const navListElement = document.querySelector(`.menu__item[data-link="${item.target.id}"]`);
    const section = document.getElementById(item.target.id);

    if (item && item.isIntersecting) {
      
      navListElement.classList.add('active');
      section.classList.add('active');
    
    } else {

      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active');
      }
      if (section.classList.contains('active')) {
        section.classList.remove('active');
      }

    }

  })

}

// asynchronously 
const observer = new IntersectionObserver(callback)
navElements.forEach(el => {
  observer.observe(document.getElementById(el.id))
})