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
        const phrases = ['“Efficient,', 'Adaptive,', 'Handsome.”'];

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

/*document.addEventListener('DOMContentLoaded', () => {
    // Only enable this on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.querySelectorAll('.double-tap').forEach(link => {
            let tapped = false;

            link.addEventListener('click', e => {
                if (!tapped) {
                    // first tap → prevent navigation & mark as tapped
                    e.preventDefault();
                    tapped = true;

                    // allow second tap for ~600ms
                    setTimeout(() => tapped = false, 600);
                }
                // second tap → browser follows the link normally
            });
        });
    }
});*/

// ---------------------------
// Carousel Autoplay (Fade)
// ---------------------------
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    let index = 0;

    function showSlide(i) {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active');
            if (idx === i) slide.classList.add('active');
        });
    }

    // Initial display
    showSlide(index);

    // Auto-slide every 4s
    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);
}
