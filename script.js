// Global variable to store typed strings from JSON
let typedStringsFromJSON = [];

// Load data from JSON file when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio data
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store typed strings from JSON for later use
            typedStringsFromJSON = data.hero.typedStrings;
            
            // Once data is loaded, populate the sections
            populateHeroSection(data.hero);
            populateSkillsSection(data.skills);
            populateExperienceSection(data.experience);
            populateProjectsSection(data.projects);
            
            // Initialize typing effect after content is loaded
            initTypeWriter();
            
            // Reapply smooth scrolling to any dynamically added anchor links
            applySmoothScrolling();
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // If JSON fails to load, use default typed strings
            typedStringsFromJSON = ["Android Development Using Kotlin & Java", 
                                  "Android & Ios development Using React Native", 
                                  "Solve Real World Problems with Code."];
            initTypeWriter();
        });
    
    // Your existing DOMContentLoaded functionality
    const navToggle = document.getElementById('navToggle');
    const navContainer = document.querySelector('.nav-container');
    
    // Toggle navigation on mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navContainer.classList.toggle('active');
        });
    }

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
    
    // Apply initial smooth scrolling (for static elements)
    applySmoothScrolling();
});

// Extracted smooth scrolling to its own function so we can reuse it
function applySmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Remove any existing event listeners (to prevent duplicates)
        anchor.removeEventListener('click', smoothScrollHandler);
        // Add the event listener
        anchor.addEventListener('click', smoothScrollHandler);
    });
}

// Smooth scrolling handler function (extracted to avoid duplication)
function smoothScrollHandler(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    const navMenu = document.getElementById('navMenu');
    const navContainer = document.querySelector('.nav-container');
    
    if (targetElement) {
        // Close mobile menu if open
        if (navMenu) navMenu.classList.remove('active');
        if (navContainer) navContainer.classList.remove('active');
        
        // Scroll to target
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    }
}

// Modified typing effect to use strings from JSON
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    // Use strings from JSON, or fallback to empty array if not available yet
    const roles = typedStringsFromJSON || [];
    if (roles.length === 0) return;
    
    const currentRole = roles[roleIndex];
    const typedElement = document.getElementById('typed');
    
    if (!typedElement) return;
    
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

// Initialize the typing effect (called after content is loaded)
function initTypeWriter() {
    // Only start typing effect if the typed element exists
    if (document.getElementById('typed')) {
        typeWriter();
    }
}

// Form submission handler (keeping your existing code)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! In a real implementation, this would send your message to the server.');
            this.reset();
        });
    }
});

// Function to populate Hero section
function populateHeroSection(heroData) {
    const heroContainer = document.getElementById('hero-container');
    
    if (!heroContainer) return;
    
    const heroContent = `
        <div class="hero-left">
            <p class="hero-subtitle">${heroData.subtitle}</p>
            <h1 class="hero-title">${heroData.name}</h1>
            <p class="hero-description">I <span id="typed"></span></p>
            <p class="hero-description">${heroData.description}</p>
            <div class="hero-buttons">
                <a href="${heroData.resumeLink}" target="_blank" class="cta-secondary-button">Download Resume</a>
                <a href="#experience" class="cta-button">View My Work</a>
            </div>
        </div>
        <div class="hero-right">
            <div class="profile-image-container">
                <img src="${heroData.profileImage}" alt="${heroData.name}" class="profile-image">
            </div>
            <div class="hero-social-links">
                ${heroData.socialLinks.map(link => 
                    `<a href="${link.url}" target="_blank" class="social-link"><i class="${link.icon}"></i></a>`
                ).join('')}
            </div>
        </div>
    `;
    
    heroContainer.innerHTML = heroContent;
}

// Function to populate Skills section
function populateSkillsSection(skills) {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <i class="${skill.icon}" style="color: ${skill.iconColor};"></i>
            <span>${skill.name}</span>
        </div>
    `).join('');
}

// Function to populate Experience section
function populateExperienceSection(experiences) {
    const experienceContainer = document.getElementById('experience-container');
    
    if (!experienceContainer) return;
    
    experienceContainer.innerHTML = experiences.map(exp => `
        <div class="experience-card">
            <div class="experience-header">
                <div class="experience-title">
                    <h3>${exp.title}</h3>
                    <p class="company-name"><i class="fas fa-building"></i> ${exp.company}</p>
                </div>
                <div class="experience-date">
                    <i class="far fa-calendar-alt"></i> ${exp.period}
                </div>
            </div>
            <div class="experience-description">
                <p>${exp.description}</p>
            </div>
            <div class="experience-technologies">
                <p><i class="fas fa-code"></i> Technologies</p>
                <div class="tech-tags">
                    ${exp.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>
            ${exp.links && exp.links.length > 0 ? `
            <div class="experience-links">
                <p><i class="fas fa-link"></i> Related Links</p>
                <div class="links-container">
                    ${exp.links.map(link => `
                        <a href="${link.url}" target="_blank" class="link-item">
                            <img src="${link.image}" alt="${link.title}" class="link-image">
                            <span class="link-title">${link.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `).join('');
}

// Function to populate Projects section
function populateProjectsSection(projects) {
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-content-description" >${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => 
                        `<span class="project-tag">${tag}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link">View Live</a>` : ``}
                    ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link">GitHub</a>` : ``}
                </div>
            </div>
        </div>
    `).join('');
}