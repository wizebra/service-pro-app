document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add to clicked item
            item.classList.add('active');
            
            const page = item.getAttribute('data-page');
            console.log(`Loading ${page} section...`);
            
            // In the next step, we will hide/show sections based on this
        });
    });
});