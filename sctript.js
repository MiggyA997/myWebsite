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

  // Bubble interactivity logic
  const bubbles = document.querySelectorAll('.bubble');
  const hiddenSections = document.querySelectorAll('section.hidden-section');

  // Initially hide all sections except #home
  hiddenSections.forEach(section => {
    section.classList.remove('active'); //NO sections are visible initially
  });

  bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
      console.log('Bubble clicked: ', bubble); // Debugging log
      // Get target section ID from bubble's data-section attribute
      const targetSectionId = bubble.dataset.section;
      console.log('Target section ID: ', targetSectionId); // debuggin log

      const targetSection = document.getElementById(targetSectionId);
  
      if (targetSection) {
        // Remove 'active' class from all sections
        hiddenSections.forEach(section => section.classList.remove('active'));
        // Add 'active' class to target section
        targetSection.classList.add('active');
        console.log('Section activated:', targetSection); // Debugging log

      } else {
        console.log('Section not found for ID:', targetSectionId); // Debugging log
      }
    });
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
