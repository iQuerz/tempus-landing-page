// FAQ Accordion functionality
function toggleAccordion(trigger) {
    const content = trigger.nextElementSibling;
    const isActive = trigger.classList.contains('active');

    // Close all other accordions
    const allTriggers = document.querySelectorAll('.accordion-trigger');
    const allContents = document.querySelectorAll('.accordion-content');

    allTriggers.forEach(t => t.classList.remove('active'));
    allContents.forEach(c => c.style.maxHeight = null);

    // Toggle current accordion if it wasn't active
    if (!isActive) {
        trigger.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// Animations Section
window.addEventListener('DOMContentLoaded', () => {
    // Trigger fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in-element');
    fadeInElements.forEach((el, index) => {
        el.style.animationDelay = `${0.3 + index * 0.3}s`;
        el.classList.add('fade-in-trigger');
    });

    // Trigger slide-in for hero image
    const heroImage = document.querySelector('.slide-in-right');
    if (heroImage) {
        heroImage.classList.add('slide-in-right'); // already has class
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const el = document.querySelector('.typewriter');
    const fullText = el.getAttribute('data-text');
    let currentChar = 0;

    function typeNextChar() {
        if (currentChar <= fullText.length) {
            el.textContent = fullText.substring(0, currentChar);
            currentChar++;
            setTimeout(typeNextChar, 80); // brzina kucanja
        }
    }

    typeNextChar();
});


// Submission form section
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Modal functionality
    const loadedAt = Date.now();
    const trialModal = document.getElementById('trial-modal');
    const openModalButtons = document.querySelectorAll('.trial-modal-button');
    const closeModalButton = document.querySelector('.close-button');
    const trialForm = document.getElementById('trial-form');

    if (trialModal && openModalButtons.length && closeModalButton && trialForm) {
        openModalButtons.forEach(button => {
            // Check if the button is inside the modal form itself
            if (!button.closest('#trial-form')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent form submission if it's a submit button
                    trialModal.style.display = 'block';
                });
            }
        });

        closeModalButton.addEventListener('click', () => {
            trialModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == trialModal) {
                trialModal.style.display = 'none';
            }
        });

        trialForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;
            
            const address = document.getElementById('address').value;
            const company_website = document.getElementById('company_website').value;

            const payload = {
                name,
                email,
                phone,
                company,
                loadedAt,
                address,
                company_website
            };

            // Slanje ka Discord Webhook-u
            fetch("https://tempus-contact-modal.rasicdnikola.workers.dev", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (!res.ok) {
                        console.error('Greška prilikom slanja:', res.statusText);
                    }
                })
                .catch(err => console.error('Greška u fetch pozivu:', err));

            trialModal.style.display = 'none';
            trialForm.reset();

            console.log('Prijava poslata:', { name, email, phone, company });
            
            let confirmModalMessage = ''; // ovde da se stavi tekst za gresku ako je bila greska i tekst za kontakt ako je bilo ok
            const confirmModal = document.getElementById('trial-confirm-modal');
            if (confirmModal) {
                confirmModal.style.display = 'block';

                // Zatvaranje kada se klikne dugme u modalu
                confirmModal.querySelectorAll('.close-button').forEach(btn => {
                    btn.addEventListener('click', () => {
                        confirmModal.style.display = 'none';
                    });
                });

                // Zatvaranje klikom van modala
                window.addEventListener('click', (event) => {
                    if (event.target === confirmModal) {
                        confirmModal.style.display = 'none';
                    }
                });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const videoContainer = document.getElementById('heroVideoContainer');
    const video = document.getElementById('tempusVideo');
    console.log(video)
    const playBtn = document.getElementById('playOverlay');

    videoContainer.addEventListener('click', function() {
        // 1. Vraćamo prave kontrole tek kada se video pokrene
        video.setAttribute('controls', 'controls');
        
        // 2. Sklanjamo naše dizajnirano dugme
        playBtn.style.display = 'none';
        
        // 3. Puštamo video
        video.play();
        console.log(video)

        // 4. Zahtevamo Fullscreen (svaki browser ima svoju komandu)
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { /* Safari/iOS */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    });

    // BONUS TRIK: Šta ako korisnik izađe iz fullscreen-a usred videa?
    // Lepo je da se video pauzira i da se vrati ono lepo Play dugme.
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler); // Safari
    
    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen) {
            video.pause();
            video.removeAttribute('controls');
            playBtn.style.display = 'flex';
        }
    }
});