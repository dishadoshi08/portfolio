// ========================================
// EDITORIAL TESTIMONIAL HOVER
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const clientItems = document.querySelectorAll('.client-item');
    const quoteItems = document.querySelectorAll('.quote-item');

    clientItems.forEach(item => {
        // Trigger on mouse enter for that instant app-like feel
        item.addEventListener('mouseenter', () => {
            
            // Remove active class from all clients and quotes
            clientItems.forEach(c => c.classList.remove('active'));
            quoteItems.forEach(q => q.classList.remove('active'));

            // Add active class to hovered client
            item.classList.add('active');

            // Find and activate the corresponding quote
            const targetQuoteId = item.getAttribute('data-quote');
            const targetQuote = document.getElementById(targetQuoteId);
            if (targetQuote) {
                targetQuote.classList.add('active');
            }
        });
    });
});