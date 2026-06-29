document.addEventListener("DOMContentLoaded", () => {
    // Set up the observer options
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    // Create the observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing once revealed
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    // Target all ledger rows
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Observe each row
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});