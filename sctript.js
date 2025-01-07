// Function to add the show class to elements as they come to the viewpoint
function addShowClass(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }
  
  //Create a observer and assign the function that will be trigger on intersecion
  const observer = new IntersectionObserver(addShowClass, { threshold: 0.2 });
  
  //Get all of the sections from the HTML and assign an event observer for each one
  const sections = document.querySelectorAll('section');
  sections.forEach(section => observer.observe(section));

  // Add mobile menu toggle functionality
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');

  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
  
  // Highlight the active menu item based on the current selection
  const navLinks = document.querySelectorAll('.nav-list a');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3){
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').includes(currentSection)){
            link.classList.add('active');
        }
    });
  });