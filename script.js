// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navContainer = document.querySelector('.nav-container');
    
    // Toggle navigation on mobile
    navToggle.addEventListener('click', function() {
        navContainer.classList.toggle('active');
    });
    
    // Set active nav link based on current section
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Typing effect
const roles = ["Android Development Using Kotlin & Java","Android & Ios development Using React Native" ,"Solve Real World Problems with Code."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const typedElement = document.getElementById('typed');
    
    if (isDeleting) {
        // Removing characters
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 10;
    } else {
        // Adding characters
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 30;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of typing
        isDeleting = true;
        typingSpeed = 1500;
    } 
    // If deletion is complete
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start the typing effect when the page loads
window.onload = function() {
    typeWriter();
};

// Form submission (currently just prevents default)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! In a real implementation, this would send your message to the server.');
    this.reset();
});