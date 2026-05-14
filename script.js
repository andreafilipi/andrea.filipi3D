document.addEventListener('DOMContentLoaded', () => {
    // Troviamo tutti gli slider nella pagina
    const sliders = document.querySelectorAll('.comparison-slider');

    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        const wireframe = slider.querySelector('.wireframe-image');
        const render = slider.querySelector('.render-image');
        const handle = slider.querySelector('.slider-handle');

        // Aggiorniamo le posizioni in base al valore dell'input range
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            // Rimuoviamo l'animazione pulse appena l'utente interagisce
            const button = handle.querySelector('.slider-handle-button');
            if (button.classList.contains('pulse')) {
                button.classList.remove('pulse');
            }
            
            // Tagliamo il wireframe da sinistra verso il centro
            wireframe.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
            
            // Tagliamo il render da destra verso il centro
            render.style.clipPath = `polygon(${value}% 0, 100% 0, 100% 100%, ${value}% 100%)`;
            
            // Spostiamo la maniglia
            handle.style.left = `${value}%`;
        });
    });

    // --- Intersection Observer per le animazioni di Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Attiva l'animazione poco prima che entri del tutto
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // Anima solo la prima volta
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- Typewriter Effect per il Footer ---
    const typewriterFooter = document.getElementById('typewriter-footer');
    if (typewriterFooter) {
        const text = typewriterFooter.getAttribute('data-text');
        typewriterFooter.innerHTML = ''; // Puliamo il contenuto iniziale
        
        // Creiamo uno span per ogni lettera per poterle animare singolarmente
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Manteniamo gli spazi
            span.className = 'type-char';
            typewriterFooter.appendChild(span);
        });
        
        // Intersection Observer specifico per il footer
        const footerObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('.type-char');
                    spans.forEach((span, index) => {
                        setTimeout(() => {
                            span.classList.add('visible');
                        }, index * 80); // 80ms di ritardo tra ogni lettera
                    });
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Parte quando il 50% del footer è visibile
        
        footerObserver.observe(typewriterFooter);
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Mostra il pulsante solo dopo aver scrollato un po'
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Torna in cima con scroll morbido al click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
