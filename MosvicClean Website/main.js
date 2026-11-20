/* =========================================================
   BRIGHTLINE FACILITY CARE
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MEGA MENUS
   ========================================================= */

const menuKeys = [
  'services',
  'resources'
];


const menus = menuKeys
  .map(key => ({
    key,
    trigger: document.querySelector(`[data-menu="${key}"]`),
    panel: document.getElementById(`mega-${key}`)
  }))
  .filter(m => m.trigger && m.panel);



function closeMenu(m){

  m.trigger.classList.remove('open');

  m.panel.classList.remove('open');

}



function closeAllExcept(exceptKey){

  menus.forEach(m => {

    if(m.key !== exceptKey){

      closeMenu(m);

    }

  });

}



menus.forEach(m => {

  m.trigger.addEventListener('click', (e) => {

    e.stopPropagation();

    const isOpen =
      m.trigger.classList.contains('open');


    closeAllExcept(m.key);


    if(isOpen){

      closeMenu(m);

    }else{

      m.trigger.classList.add('open');

      m.panel.classList.add('open');

    }

  });


  /*
    Clicking inside the mega panel itself
    shouldn't close the menu.
  */

  m.panel.addEventListener('click', (e) => {

    e.stopPropagation();

  });

});



/*
  Clicking anywhere else on the page
  closes any open menu.
*/

document.addEventListener('click', () => {

  closeAllExcept(null);

});



/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealEls =
  document.querySelectorAll('.reveal');


const io = new IntersectionObserver(

  (entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add('is-visible');

        io.unobserve(entry.target);

      }

    });

  },

  {
    threshold:0.18
  }

);


revealEls.forEach(el => {

  io.observe(el);

});



/* =========================================================
   TESTIMONIAL CAROUSEL
   ========================================================= */

const slides =
  document.querySelectorAll('.testimonial');


const dotsWrap =
  document.getElementById('carousel-dots');


let current = 0;



/*
  Create carousel dots.
*/

slides.forEach((_, i) => {

  const d =
    document.createElement('div');

  d.className =
    'dot' + (i === 0 ? ' active' : '');

  dotsWrap.appendChild(d);

});


const dots =
  document.querySelectorAll('.dot');



/*
  Show a particular slide.
*/

function showSlide(i){

  slides.forEach(s => {

    s.classList.remove('active');

  });


  dots.forEach(d => {

    d.classList.remove('active');

  });


  slides[i].classList.add('active');

  dots[i].classList.add('active');

  current = i;

}



/*
  Automatically advance every 4.5 seconds.
*/

setInterval(() => {

  showSlide(
    (current + 1) % slides.length
  );

}, 4500);

/* =========================================================
   BEFORE & AFTER CAROUSEL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const carousel =
    document.querySelector(".before-after-carousel");

  if (!carousel) return;


  const slides =
    carousel.querySelectorAll(".before-after-slide");

  const dots =
    document.querySelectorAll(".before-after-dot");

  const prevButton =
    document.querySelector(".before-after-prev");

  const nextButton =
    document.querySelector(".before-after-next");


  if (!slides.length) return;


  let currentSlide = 0;


  function showSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }


    slides.forEach((slide, i) => {

      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }

    });


    dots.forEach((dot, i) => {

      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }

    });


    currentSlide = index;

  }


  if (prevButton) {

    prevButton.addEventListener("click", () => {

      showSlide(currentSlide - 1);

    });

  }


  if (nextButton) {

    nextButton.addEventListener("click", () => {

      showSlide(currentSlide + 1);

    });

  }


  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      showSlide(index);

    });

  });


  showSlide(0);

});