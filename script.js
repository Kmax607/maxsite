document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------
    // Mobile Navigation
    // ---------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ---------------------------
    // Carousel Autoplay
    // ---------------------------
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        let index = 0;

        function moveCarousel() {
            index++;
            if (index >= slides.length) index = 0;
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        setInterval(moveCarousel, 4000); // 4s per slide
    }

    // ---------------------------
    // Quote: Fade-in sequence on scroll
    // ---------------------------
    const section = document.querySelector('.quote-section');
    if (section) {
        const phrases = ['“Efficient,”', '“Adaptable,”', '“Handsome”'];

        // Find or create the quote container
        let quoteEl = section.querySelector('#animated-quote');
        if (!quoteEl) {
            quoteEl = document.createElement('p');
            quoteEl.id = 'animated-quote';
            const quoteText = section.querySelector('.quote-text');
            if (quoteText) quoteText.prepend(quoteEl);
        }

        // Inject spans if not already present
        if (!quoteEl.querySelector('.quote-word')) {
            quoteEl.innerHTML = phrases
                .map(p => `<span class="quote-word">${p}</span>`)
                .join('');
        }

        // Ensure author exists
        let author = section.querySelector('.quote-author');
        if (!author) {
            author = document.createElement('span');
            author.className = 'quote-author';
            author.textContent = "- Max's Mom";
            quoteEl.insertAdjacentElement('afterend', author);
        }

        const words = section.querySelectorAll('.quote-word');
        if (words.length) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    // Reveal each word 1s apart
                    words.forEach((word, i) => {
                        setTimeout(() => word.classList.add('show'), i * 1200);
                    });

                    // Reveal author after last word
                    setTimeout(() => author.classList.add('show'), words.length * 1200);

                    obs.unobserve(entry.target); // Run once
                });
            }, { threshold: 0.4 });

            observer.observe(section);
        }
    }
});
