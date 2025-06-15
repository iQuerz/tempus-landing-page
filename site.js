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
            const webhookUrl = 'https://discord.com/api/webhooks/1383933013930283150/0Z3dQAKV4J-f6pOfGfsHXqB-AIcfzeoT2qRW7Y5M_MUOLnpoiuAuLznoUnIsZXYRDYZM';
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;

            // Sastavljanje poruke
            const payload = {
                content:
                    `# 📥 Nova prijava sa sajta
                    **👤 Ime i prezime:** \`${name}\`
                    **📧 Email adresa:** \`${email}\`
                    **📱 Broj telefona:** \`${phone}\`
                    **🏢 Naziv firme:** \`${company}\`
                    `
            };

            // Slanje ka Discord Webhook-u
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(response => {
                if (!response.ok) {
                    console.error('Greška pri slanju na Discord:', response.statusText);
                }
            }).catch(error => {
                console.error('Greška pri fetch pozivu:', error);
            });

            console.log('Prijava poslata:', { name, email, phone, company });
            
            trialModal.style.display = 'none';
            trialForm.reset();

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
