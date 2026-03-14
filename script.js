document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-modal');
    const orderBtns = document.querySelectorAll('.order-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');

    // Open Modal when any "Order Now" button is clicked
    orderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    // Close Modal functions
    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close if user clicks outside the white box
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Handle Form Submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order request received! Next step: Integrating a payment processor.');
        closeModal();
    });
});