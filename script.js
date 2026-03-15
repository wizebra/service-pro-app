const SUPABASE_URL = 'https://zhhluxbsiyijtjbpfpec.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xw4jItAyKIpylEOK4asQtA_yvlrgcV5';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch data from Supabase instead of a local array
    const { data: services, error } = await supabaseClient
        .from('services')
        .select('*');

    if (error) {
        console.error('Error fetching services:', error);
        return;
    }

    const listContainer = document.getElementById('services-list');
    const searchInput = document.getElementById('service-search');

    // 2. Function to Render the List
    function renderServices(data) {
    listContainer.innerHTML = data.map(service => {
        // Only create the badge HTML if the service has a badge value
        const badgeHTML = service.badge 
            ? `<span class="badge ${service.badge.toLowerCase()}">${service.badge}</span>` 
            : '';

        return `
            <div class="service-row">
                <div class="service-info">
                    <span class="service-category">${service.category}</span>
                    <div class="name-wrapper">
                        <span class="service-name">${service.name}</span>
                        ${badgeHTML}
                    </div>
                </div>
                <div class="service-action">
                    <span class="price-tag">${service.price}</span>
                    <button class="order-btn-sm" onclick="openOrderModal('${service.name}')">Order</button>
                </div>
            </div>
        `;
    }).join('');
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
// Inside your DOMContentLoaded or wherever your form logic lives
const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const selectedService = document.getElementById('selected-service-name').innerText;
    const details = document.getElementById('project-details').value;

    // SEND TO SUPABASE
    const { data, error } = await supabaseClient
        .from('orders')
        .insert([
            { 
                service_name: selectedService, 
                client_details: details, 
                status: 'pending' 
            }
        ]);

    if (error) {
        console.error("Order failed:", error.message);
        alert("Error placing order. Check console.");
    } else {
        // Show the success state in the modal
        document.getElementById('modal-form-container').style.display = 'none';
        document.getElementById('modal-success-container').style.display = 'block';
        
        // Refresh your dashboard stats!
        updateDashboardStats();
    }
});

async function updateDashboardStats() {
    const { data: orders, error } = await supabaseClient
        .from('orders')
        .select('*');

    if (!error && orders) {
        const orderCountElement = document.querySelector('.stat-card:nth-child(1) .stat-number');
        orderCountElement.innerText = orders.length;
    }
}