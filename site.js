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
