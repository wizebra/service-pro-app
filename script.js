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
});

// 4. Modal Logic (Global function so the HTML can see it)
function openOrderModal(serviceName) {
    const modal = document.getElementById('order-modal');
    // You could even auto-fill the form with the service name here!
    console.log("Opening order for:", serviceName);
    modal.style.display = 'block';
}