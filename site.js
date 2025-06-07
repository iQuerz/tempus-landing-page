// FAQ Accordion functionality
function toggleAccordion(trigger) {
    const content = trigger.nextElementSibling;
    const isActive = trigger.classList.contains('active');

    // Close all other accordions
    const allTriggers = document.querySelectorAll('.accordion-trigger');
    const allContents = document.querySelectorAll('.accordion-content');

    allTriggers.forEach(t => t.classList.remove('active'));
    allContents.forEach(c => c.classList.remove('active'));

    // Toggle current accordion if it wasn't active
    if (!isActive) {
        trigger.classList.add('active');
        content.classList.add('active');
    }
}

// Smooth scroll for anchor links (if any are added)
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with href="#"
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click handlers for CTA buttons if needed
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can add analytics tracking or form opening logic here
            console.log('CTA button clicked');
        });
    });
});

// Optional: Add fade-in animation on scroll
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Uncomment the line below if you want scroll animations
// addScrollAnimations();