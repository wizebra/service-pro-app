document.addEventListener('DOMContentLoaded', () => {
    // 1. Your Data (This would eventually come from a Database)
    const services = [
        { id: 1, name: "SEO Technical Audit", category: "Marketing", price: "$199" },
        { id: 2, name: "Landing Page Development", category: "Dev", price: "$499" },
        { id: 3, name: "Performance Optimization", category: "Dev", price: "$299" },
        { id: 4, name: "UI/UX Consultation", category: "Design", price: "$150" },
        { id: 5, name: "Logo & Branding Kit", category: "Design", price: "$350" },
        { id: 6, name: "Monthly Content Plan", category: "Content", price: "$400" }
    ];

    const listContainer = document.getElementById('services-list');
    const searchInput = document.getElementById('service-search');

    // 2. Function to Render the List
    function renderServices(data) {
        if (data.length === 0) {
            listContainer.innerHTML = `<p style="padding: 2rem; text-align: center; color: #64748b;">No services found matching your search.</p>`;
            return;
        }

        listContainer.innerHTML = data.map(service => `
            <div class="service-row">
                <div class="service-info">
                    <span class="service-category">${service.category}</span>
                    <span class="service-name">${service.name}</span>
                </div>
                <div class="service-action">
                    <span class="price-tag">${service.price}</span>
                    <button class="order-btn-sm" onclick="openOrderModal('${service.name}')">Order</button>
                </div>
            </div>
        `).join('');
    }

    // 3. Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = services.filter(s => 
            s.name.toLowerCase().includes(term) || 
            s.category.toLowerCase().includes(term)
        );
        renderServices(filtered);
    });

    // Initial Load
    renderServices(services);

    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Update UI (Active state)
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Filter Data
            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                renderServices(services);
            } else {
                const filtered = services.filter(s => s.category === category);
                renderServices(filtered);
            }
        });
    });
});

// 4. Modal Logic (Global function so the HTML can see it)
// --- Modal Control Functions ---

function openOrderModal(serviceName) {
    const modal = document.getElementById('order-modal');
    const formContainer = document.getElementById('modal-form-container');
    const successContainer = document.getElementById('modal-success-container');
    const titleSpan = document.getElementById('selected-service-name');

    // Reset view to show form, hide success
    formContainer.style.display = 'block';
    successContainer.style.display = 'none';

    // Set the specific service name in the title
    titleSpan.innerText = serviceName;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// --- Inside your DOMContentLoaded block ---

// Close buttons logic
document.querySelector('.close-btn').onclick = closeModal;
document.querySelector('.btn-cancel').onclick = closeModal;

// Handle Form Submission
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Get the data (for later use with a database)
    const orderData = {
        service: document.getElementById('selected-service-name').innerText,
        details: document.getElementById('project-details').value,
        deadline: document.getElementById('project-deadline').value
    };
    console.log("New Order Created:", orderData);

    // 2. Hide form, show success message
    document.getElementById('modal-form-container').style.display = 'none';
    document.getElementById('modal-success-container').style.display = 'block';

    // 3. Update the Dashboard Stats (Bonus!)
    const activeOrdersStat = document.querySelector('.stat-card:first-child .stat-number');
    let currentCount = parseInt(activeOrdersStat.innerText);
    activeOrdersStat.innerText = currentCount + 1;
});